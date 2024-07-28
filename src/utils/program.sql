-- Active: 1718904400861@@127.0.0.1@3306@movement_snack

    WITH details AS (
  SELECT
    exercise.id, 
    exercise.name AS name,
    movement.name AS "movement",
    context.name AS "context",
    discreetness.level AS discreetness,
    focus.name AS focus,
    environment.name AS environment,
    muscle.name AS muscle,
    -- movement.id AS movement_id,
    exercise_movement.exercise_id 
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
  WHERE context.name = 'limited space' OR context.name = 'high heels'
  ), 
  consolidated AS (
  SELECT
    id, 
    MIN(name) AS name,
    MIN(movement) AS "movement",
    COUNT(DISTINCT context) AS context_count,
    MIN(discreetness) AS discreetness,
    MIN(focus) AS focus,
    MIN(environment) AS environment,
    MIN(muscle) AS muscle
    -- MIN(movement_id) AS movement_id
  FROM details
  GROUP BY id
  
  ),
  filtered AS (
    SELECT * 
    FROM consolidated
    WHERE id IN (
      SELECT id FROM consolidated
      WHERE context_count = 2
    )
    ORDER BY movement
  ),
  randomized AS (
    SELECT *,
      ROW_NUMBER() OVER (PARTITION BY movement ORDER BY RAND()) AS random_number
    FROM filtered
    ORDER BY movement, random_number
  )
  SELECT * FROM randomized
  WHERE random_number = 1