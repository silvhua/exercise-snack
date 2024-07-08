import {apiSqlQuery} from "@/app/_libs/utils";

export async function GET(req, { params }) {
  /* 
  Get an exercise property value contained in a related table

  https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#example
  */
  const exerciseId = params.exerciseId;
  const tableName = params.property;
  const columnName = `${tableName}_id`;
  const intermediateTable = `exercise_${tableName}`;
  const query = `
  SELECT
    exercise.id, exercise.name,
    ${tableName}.name AS "${tableName}"
  FROM exercise
  LEFT JOIN ${intermediateTable} ON (exercise.id = ${intermediateTable}.exercise_id)
    JOIN ${tableName} ON (${columnName} = ${tableName}.id)
  WHERE exercise.id = "${exerciseId}"
  `
  const response = await apiSqlQuery(query);
  return response;
}

