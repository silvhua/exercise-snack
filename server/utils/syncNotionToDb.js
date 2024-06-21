import 'dotenv/config';
import NotionApi from './NotionApi.js';

const databaseKeys = Object.keys(process.env).filter(key => key.includes('DATABASE'));
const syncType = process.argv[2] || 'partial';


async function getData() {
  const filepath = process.argv[3] || './data/raw';
  console.log(filepath);
  // const filepath = null;
  const databaseId = process.env.EXERCISE_DATABASE;
  // const databaseId = process.env.MOVEMENT_DATABASE;
  const trackingFile = './utils/tracking.json';

  const client = new NotionApi(
    databaseId,
    trackingFile,
    filepath
  );

  let syncFunction;
  switch (syncType) {
    case 'full':
      syncFunction = client.getData;
      console.log('Performing full sync');
      break;
    default:
      syncFunction = client.getNewData;
      console.log('Getting new data');
  }
  const lastUpdate = await client.getLastUpdate();
  console.log(lastUpdate);
  // const data = await syncFunction(filepath);


  const data = await client.getNewData('data');
  // const data = await client.getData(filepath);
  console.log('\ndata:\n', data);
}

getData();
