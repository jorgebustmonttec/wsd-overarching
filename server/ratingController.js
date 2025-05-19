import { zValidator } from "zValidator";
import * as ratingRepository from "./ratingRepository.js";
import { ratingValidator } from "./validators.js";

const createRating = [
  zValidator("json", ratingValidator),
  async (c) => {
    const bookId = c.req.param("bookId");
    const rating = await c.req.valid("json");
    return c.json(await ratingRepository.create(bookId, rating));
  }
];

const getRatings = async (c) => {
  const bookId = c.req.param("bookId");
  return c.json(await ratingRepository.readAll(bookId));
};

const getRating = async (c) => {
  const bookId = c.req.param("bookId");
  const ratingId = c.req.param("ratingId");
  return c.json(await ratingRepository.readOne(bookId, ratingId));
};

const updateRating = [
  zValidator("json", ratingValidator),
  async (c) => {
    const bookId = c.req.param("bookId");
    const ratingId = c.req.param("ratingId");
    const rating = await c.req.valid("json");
    return c.json(await ratingRepository.update(bookId, ratingId, rating));
  }
];

const deleteRating = async (c) => {
  const bookId = c.req.param("bookId");
  const ratingId = c.req.param("ratingId");
  return c.json(await ratingRepository.remove(bookId, ratingId));
};

export {
  createRating,
  getRatings,
  getRating,
  updateRating,
  deleteRating
};
