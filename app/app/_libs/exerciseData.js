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
  /* 
  Select 1 exercise per movement category.
  Common table expression and random number columns required because 
  f an exercise has >1 movement category, we want to avoid having it 
  repeated in the training program.
  */
  const conditionTableName = "`condition`"; // backticks required around `condition` in SQL queries as it is a SQL keyword
  const query = `
    WITH randomized AS (
  SELECT
    exercise.id, exercise.name,
    movement.name AS "movement",
    ${conditionTableName}.name AS "condition",
    discreetness.level AS discreetness,
    focus.name AS focus,
    environment.name AS environment,
    muscle.name AS muscle,
    ROW_NUMBER() OVER (PARTITION BY movement.name ORDER BY RAND()) AS random_number,
    ROW_NUMBER() OVER (PARTITION BY exercise_movement.exercise_id ORDER BY RAND()) AS random_number2
  FROM exercise
  LEFT JOIN exercise_movement ON (exercise.id = exercise_id)
    LEFT JOIN movement ON (movement_id = movement.id)
  LEFT JOIN exercise_condition ec ON (exercise.id = ec.exercise_id)
    LEFT JOIN ${conditionTableName} ON (condition_id = ${conditionTableName}.id)
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
    MIN(${conditionTableName}) AS ${conditionTableName}, 
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
  let rows = await sqlSelect(query);
  return rows;
}

/* 
    MIN(random_number)
    id, 
    name,
    ${conditionTableName},
    discreetness,
    focus,
    environment,
    muscle


  ORDER BY movement
    WHERE (random_number <=2)


,
  randomized2 AS (
  SELECT
    exercise.id, exercise.name,
    movement.name AS "movement",
    random_number AS random_number2
  FROM exercise
  LEFT JOIN exercise_movement ON (exercise.id = exercise_id)
    LEFT JOIN movement ON (movement_id = movement.id)
  )
*/

export async function getExerciseDetails(exerciseId) {
  const query = `
  SELECT
    exercise.id, exercise.name AS name,
    video.src,
    level AS "discreetness"
  FROM exercise
  LEFT JOIN video ON (video_id = video.id)
  LEFT JOIN discreetness ON (discreetness = discreetness.id)
  WHERE exercise.id = "${exerciseId}"
  `

  const data = await sqlSelect(query);
  const exerciseObject = data[0];
  
  return exerciseObject;
}

export async function getExerciseProperty(exerciseId, tableName) {
  /* 
  Get an exercise property value contained in a related table
  */
  let columnName = `${tableName}_id`;
  let intermediateTable = `exercise_${tableName}`;
  let aliasColumn = tableName;
  if (tableName === 'condition') {
    // backticks required around `condition` in SQL queries as it is an SQL keyword
    tableName = "`condition`";
    columnName = "condition_id";
    intermediateTable = 'exercise_condition';
    aliasColumn = "condition";
  }
  const query = `
  SELECT
    exercise.id, exercise.name,
    ${tableName}.name AS "${aliasColumn}"
  FROM exercise
  LEFT JOIN ${intermediateTable} ON (exercise.id = ${intermediateTable}.exercise_id)
    JOIN ${tableName} ON (${columnName} = ${tableName}.id)
  WHERE exercise.id = "${exerciseId}"
  `
  const data = await sqlSelect(query);
  const exerciseObject = data;
  
  return exerciseObject;
}

