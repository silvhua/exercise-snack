import 'dotenv/config';
import NotionApi from './NotionApi.js';

const databaseKeys = Object.keys(process.env).filter(key => key.includes('DATABASE'));
const syncType = process.argv[2] || 'partial';


async function getData() {
  const filepath = process.argv[3] || './data/raw';
  console.log(`Save to filepath ${filepath}`);
  const trackingFile = './utils/tracking.json';

  const client = new NotionApi(
    trackingFile,
    filepath
  );

  let syncFunction;
  switch (syncType) {
    case 'full':
      syncFunction = async (databaseId, filename) => client.getData(databaseId, filename);
      console.log('Performing full sync');
      break;
    default:
      syncFunction = async (databaseId, filename) => client.getNewData(databaseId, filename);
      console.log('Getting new data');
  }

  databaseKeys.forEach(async (database) => {
    const databaseId = process.env[database];
    const data = await syncFunction(databaseId, database);
  })
  // console.log('\ndata:\n', data);
}

getData();
