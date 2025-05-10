import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";

const app = new Hono();
app.use("/*", cors());
app.use("/*", logger());

/* 1.  all courses -------------------------------------------------------*/
app.get("/courses", (c) =>
  c.json({
    courses: [
      { id: 1, name: "Web Software Development" },
      { id: 2, name: "Device-Agnostic Design" },
    ],
  })
);

/* 2.  single course ----------------------------------------------------*/
app.get("/courses/:id", (c) => {
  const id = Number(c.req.param("id"));
  return c.json({ course: { id, name: "Course Name" } });
});

/* 3.  create course ----------------------------------------------------*/
app.post("/courses", async (c) => {
  const { name } = await c.req.json();
  return c.json({ course: { id: 3, name } });
});

/* 4.  topics under a course -------------------------------------------*/
app.get("/courses/:id/topics", (c) =>
  c.json({
    topics: [
      { id: 1, name: "Topic 1" },
      { id: 2, name: "Topic 2" },
    ],
  })
);

/* 5.  posts in a topic -------------------------------------------------*/
app.get("/courses/:cId/topics/:tId/posts", (c) =>
  c.json({
    posts: [
      { id: 1, title: "Post 1" },
      { id: 2, title: "Post 2" },
    ],
  })
);

/* 6.  single post + answers -------------------------------------------*/
app.get("/courses/:cId/topics/:tId/posts/:pId", (c) => {
  const pId = Number(c.req.param("pId"));
  return c.json({
    post: { id: pId, title: "Post Title" },
    answers: [
      { id: 1, content: "Answer 1" },
      { id: 2, content: "Answer 2" },
    ],
  });
});

export default app;
