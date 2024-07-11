"use server"

import sqlSelect from "@/app/_libs/utils";

export async function readProperty(property) {
  let columnsString = 'id, name';
  if (property === 'discreetness') {
    columnsString = 'id, level, description';
  } 
  const query = `
  SELECT ${columnsString}
  FROM ${property}
  `;

  const rows = sqlSelect(query);
  return rows;
}