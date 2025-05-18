import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";

const app = new Hono();
app.use("/*", cors());
app.use("/*", logger());

// In-memory list of questions
let questions = [];



// --- Courses Endpoints ---

// 1. GET /courses
app.get("/courses", (c) =>
    c.json({
      courses: [
        { id: 1, name: "Web Software Development" },
        { id: 2, name: "Device-Agnostic Design" },
      ],
    })
  );
  
  // 2. GET /courses/:id
  app.get("/courses/:id", (c) => {
    const id = Number(c.req.param("id"));
    return c.json({ course: { id, name: "Course Name" } });
  });
  
  // 3. POST /courses
  app.post("/courses", async (c) => {
    const { name } = await c.req.json();
    return c.json({ course: { id: 3, name } });
  });
  
  // --- Questions Endpoints ---
  
  // 4. GET /courses/:id/questions
  app.get("/courses/:id/questions", (c) => c.json(questions));
  
  // 5. POST /courses/:id/questions
  app.post("/courses/:id/questions", async (c) => {
    const { title, text } = await c.req.json();
    const newQuestion = {
      id: questions.length + 1,
      title,
      text,
      upvotes: 0,
    };
    questions.push(newQuestion);
    return c.json(newQuestion);
  });
  
  // 6. POST /courses/:id/questions/:qId/upvote
  app.post("/courses/:id/questions/:qId/upvote", (c) => {
    const qId = Number(c.req.param("qId"));
    const question = questions.find((q) => q.id === qId);
    if (question) {
      question.upvotes++;
      return c.json(question);
    }
    return c.json({ error: "Question not found" }, 404);
  });
  
  // 7. DELETE /courses/:id/questions/:qId
  app.delete("/courses/:id/questions/:qId", (c) => {
    const qId = Number(c.req.param("qId"));
    const index = questions.findIndex((q) => q.id === qId);
    if (index !== -1) {
      const [removedQuestion] = questions.splice(index, 1);
      return c.json(removedQuestion);
    }
    return c.json({ error: "Question not found" }, 404);
  });
  


  export default app;