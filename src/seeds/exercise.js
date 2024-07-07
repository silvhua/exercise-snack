import { loadJsonFile } from "../utils/utils.js";
import 'dotenv/config';
import { convertToSnakeCase, transformArrayValues } from "../utils/transformForSql.js";

const mainTableName = 'exercise';
const trackingObject = loadJsonFile('./utils/tracking.json');

function processData(notionDbName) {
  // Get the filename of the most updated JSON file
  const databaseId = process.env[notionDbName];
  const newestJsonFilename = trackingObject[databaseId].newest_json;

  // import data files (arrays of objects)
  let data = loadJsonFile(newestJsonFilename);
  data = convertToSnakeCase(data);
  const timestampKeys = ['last_edited_time', 'created_time'];
  data = transformArrayValues(data, timestampKeys);
  return data;
}

function createManyToManyObject(tableName, originalArray, arrayProperty) {
  /* 
  Create the many to many table for each pair of tables that has a many to many relationship
  */
  const expandedArray = [];
  
  for (let i = 0; i < originalArray.length; i++) {
    const currentObject = originalArray[i];
    const valueArray = currentObject[arrayProperty];
    for (let j = 0; j < valueArray.length; j++) {
      const relationObject = {};
      relationObject[`${tableName}_id`] = currentObject['id'];
      relationObject[`${arrayProperty}_id`] = valueArray[j];
      expandedArray.push(relationObject);
    }
  }
  return expandedArray;
}

const notionDbNames = Object.keys(process.env).filter(key => key.endsWith('_DATABASE'));

const allData = {}; // Object where each property contains all the data for a given table
notionDbNames.forEach(dbName => {
  const tableName = dbName.split('_DATABASE')[0].toLocaleLowerCase();
  allData[tableName] = processData(dbName);
})

// Create the one to many & many to many tables branching from `exercise`table
const oneToManyTables = [
  'movement', 'muscle', 'modifier', 'focus', 'context', 'environment', 'tip', 
]

const multiselectProperties = ['environment'];
const arrayProperties = [...oneToManyTables, ...multiselectProperties];

const exerciseDataArray = allData[mainTableName];

arrayProperties.forEach(property => {
  allData[`${mainTableName}_${property}`] = createManyToManyObject(mainTableName, exerciseDataArray, property)
})

// Remove relation properties that have many to many relationship
allData[mainTableName] = allData[mainTableName].map(object => {
  const {
    muscle, movement, modifier, context, environment, focus, tip, video,
    ...filteredObject } = object;
  return filteredObject;
})


allData['activity'] = allData['activity'].map(object => {
  //rename `exercise` and `session` property names to match columns in migration
  const { exercise, session, ...filteredObject } = object;
  filteredObject.session_id = object.session;
  filteredObject.exercise_id = object.exercise;
  return filteredObject;
})


console.log(allData['activity']);
// console.log(allData['user']);
// console.log(Object.keys(allData));

export async function seed(knex) {
  let allTables = Object.keys(allData);
  // move 'activity' table to the end to avoid foreign key issues
  allTables.shift();
  allTables.push('activity');
  allTables = allTables.filter(tableName => tableName !== 'user');
  allTables = ['user', ...allTables];
  for (let i = 0; i < allTables.length; i++) {
    const table = allTables[i];
    console.log(`Seeding ${table}`);
    await knex(table).del();
    await knex(table).insert(allData[table]);
    // console.log(allData[table]);
  }
}
