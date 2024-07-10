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