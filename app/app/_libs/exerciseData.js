import sqlSelect from "./utils";

export async function getMovements() {
  const query = `
  SELECT
    id,
    name,
    body_region
  FROM movement
  `
  let rows = sqlSelect(query);
  return rows;
}

export async function getExercises(movementCategory) {
  const query = `
select
  exercise.id, exercise.name,
  movement.name AS "movement category"
FROM exercise
JOIN exercise_movement ON (exercise.id = exercise_id)
JOIN movement ON (movement_id = movement.id)
WHERE movement.name = "${movementCategory}"
  `
  let rows = sqlSelect(query);
  return rows;
}

export async function getExercisePerMovement() {
  const query = `
    WITH randomized AS (
    select
      exercise.id, exercise.name,
      movement.name AS "movement category",
      ROW_NUMBER() OVER (PARTITION BY movement.name ORDER BY RAND()) AS random_number
    FROM exercise
    JOIN exercise_movement ON (exercise.id = exercise_id)
    JOIN movement ON (movement_id = movement.id)
    )
    -- SELECT FIRST_VALUE(random_number), *
    SELECT *
    FROM randomized
    WHERE random_number = 1
  `;
  let rows = sqlSelect(query);
  return rows;
}

export async function getExerciseDetails(exerciseId) {
  const query = `
  SELECT
    exercise.id, exercise.name AS name,
    movement.name AS "movement category",
    video.src,
    level AS "discreetness"
  FROM exercise
  LEFT JOIN exercise_movement em ON (exercise.id = em.exercise_id)
    JOIN movement ON (movement_id = movement.id)
  LEFT JOIN video ON (video_id = video.id)
  LEFT JOIN discreetness ON (discreetness = discreetness.id)
  WHERE exercise.id = "${exerciseId}"
  `
  const data = await sqlSelect(query);
  const exerciseObject = data[0];
  
  return exerciseObject;
}

export async function getFocus(exerciseId) {
  const query = `
    SELECT
    exercise.id, exercise.name AS name,
    focus.name as focus
  FROM exercise
  LEFT JOIN exercise_focus ef ON (exercise.id = ef.exercise_id)
    LEFT JOIN focus ON (focus_id = focus.id)
  WHERE exercise.id = "${exerciseId}"
  `
  const data = await sqlSelect(query);
  return data;
}

export async function getCondition(exerciseId) {
  const conditionTableName = "`condition`"; // backticks required around `condition` in SQL queries as it is a SQL keyword
  const query = `
  SELECT
    exercise.id, exercise.name AS name,
    condition.name as "condition"
  FROM exercise
  LEFT JOIN exercise_condition ec ON (exercise.id = ec.exercise_id)
    LEFT JOIN ${conditionTableName} ON (condition_id = ${conditionTableName}.id)
  WHERE exercise.id = "${exerciseId}"
  `
  const data = await sqlSelect(query);
  return data;
}

