

// ============================ IMPORTS ============================
import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import postgres from "postgres";
import { hash, verify } from "jsr:@denorg/scrypt@4.4.4";
import { getCookie, setCookie } from "jsr:@hono/hono@4.6.5/cookie";
import * as jwt from "jsr:@hono/hono@4.6.5/jwt";
import { z } from "zod";
import { zValidator } from "zValidator";

// ============================ APP SETUP ============================

// ============== CONSTANTS ==============
const app = new Hono();
const sql = postgres();        // creds come from project.env


const JWT_SECRET = "wsd-project-secret";
const COOKIE_KEY = "token";

const userMiddleware = async (c, next) => {
  const token = getCookie(c, COOKIE_KEY);
  const { payload } = jwt.decode(token, JWT_SECRET);
  c.user = payload;
  await next();
};

// Validation schemas
const courseSchema = z.object({
  name: z.string().min(3, "Course name must be at least 3 characters"),
});

const questionSchema = z.object({
  title: z.string().min(3, "Question title must be at least 3 characters"),
  text: z.string().min(3, "Question text must be at least 3 characters"),
});


// ============== MIDDLEWARE ==============
app.use(
  "/*",
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/*", logger());




// ============================ ENDPOINTS ============================

// ============== AUTH ENDPOINTS ==============

// POST /api/auth/register
app.post("/api/auth/register", async (c) => {
  const { email, password } = await c.req.json();
  const cleanEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim();

  try {
    await sql`
      INSERT INTO users (email, password_hash)
      VALUES (${cleanEmail}, ${hash(cleanPassword)})
    `;
  } catch {
    // silent fail (e.g. duplicate)
  }

  return c.json({ message: "User registered (or already exists)." });
});

// POST /api/auth/login
app.post("/api/auth/login", async (c) => {
  const { email, password } = await c.req.json();
  const cleanEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim();

  const result = await sql`
    SELECT * FROM users WHERE lower(email) = ${cleanEmail}
  `;

  if (result.length === 0) {
    return c.json({ message: "Incorrect email or password." });
  }

  const user = result[0];
  const valid = verify(cleanPassword, user.password_hash);

  if (!valid) {
    return c.json({ message: "Incorrect email or password." });
  }

  const token = await jwt.sign({ email: user.email }, JWT_SECRET);

  setCookie(c, COOKIE_KEY, token, {
    httpOnly: true,
    sameSite: "Lax",
    path: "/",
  });

  return c.json({ message: "Welcome!" });
});

// ============== COURSES ENDPOINTS ==============

// 1. GET /api/courses
app.get("/api/courses", async (c) => {
  const courses = await sql`SELECT * FROM courses`;
  return c.json(courses);
});

// 2. GET /api/courses/:id
app.get("/api/courses/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const [course] = await sql`SELECT * FROM courses WHERE id = ${id}`;
  
  if (!course) {
    return c.json({ error: "Course not found" }, 404);
  }
  
  return c.json(course);
});

// 3. POST /api/courses
app.post("/api/courses", zValidator("json", courseSchema), async (c) => {
  const { name } = await c.req.valid("json");
  
  try {
    const [newCourse] = await sql`
      INSERT INTO courses (name) 
      VALUES (${name}) 
      RETURNING *
    `;
    
    return c.json(newCourse);
  } catch (error) {
    return c.json({ error: "Failed to create course" }, 500);
  }
});

// 4. DELETE /api/courses/:id
app.delete("/api/courses/:id", async (c) => {
  const id = Number(c.req.param("id"));
  
  const [deletedCourse] = await sql`
    DELETE FROM courses 
    WHERE id = ${id} 
    RETURNING *
  `;
  
  if (!deletedCourse) {
    return c.json({ error: "Course not found" }, 404);
  }
  
  return c.json(deletedCourse);
});

// ============== QUESTIONS ENDPOINTS ==============

// 5. GET /api/courses/:id/questions
app.get("/api/courses/:id/questions", async (c) => {
  const courseId = Number(c.req.param("id"));
  
  const questions = await sql`
    SELECT * FROM questions 
    WHERE course_id = ${courseId}
  `;
  
  return c.json(questions);
});

// 6. POST /api/courses/:id/questions
app.post("/api/courses/:id/questions", zValidator("json", questionSchema), async (c) => {
  const courseId = Number(c.req.param("id"));
  const { title, text } = await c.req.valid("json");
  
  try {
    const [newQuestion] = await sql`
      INSERT INTO questions (course_id, title, text, upvotes) 
      VALUES (${courseId}, ${title}, ${text}, 0) 
      RETURNING *
    `;
    
    return c.json(newQuestion);
  } catch (error) {
    return c.json({ error: "Failed to create question" }, 500);
  }
});

// 7. POST /api/courses/:id/questions/:qId/upvote
app.post("/api/courses/:id/questions/:qId/upvote", async (c) => {
  const courseId = Number(c.req.param("id"));
  const questionId = Number(c.req.param("qId"));
  
  const [updatedQuestion] = await sql`
    UPDATE questions 
    SET upvotes = upvotes + 1 
    WHERE id = ${questionId} AND course_id = ${courseId} 
    RETURNING *
  `;
  
  if (!updatedQuestion) {
    return c.json({ error: "Question not found" }, 404);
  }
  
  return c.json(updatedQuestion);
});

// 8. DELETE /api/courses/:id/questions/:qId
app.delete("/api/courses/:id/questions/:qId", async (c) => {
  const courseId = Number(c.req.param("id"));
  const questionId = Number(c.req.param("qId"));
  
  const [deletedQuestion] = await sql`
    DELETE FROM questions 
    WHERE id = ${questionId} AND course_id = ${courseId} 
    RETURNING *
  `;
  
  if (!deletedQuestion) {
    return c.json({ error: "Question not found" }, 404);
  }
  
  return c.json(deletedQuestion);
});

export default app;