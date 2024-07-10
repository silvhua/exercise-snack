import crypto from 'crypto';
import { apiSqlQuery } from "@/app/_libs/utils";

export async function POST(request, {params}) {
  const uuid = crypto.randomUUID()
  const requestBody = await request.json();
  const { exercises } = requestBody;
  const userId = params.userId;
  const query = `
  INSERT INTO program (
    id,
    user_id,
    exercises
  )
  VALUES (
    "${uuid}",
    "${userId}",
    JSON_ARRAY('${JSON.stringify(exercises)}')
  )
  `
  const postResponse = await apiSqlQuery(query);
  if (Math.floor(postResponse.status / 100) === 2) {
    const query2 = `
    SELECT id,
    user_id,
    exercises,
    created_time, last_edited_time
    FROM program
    WHERE id = "${uuid}"
    `
    const newRecord = await apiSqlQuery(
      query2, true, ['user_id']
    );
    return newRecord;
    
  };
  const response = postResponse;
  return response;
}

export async function GET(request, {params}) {
  const userId = params.userId;
  const query = `
  SELECT 
    id,
    exercises,
    created_time,
    last_edited_time
  FROM program
  WHERE user_id = "${userId}"
  ORDER BY last_edited_time DESC
  LIMIT 1
  `
  const response = await apiSqlQuery(query, true);
  return response;
}

export async function PUT(request, {params}) {
  const { exercises } = await request.json();
  const userId = params.userId;
  const filterStatement = `
    WHERE user_id = "${userId}"
    ORDER BY last_edited_time DESC
    LIMIT 1
  `;

  const query = `
  WITH latest_record AS (
    SELECT id
    FROM program
    WHERE user_id = "${userId}"
    ORDER BY last_edited_time DESC
    LIMIT 1
  )
  UPDATE program
  SET
    exercises = JSON_ARRAY('${JSON.stringify(exercises)}')
  WHERE id IN (
    SELECT id FROM latest_record
  )
  `
  const putResponse = await apiSqlQuery(query);
  if (Math.floor(putResponse.status / 100) === 2) {
    const query2 = `
    SELECT id,
      user_id,
      exercises,
      created_time, last_edited_time
    FROM program
    ${filterStatement}
    `
    const newRecord = await apiSqlQuery(
      query2, true, ['user_id']
    );
    return newRecord;
    
  };
  return putResponse;
}