import crypto from 'crypto';
import {apiSqlQuery} from "@/app/_libs/utils";

export async function POST(request) {
  const uuid = crypto.randomUUID()
  const requestBody = await request.json();
  const { id, userId } = requestBody;
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