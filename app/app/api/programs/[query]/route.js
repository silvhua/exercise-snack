import { apiSqlQuery } from "@/app/_libs/utils";

export async function GET(request, {params}) {
  let filterString = params.query;
  filterString = decodeURIComponent(filterString);
  console.log('filterString in server', filterString)
  const query = `
    WITH randomized AS (
  SELECT
    exercise.id, exercise.name,
    movement.name AS "movement",
    context.name AS "context",
    discreetness.level AS discreetness,
    focus.name AS focus,
    environment.name AS environment,
    muscle.name AS muscle,
    ROW_NUMBER() OVER (PARTITION BY movement.name ORDER BY RAND()) AS random_number,
    ROW_NUMBER() OVER (PARTITION BY exercise_movement.exercise_id ORDER BY RAND()) AS random_number2
  FROM exercise
  LEFT JOIN exercise_movement ON (exercise.id = exercise_id)
    LEFT JOIN movement ON (movement_id = movement.id)
  LEFT JOIN exercise_context ec ON (exercise.id = ec.exercise_id)
    LEFT JOIN context ON (context_id = context.id)
  LEFT JOIN discreetness ON (discreetness = discreetness.id)
  LEFT JOIN exercise_muscle em ON (exercise.id = em.exercise_id)
    LEFT JOIN muscle ON (muscle_id = muscle.id)
  LEFT JOIN exercise_focus ef ON (exercise.id = ef.exercise_id)
    LEFT JOIN focus ON (focus_id = focus.id)
  LEFT JOIN exercise_environment ee ON (exercise.id = ee.exercise_id)
    LEFT JOIN environment ON (environment_id = environment.id)
  )
  SELECT 
    MIN(id) AS id, 
    MIN(name) AS name, 
    MIN(movement) AS movement, 
    MIN(context) AS context, 
    MIN(discreetness) AS discreetness, 
    MIN(focus) AS focus, 
    MIN(environment) AS environment, 
    MIN(muscle) AS muscle,
    MIN(random_number) AS random_number
  FROM randomized
  WHERE id IN (
    SELECT id
    FROM randomized
    WHERE random_number2 = 1
  ) AND (random_number = 1)
  GROUP BY id
  `
  return await apiSqlQuery(query);
}