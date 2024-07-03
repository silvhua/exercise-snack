import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

async function selectData(tableName) {
  // const data = await knex(tableName);
  const data = await knex.select('*').from('exercise');
  console.log('inside the function')

  await knex.destroy();
  return data;
}

// function run() {

//   const data = selectData('exercise');
//   console.log('done.')

// }
async function run() {

  const data = await selectData('environment');
  console.log(data);
  console.log(typeof data);
  console.log('done.')
  return data
}

const data = run();
// data.push({'a': 'b'})
data['z'] = 'zzz';
console.log(data);
console.log('end')

// router.get("/", async (_req, res) => {
//   try {
//     const data = await knex("user");
//     res.status(200).json(data);
//   } catch (err) {
//     res.status(400).send(`Error retrieving Users: ${err}`);
//   }
// });

// export default router;
