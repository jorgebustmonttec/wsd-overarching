import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import postgres from "postgres";
import { hash, verify } from "jsr:@denorg/scrypt@4.4.4";
import { getCookie, setCookie } from "jsr:@hono/hono@4.6.5/cookie";
import * as jwt from "jsr:@hono/hono@4.6.5/jwt";

const app = new Hono();
const sql = postgres();        // creds come from project.env

app.use(
  "/*",
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use("/*", logger());

app.get("/", (c) => c.json({ message: "Hello world!" }));

const COOKIE_KEY = "auth";

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
    // setting the cookie as the user id
    setCookie(c, COOKIE_KEY, user.id, {
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



export default app;
