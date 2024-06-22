import 'dotenv/config';
import NotionApi from './NotionApi.js';
import parseNotion from './NotionParser.js';
import { databases, syncType, filepath, saveRawData } from './config.js';


async function getData() {
  console.log(`Save to filepath ${filepath}`);
  const trackingFile = './utils/tracking.json';

  const client = new NotionApi(trackingFile, filepath);

  let syncFunction;
  switch (syncType) {
    case 'full':
      syncFunction = async (databaseId, filename) => client.getData(databaseId, filename);
      console.log('Performing full sync for these databases:');
      break;
    default:
      syncFunction = async (databaseId, filename) => client.getNewData(databaseId, filename);
      console.log('Getting new data for these databases:');
  }

  databases.forEach(async (database) => {
    console.log(`\n${database}`);
    try {
      const databaseId = process.env[database];
      database = database.split('_')[0].toLocaleLowerCase();
      const parseRelations = database === 'exercise'; // whether or not to parse properties that are relations
      const filenameRaw = saveRawData && `raw/${database}`; // Raw data is only saved if this is a non-empty string.
      const filenameParsed = `${database}/${database}`;
      const data = await syncFunction(databaseId, filenameRaw);
      const savePath = `${filepath}/${filenameParsed}`;
      const parsedData = await parseNotion(data, savePath, databaseId, trackingFile, parseRelations);
      
      // await saveResponseJson(parsedData, `${filepath}/${filenameParsed}`, true)
    } catch (error) {
      console.error(error);
    }
  })
}

getData();
