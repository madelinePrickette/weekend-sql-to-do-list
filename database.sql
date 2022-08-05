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