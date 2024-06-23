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
  let timestampKeys;
  notionDbName !== 'EXERCISE_DATABASE' ? timestampKeys = ['last_edited_time'] : timestampKeys = ['last_edited_time', 'created_time']
  data = transformArrayValues(data, timestampKeys);
  return data;
}

function createManyToManyObject(tableName, originalArray, arrayProperty) {
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

const allData = {};
notionDbNames.forEach(dbName => {
  const tableName = dbName.split('_DATABASE')[0].toLocaleLowerCase();
  allData[tableName] = processData(dbName);
})

const relatedTables = Object.keys(allData).filter(
  key => key !== mainTableName && key != 'discreetness'
)
const multiselectProperties = ['environment'];
const arrayProperties = [...relatedTables, ...multiselectProperties];

const exerciseDataArray = allData[mainTableName];

arrayProperties.forEach(property => {
  allData[`${mainTableName}_${property}`] = createManyToManyObject(mainTableName, exerciseDataArray, property)
})

// Remove relation properties
allData[mainTableName] = allData[mainTableName].map(object => {
  const { muscle, movement, modifier, condition, discreetness, environment, focus, ...filteredObject } = object;
  return filteredObject;
})

console.log(Object.keys(allData));

export async function seed(knex) {
  const allTables = Object.keys(allData);
  for (let i = 0; i < allTables.length; i++) {
    const table = allTables[i];
    console.log(`Seeding ${table}`);
    await knex(table).del();
    await knex(table).insert(allData[table]);
    console.log(allData[table]);
  }
}
