import {apiSqlQuery} from "@/app/_libs/utils";

export async function GET(request, { params }) {
  /* 
  https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#example
  */

  const username = params.username;
  const query = `
  SELECT
    id, username, first_name, last_name,
    password
  FROM user
  WHERE username = "${username}"
  `;
  const response = await apiSqlQuery(query, true);
  return response;

}

