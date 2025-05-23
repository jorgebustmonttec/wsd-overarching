
// ============================ IMPORTS ============================
import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import postgres from "postgres";
import { hash, verify } from "jsr:@denorg/scrypt@4.4.4";
import { getCookie, setCookie } from "jsr:@hono/hono@4.6.5/cookie";
import * as jwt from "jsr:@hono/hono@4.6.5/jwt";


// ============================ APP SETUP ============================

// ============== CONSTANTS ==============
const app = new Hono();
const sql = postgres();        // creds come from project.env


const COOKIE_KEY = "auth";
const JWT_SECRET = "secret";

const userMiddleware = async (c, next) => {
  const token = getCookie(c, COOKIE_KEY);
  const { payload } = jwt.decode(token, JWT_SECRET);
  c.user = payload;
  await next();
};


// ============== MIDDLEWARE ==============
app.use(
  "/*",
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/*", logger());

app.use(
  "/api/notes/*",
  jwt.jwt({
    cookie: COOKIE_KEY,
    secret: JWT_SECRET,
  }),
);


// then, extract the user identifier from the token
app.use("/api/notes/*", userMiddleware);




// ============================ ENDPOINTS ============================


// ============== BASE ==============
app.get("/", (c) => c.json({ message: "Hello world!" }));

// ============== REGISTER ==============
app.post("/api/auth/register", async (c) => {
  const data = await c.req.json();
  const email = data.email.trim().toLowerCase();
  const password = data.password.trim();

  try {
    await sql`INSERT INTO users (email, password_hash)
      VALUES (${email}, ${hash(password)})`;
  } catch (_e) {
    // Do nothing on error (e.g. duplicate email), still respond below
  }

  return c.json({
    message: `Confirmation email sent to address ${email}.`,
  });
});

// ============== LOGIN ==============
app.post("/api/auth/login", async (c) => {
  const data = await c.req.json();

  const result = await sql`SELECT * FROM users
    WHERE email = ${data.email.trim().toLowerCase()}`;

  if (result.length === 0) {
    return c.json({
      "message": "User not found!",
    });
  }

  const user = result[0];

  const passwordValid = verify(data.password.trim(), user.password_hash);
    if (passwordValid) {
      const rolesResult = await sql`SELECT role FROM user_roles
        WHERE user_id = ${user.id}`;
      const roles = rolesResult.map((r) => r.role);

      const payload = {
        id: user.id,
        roles,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      };


    // create the token by signing the payload
    const token = await jwt.sign(payload, JWT_SECRET);

    // set the token as the cookie value
    setCookie(c, COOKIE_KEY, token, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      sameSite: "lax"
    });
    return c.json({
      "message": `Logged in as user with id ${user.id}`,
    });
  } else {
    return c.json({
      "message": "Invalid password!",
    });
  }
  
});

// ============== VERIFY ==============
// ...
app.post("/api/auth/verify", async (c) => {
  const token = getCookie(c, COOKIE_KEY);
  if (!token) {
    c.status(401);
    return c.json({
      "message": "No token found!",
    });
  }

  try {
    const payload = await jwt.verify(token, JWT_SECRET);
    payload.exp = Math.floor(Date.now() / 1000) + 60;

    const refreshedToken = await jwt.sign(payload, JWT_SECRET);

    setCookie(c, COOKIE_KEY, refreshedToken, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      sameSite: "lax",
    });

    return c.json({
      "message": "Valid token!",
    });
  } catch (e) {
    c.status(401);
    return c.json({
      "message": "Invalid token!",
    });
  }
});

// ============= notes ==============

app.get("/api/notes", async (c) => {
  return c.json(["C", "D", "E", "F", "G", "A", "B"]);
});

app.post("/api/notes", async (c) => {
  const { text } = await c.req.json();
  const result = await sql`INSERT INTO notes (user_id, text)
    VALUES (${c.user.id}, ${text}) RETURNING *`;
  return c.json(result[0]);
});

app.get("/api/notes/:id", async (c) => {
  const notes = await sql`SELECT * FROM notes
    WHERE id = ${c.req.param("id")} AND user_id = ${c.user.id}`;
  if (notes.length <= 0) {
    c.status(404);
    return c.json({ error: "Note not found" });
  }
  return c.json(notes[0]);
});


export default app;
