import crypto from 'crypto';
import {apiSqlQuery} from "@/app/_libs/utils";
import { queryParamsToSql } from '@/app/_libs/dataProcessing';

export async function GET(request, { params }) {
  const userId = params.userId;
  const filterStatement = queryParamsToSql(
    request, 'filter', 'AND'
  )

  
  const query = `
  SELECT
    id,
    last_edited_time,
    created_time
  FROM session
  WHERE (user_id = "${userId}")
  ${filterStatement}
  `
  const response = await apiSqlQuery(query);
  return response;
}

export async function POST(request) {
  /* 2024-07-11 19:50
  This is currently being invoked from /sessions 
  and just copied and pasted from there, but
  will code will need to be refactored to invoke this
  operation from this route.
*/
  const uuid = crypto.randomUUID()
  const requestBody = await request.json();
  const { userId } = requestBody;
  const query = `
  INSERT INTO session (
    id, user_id
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