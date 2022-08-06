CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (300),
	"status" BOOLEAN DEFAULT FALSE
);

INSERT INTO "tasks"
	("task", "status")
VALUES ('laundry', false),
('trash', false),
('pick up', false);

SELECT * FROM "tasks";

INSERT INTO "tasks"
	("task", "status")
VALUES ('wipe surfaces', FALSE);

DELETE FROM "tasks"
WHERE "id" = 7;

UPDATE "tasks"
SET "status" = true
WHERE "id" = 16;

-- both ids will be sanitized with $1