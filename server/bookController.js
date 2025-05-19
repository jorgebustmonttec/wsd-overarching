import { zValidator } from "zValidator";

import * as bookRepository from "./bookRepository.js";
import { bookValidator } from "./validators.js";

const createBook = [zValidator("json", bookValidator), async (c) => {
  const book = await c.req.valid("json");
  return c.json(await bookRepository.create(book));
}];

const getBooks = async (c) => {
  return c.json(await bookRepository.readAll());
};

const getBook = async (c) => {
  const id = c.req.param("id");
  return c.json(await bookRepository.readOne(id));
};

const updateBook = [zValidator("json", bookValidator), async (c) => {
  const id = c.req.param("id");
  const book = await c.req.valid("json");
  return c.json(await bookRepository.update(id, book));
}];

const deleteBook = async (c) => {
  const id = c.req.param("id");
  return c.json(await bookRepository.remove(id));
};

export { createBook, deleteBook, getBook, getBooks, updateBook };
