import crypto from 'crypto';
import {apiSqlQuery} from "@/app/_libs/utils";

export async function GET() {
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
    -- SELECT FIRST_VALUE(random_number), 
    SELECT *
    FROM randomized
    WHERE random_number = 1
  `;
  return await apiSqlQuery(query);

}

export async function POST(request) {
  const uuid = crypto.randomUUID()
  const requestBody = await request.json();
  const { id, userId } = requestBody;
  console.log(userId)
  const query = `
  INSERT INTO session (
    id, user
  )
  VALUES (
    "${uuid}",
    "${userId}"
  )
  `
  return await apiSqlQuery(query);
}