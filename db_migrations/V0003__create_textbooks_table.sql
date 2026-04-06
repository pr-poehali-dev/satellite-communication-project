CREATE TABLE textbooks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  subject VARCHAR(100) NOT NULL,
  grades INTEGER[] NOT NULL
);

INSERT INTO textbooks (title, author, subject, grades) VALUES
  ('Алгебра', 'Макарычев Ю.Н.', 'Алгебра', ARRAY[7,8,9]),
  ('Алгебра', 'Мерзляк А.Г.', 'Алгебра', ARRAY[7,8,9]),
  ('Алгебра и начала анализа', 'Колмогоров А.Н.', 'Алгебра', ARRAY[10,11]),
  ('Алгебра и начала математического анализа', 'Мерзляк А.Г.', 'Алгебра', ARRAY[10,11]),
  ('Алгебра и начала анализа', 'Никольский С.М.', 'Алгебра', ARRAY[10,11]),
  ('Математика', 'Виленкин Н.Я.', 'Математика', ARRAY[5,6]),
  ('Математика', 'Мерзляк А.Г.', 'Математика', ARRAY[5,6]),
  ('Математика', 'Дорофеев Г.В.', 'Математика', ARRAY[5,6]),
  ('Геометрия', 'Атанасян Л.С.', 'Геометрия', ARRAY[7,8,9,10,11]),
  ('Геометрия', 'Мерзляк А.Г.', 'Геометрия', ARRAY[7,8,9]),
  ('Геометрия', 'Погорелов А.В.', 'Геометрия', ARRAY[7,8,9,10,11]);

ALTER TABLE users ADD COLUMN IF NOT EXISTS textbook_id INTEGER REFERENCES textbooks(id);