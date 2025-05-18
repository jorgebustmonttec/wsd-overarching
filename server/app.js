import { Hono } from "jsr:@hono/hono@4.6.5";
import { cors } from "jsr:@hono/hono@4.6.5/cors";
import postgres from "postgres";
import * as bookRepository from "./bookRepository.js";

const app = new Hono();
app.use("/*", cors());

const sql = postgres();

app.post("/", async (c) => {
  const { query } = await c.req.json();
  const result = await sql.unsafe(query);
  return c.json(result);
});


app.post("/books", async (c) => {
  const book = await c.req.json();
  const newBook = await bookRepository.create(book);
  return c.json(newBook);
});

app.get("/books", async (c) => {
  const books = await bookRepository.readAll();
  return c.json(books);
});

app.get("/books/:id", async (c) => {
  const id = c.req.param("id");
  const book = await bookRepository.readOne(id);
  return c.json(book);
});

app.put("/books/:id", async (c) => {
  const id = c.req.param("id");
  const book = await c.req.json();
  const updatedBook = await bookRepository.update(id, book);
  return c.json(updatedBook);
});

app.delete("/books/:id", async (c) => {
  const id = c.req.param("id");
  const deletedBook = await bookRepository.remove(id);
  return c.json(deletedBook);
});


export default app;