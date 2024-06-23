import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

async function selectData(tableName) {
  const data = await knex(tableName);
  return data;
}

async function run() {
  const data = await selectData('exercise');
  console.log('data fetched');
  console.log(data);
}

run();

// router.get("/", async (_req, res) => {
//   try {
//     const data = await knex("user");
//     res.status(200).json(data);
//   } catch (err) {
//     res.status(400).send(`Error retrieving Users: ${err}`);
//   }
// });

// export default router;
