import { loadJsonFile, processData } from "../utils/utils.js";
import 'dotenv/config';
import { convertToSnakeCase, transformArrayValues } from "../utils/transformForSql.js";


const trackingObject = loadJsonFile('./utils/tracking.json');
const notionDbNames = [
  'user',
  'session',
  'activity',
  // 'program' // this table is empty so there is no seed data
]


const allData = {}; // Object where each property contains all the data for a given table
notionDbNames.forEach(dbName => {
  allData[dbName] = processData(dbName);
})

export async function seed(knex) {
  let allTables = Object.keys(allData);
  for (let i = 0; i < allTables.length; i++) {
    const table = allTables[i];
    console.log(`Seeding ${table}`);
    await knex(table).del();
    await knex(table).insert(allData[table]);
  }
}

