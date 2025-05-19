import postgres from "postgres";
const sql = postgres();

const create = async (bookId, rating) => {
  const result = await sql`
    INSERT INTO book_ratings (book_id, rating, feedback)
    VALUES (${bookId}, ${rating.rating}, ${rating.feedback})
    RETURNING *`;
  return result[0];
};

const readAll = async (bookId) => {
  return await sql`SELECT * FROM book_ratings WHERE book_id = ${bookId}`;
};

const readOne = async (bookId, ratingId) => {
  const result = await sql`
    SELECT * FROM book_ratings 
    WHERE book_id = ${bookId} AND id = ${ratingId}`;
  return result[0];
};

const update = async (bookId, ratingId, rating) => {
  const result = await sql`
    UPDATE book_ratings
    SET rating = ${rating.rating}, feedback = ${rating.feedback}
    WHERE book_id = ${bookId} AND id = ${ratingId}
    RETURNING *`;
  return result[0];
};

const remove = async (bookId, ratingId) => {
  const result = await sql`
    DELETE FROM book_ratings
    WHERE book_id = ${bookId} AND id = ${ratingId}
    RETURNING *`;
  return result[0];
};

export { create, readAll, readOne, update, remove };
