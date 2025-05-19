import postgres from "postgres";

const sql = postgres();

const create = async (book) => {
  const result = await sql`INSERT INTO books (title, year)
    VALUES (${book.title}, ${book.year})
    RETURNING *`;
  return result[0];
};

const readAll = async () => {
  return await sql`SELECT * FROM books`;
};

const readOne = async (id) => {
  const result = await sql`SELECT * FROM books WHERE id = ${id}`;
  return result[0];
};

const update = async (id, book) => {
  const result = await sql`UPDATE books
    SET title = ${book.title}, year = ${book.year}
    WHERE id = ${id}
    RETURNING *`;
  return result[0];
};

const remove = async (id) => {
  const result = await sql`DELETE FROM books WHERE id = ${id} RETURNING *`;
  return result[0];
};

export { create, readAll, readOne, remove, update };
