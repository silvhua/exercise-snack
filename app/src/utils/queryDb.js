import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

async function selectData(tableName) {
  const data = await knex.select('*').from(tableName);
  await knex.destroy();
  return data;
}

async function run() {
  const data = await selectData('environment');
  return data
}

const data = run();
