import pool from "@/app/libs/mysql";

export async function sqlSelect(query) {
  try {
    const db = await pool.getConnection();
    const result = await db.execute(query);
    let [rows] = result;
    rows.map(row => {
      row.id = row.id.toString('ascii');
    })
    db.release();
    console.log(rows);
    return rows;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getExercises(movementCategory) {
  console.log('querying')
  const query = `
select
  exercise.id, exercise.name,
  movement.name AS movement_category
FROM exercise
JOIN exercise_movement ON (exercise.id = exercise_id)
JOIN movement ON (movement_id = movement.id)
WHERE movement.name = "${movementCategory}"
  `
  // const query = `select * from exercise`;
  const rows = sqlSelect(query);
  return rows;
}