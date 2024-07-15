import { loadJsonFile, processData } from "../utils/utils.js";
import 'dotenv/config';
import { convertToSnakeCase, transformArrayValues } from "../utils/transformForSql.js";

const mainTableName = 'exercise';
const trackingObject = loadJsonFile('./utils/tracking.json');

// const notionDbNames = Object.keys(process.env).filter(key => key.endsWith('_DATABASE'));

const notionDbNames = [
  'video',
  'discreetness',
  'exercise',
  'environment',
  'movement',
  'context',
  'focus',
  'modifier',
  'muscle',
  'tip',
  'exercise_environment', 
  'exercise_movement',
  'exercise_context',
  'exercise_focus',
  'exercise_modifier',
  'exercise_muscle',
  'exercise_tip'
]

const allData = {}; // Object where each property contains all the data for a given table
notionDbNames.forEach(dbName => {
  allData[tableName] = processData(dbName);
})

// Create the one to many & many to many tables branching from `exercise`table
const oneToManyTables = [
  'movement', 'muscle', 'modifier', 'focus', 'context', 'environment', 'tip', 
]

// const multiselectProperties = ['environment'];
// const arrayProperties = [...oneToManyTables, ...multiselectProperties];
const arrayProperties = [...oneToManyTables];

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
  for (let i = 0; i < allTables.length; i++) {
    const table = allTables[i];
    console.log(`Seeding ${table}`);
    await knex(table).del();
    await knex(table).insert(allData[table]);
  }
}
