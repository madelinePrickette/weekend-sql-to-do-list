CREATE TABLE "tasks" (
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR (650)
);

INSERT INTO "tasks"
    ("task")
VALUES
    ('Brush teeth'),
    ('Make bed'),
    ('Take meds'),
    ('Buy groceries'),
    ('Go to the gym'),
    ('Eat breakfast'),
    ('Hug my cat'),
    ('Call Mom and Dad');
