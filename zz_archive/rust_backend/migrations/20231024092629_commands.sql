CREATE TABLE IF NOT EXISTS commands (
	id INTEGER PRIMARY KEY NOT NULL,
	name TEXT NOT NULL,
	url TEXT NOT NULL,
	show BOOLEAN NOT NULL DEFAULT 0
);

INSERT INTO commands (id, name, url, show) VALUES
  (1, 'Celestial', './celestial', true),
  (2, 'Images', './image', true),
  (3, 'Compounds', './compound', true),
  (4, 'Greetings', './greeting', true),
  (5, 'Jobs', './job', false),
  (6, 'Languages', './language', true);
