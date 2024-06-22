import { loadJsonFile } from "../utils/utils.js";
import { convertToSnakeCase, transformArrayValues } from "../utils/transformForSql.js";


// import seed data files, arrays of objects
const dataPath = './data';
let data = loadJsonFile(`${dataPath}/muscle/muscle_2024-06-22_0004.json`);
data = convertToSnakeCase(data);
data = transformArrayValues(data, 'last_edited_time');

console.log(data)

export async function seed(knex) {
  await knex("muscle").del();
  await knex("muscle").insert(data);
}
