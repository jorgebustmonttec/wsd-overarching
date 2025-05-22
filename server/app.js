import { Hono } from "jsr:@hono/hono@4.6.5";
import { getCookie, setCookie } from "jsr:@hono/hono@4.6.5/cookie";
import { cors } from "jsr:@hono/hono@4.6.5/cors";
import { hash, verify } from "jsr:@denorg/scrypt@4.4.4";
import postgres from "postgres";

const sql = postgres();
const COOKIE_KEY = "username";


const app = new Hono();
app.use(
  "/*",
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.post("/api/register", async (c) => {
  const { username, password } = await c.req.json();
  const cleanedUsername = username.trim().toLowerCase();
  const cleanedPassword = password.trim();

  try {
    const hashedPassword = hash(cleanedPassword);
    await sql`
      INSERT INTO users (username, password_hash)
      VALUES (${cleanedUsername}, ${hashedPassword})
    `;
  } catch (err) {
    // Optional: console.error(err)
    // Don't leak info about duplicates
  }

  return c.json({ message: "Registered successfully." });
});

app.post("/api/login", async (c) => {
  const { username, password } = await c.req.json();
  const cleanedUsername = username.trim().toLowerCase();
  const cleanedPassword = password.trim();

  const result = await sql`
    SELECT * FROM users
    WHERE username = ${cleanedUsername}
  `;

  if (result.length === 0) {
    return c.json({ message: "Incorrect username or password." });
  }

  const user = result[0];
  const isValid = verify(cleanedPassword, user.password_hash);

  if (!isValid) {
    return c.json({ message: "Incorrect username or password." });
  }

  setCookie(c, COOKIE_KEY, cleanedUsername);
  return c.json({ message: "Welcome!" });
});

export default app;
