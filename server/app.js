import { Hono } from "jsr:@hono/hono@4.6.5";
import { cors } from "jsr:@hono/hono@4.6.5/cors";

import * as bookController from "./bookController.js";

const app = new Hono();
app.use("/*", cors());

app.post("/books", ...bookController.createBook);
app.get("/books", bookController.getBooks);
app.get("/books/:id", bookController.getBook);
app.put("/books/:id", ...bookController.updateBook);
app.delete("/books/:id", bookController.deleteBook);

import * as ratingController from "./ratingController.js";

// Ratings
app.post("/books/:bookId/ratings", ...ratingController.createRating);
app.get("/books/:bookId/ratings", ratingController.getRatings);
app.get("/books/:bookId/ratings/:ratingId", ratingController.getRating);
app.put("/books/:bookId/ratings/:ratingId", ...ratingController.updateRating);
app.delete("/books/:bookId/ratings/:ratingId", ratingController.deleteRating);


export default app;
