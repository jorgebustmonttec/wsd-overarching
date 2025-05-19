CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title TEXT,
  year INT
);

CREATE TABLE book_ratings (
  id SERIAL PRIMARY KEY,
  book_id INTEGER NOT NULL REFERENCES books(id),
  rating INTEGER NOT NULL,
  feedback TEXT
);