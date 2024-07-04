import pool from "@/app/_libs/mysql";

export async function sqlSelect(query, getFirst) {
  try {
    const db = await pool.getConnection();
    const result = await db.execute(query);
    let [rows] = result;
    rows.map(row => {
      row.id = row.id.toString('ascii');
    })
    // if (getFirst) {
    //   rows = rows[0];
    // }
    db.release();
    return rows;
  } catch (error) {
    console.log(error);
    return null;
  }
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

export async function getExerciseDetails(exerciseId) {
  const query = `
  SELECT
    exercise.id, exercise.name AS name,
    movement.name AS "movement category",
    video.src
  FROM exercise
  LEFT JOIN exercise_movement em ON (exercise.id = em.exercise_id)
    JOIN movement ON (movement_id = movement.id)
  LEFT JOIN video ON (video_id = video.id)
  LEFT JOIN discreetness ON (discreetness_id = discreetness.id)
  WHERE exercise.id = "${exerciseId}"
  `
  const data = await sqlSelect(query);
  return data[0];
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

