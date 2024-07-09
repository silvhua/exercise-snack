import crypto from 'crypto';
import {apiSqlQuery, binaryToString} from "@/app/_libs/utils";

export async function POST(request, { params }) {
  const uuid = crypto.randomUUID();
  const requestBody = await request.json();
  const session_id = params.sessionId;
  let {
    reps,
    duration,
    notes,
    exercise_id
  } = requestBody;

  const query = `
  INSERT INTO activity (
    id,
    reps,
    duration,
    exercise_id,
    session_id,
    notes
  )
  VALUES (
    "${uuid}",
    ${reps},
    ${duration},
    "${exercise_id}",
    "${session_id}",
    "${notes}"
  )
  `
  const postResponse = await apiSqlQuery(query);
  if (Math.floor(postResponse.status / 100) === 2) {
    const query2 = `
    SELECT id,
    created_time,
    last_edited_time,
    id,
    session_id,
    exercise_id,
    reps,
    duration,
    notes
    FROM activity
    WHERE id = "${uuid}"
    `
    const newRecord = await apiSqlQuery(
      query2, true, ['exercise_id', 'session_id']
    );
    return newRecord;
  };
  const response = postResponse;
  return response;
}