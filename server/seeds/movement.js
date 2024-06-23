import { loadJsonFile } from "../utils/utils.js";
import 'dotenv/config';
import { convertToSnakeCase, transformArrayValues } from "../utils/transformForSql.js";

const tableName = 'movement';

// Get the filename of the most updated JSON file
const databaseName = `${tableName.toUpperCase()}_DATABASE`;
const trackingObject = loadJsonFile('./utils/tracking.json');
const databaseId = process.env[databaseName];
const newestJsonFilename = trackingObject[databaseId].newest_json;

// import seed data files, arrays of objects
let data = loadJsonFile(newestJsonFilename);
data = convertToSnakeCase(data);
data = transformArrayValues(data, 'last_edited_time');

export async function seed(knex) {
  await knex(tableName).del();
  await knex(tableName).insert(data);
}
