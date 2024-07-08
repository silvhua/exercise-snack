import crypto from 'crypto';
import {apiSqlQuery} from "@/app/_libs/utils";

export async function POST(request) {
  const uuid = crypto.randomUUID()
  const requestBody = await request.json();
  const { userId } = requestBody;
  const query = `
  INSERT INTO session (
    id, user
  )
  VALUES (
    "${uuid}",
    "${userId}"
  )
  `
  const postResponse = await apiSqlQuery(query);
  if (Math.floor(postResponse.status / 100) === 2) {
    const query2 = `
    SELECT id, created_time, last_edited_time
    FROM session
    WHERE id = "${uuid}"
    `
    const newRecord = await apiSqlQuery(query2, true);
    return newRecord;
    
  };
  const response = postResponse;
  return response;
}