---- write the SQL to create both of the tables
--
-- create the table "artist"
CREATE TABLE "artist" (
	-- define the columns
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(80),
	"birthdate" DATE
);

-- create the table "songs"
CREATE TABLE "song" (
	-- define the columns
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR(255),
	"length" VARCHAR(10),
	"released" DATE
);

---- write INSERT statements to add the sample
---- data provided in the server.js file
--
-- INSERT statement for "artist" table
INSERT INTO "artist"
	("name", "birthdate")
VALUES
	('Ella Fitzgerald', '04-25-1917'),
	('Dave Brubeck', '12-06-1920'),
	('Miles Davis', '05-26-1926'),
	('Esperanza Spalding', '10-18-1984');

-- INSERT statement for "song" table
INSERT INTO "song"
	("title", "length", "released")
VALUES
	('Take Five', '5:24', '1959-09-29'),
	('So What', '9:22', '1959-08-17'),
	('Black Gold', '5:17', '2012-02-01');
