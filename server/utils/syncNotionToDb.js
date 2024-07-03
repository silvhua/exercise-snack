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
  const tablesWhereTitleDropped = [ 
    // For these tables, drop the Notion property that is the "title" data type
    // 'discreetness', 'activity', 'session'
  'DISCREETNESS_DATABASE',
  'ACTIVITY_DATABASE',
  'SESSION_DATABASE',
  ]
  for (let i = 0; i < databases.length; i++) {
    let database = databases[i];
    console.log(`\n${database}`);
    try {
      const dropTitle = tablesWhereTitleDropped.includes(database);
      const databaseId = process.env[database];
      database = database.split('_')[0].toLocaleLowerCase();
      const parseRelations = database === 'exercise'; // whether or not to parse properties that are relations
      const filenameRaw = saveRawData && `raw/${database}`; // Raw data is only saved if this is a non-empty string.
      const filenameParsed = `${database}/${database}`;
      const data = await syncFunction(databaseId, filenameRaw);
      const savePath = `${filepath}/${filenameParsed}`;
      const parsedData = await parseNotion(
        data, savePath, databaseId, trackingFile, dropTitle, parseRelations
      );
    } catch (error) {
      console.error(error);
    }
    if (i < databases.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

// getData();
setTimeout(getData, 4000);


/* 
Steps for pulling data
1. Modify `config.js` as needed;

Run these commands in terminal (scripts defined in `package.json`)
2. `npm run pull` to pull all data. `npm run partial` to pull only new data.
3. `npm run migrate`.
4. `npm run seed`
*/