import { processData, createManyToManyObject } from "../utils/utils.js";


const mainTableName = 'exercise';


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
  // 'exercise_environment', 
  // 'exercise_movement',
  // 'exercise_context',
  // 'exercise_focus',
  // 'exercise_modifier',
  // 'exercise_muscle',
  // 'exercise_tip'
]

const allData = {}; // Object where each property contains all the data for a given table
notionDbNames.forEach(dbName => {
  allData[dbName] = processData(dbName);
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


export async function seed(knex) {
  let allTables = Object.keys(allData);
  for (let i = 0; i < allTables.length; i++) {
    const table = allTables[i];
    console.log(`Seeding ${table}`);
    await knex(table).del();
    await knex(table).insert(allData[table]);
  }
}
