import 'dotenv/config';
import NotionApi from './NotionApi.js';
import * as config from './config.js';
import parseNotion from './NotionParser.js';
import { saveResponseJson } from './utils.js';

const syncType = config.syncType;
const databases = config.databases;

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

  databases.forEach(async (database) => {
    const databaseId = process.env[database];
    database = database.split('_')[0].toLocaleLowerCase();
    const filenameRaw = null;
    const filenameParsed = `${database}/${database}`;
    const data = await syncFunction(databaseId, filenameRaw);
    const parsedData = await parseNotion(data);
    await saveResponseJson(parsedData, `./data/${filenameParsed}_parsed`)
  })
  // console.log('\ndata:\n', data);
}

getData();
