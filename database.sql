CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (300),
	"status" BOOLEAN DEFAULT FALSE
);

INSERT INTO "tasks"
	("task", "status")
VALUES ('laundry', FALSE),
('trash', FALSE),
('groceries', FALSE),
('pick up', FALSE),
('do homework', FALSE),
('sweep', FALSE),
('dishes', FALSE);

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