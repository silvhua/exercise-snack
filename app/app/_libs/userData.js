"use server"

import sqlSelect from "./utils";


export default async function getUser(username) {
  const query = `
  SELECT
    id, username, first_name, last_name,
    password
  FROM user
  WHERE username = "${username}"
  `;
  const data = await sqlSelect(query, true);
  return data;
}