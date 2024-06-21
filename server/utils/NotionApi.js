
import { Client } from '@notionhq/client';
import 'dotenv/config';
import { getIsoTimestamp, saveResponseJson, loadJsonFile } from './utils.js';
import fs from 'fs';

class NotionApi {
  constructor(filepath, databaseId, trackingFile=null) {
    this.notionApiKey = process.env.notion_secret;
    this.filepath = filepath;
    this.notion = new Client({ auth: this.notionApiKey });
    this.databaseId = databaseId;
    this.trackingFile = trackingFile;
  }

  async save(object, filename, appendTimestamp=true) {
    await saveResponseJson(object, filename, appendTimestamp);
  }

  async getLastUpdate(trackingFile) {
    this.trackingFile = this.trackingFile || trackingFile;
    this.trackingObject = await loadJsonFile(this.trackingFile);
    const lastUpdated = this.trackingObject[this.databaseId] || "2024-01-01T00:00:00-08:00";
    console.log(`Data last fetched ${lastUpdated}`);
    return lastUpdated;
  }

  async getData(filename=null, appendTimestamp=true, filter=null) {
    const pages = [];
    let cursor = undefined;
    const requestObject = {
      database_id: this.databaseId,
      start_cursor: cursor
    }
    if (filter) {
      requestObject.filter = filter;
      console.log('filter in getData:', requestObject.filter)
    }
    while (true) {
      const {results, next_cursor} = await this.notion.databases.query(requestObject);
      pages.push(...results);
      if (!next_cursor) {
        break
      };
      cursor = next_cursor
    }
    console.log(`${pages.length} items successfully fetched.`)

    if (filename) {
      await this.save(pages, filename, appendTimestamp);
      const currentTimestamp = getIsoTimestamp();
      this.trackingObject[`test_${this.databaseId}`] = currentTimestamp;
      fs.writeFileSync(this.trackingFile, JSON.stringify(this.trackingObject));
      console.log(`Updated ${this.trackingFile} with current timestamp: ${currentTimestamp}`);
    }
    return pages;
  }

  async getNewData(filename = null, appendTimestamp = true, filter = null) {
    const lastUpdated = await this.getLastUpdate(filename);
    console.log('getNewData lastUpdated', lastUpdated);

    const filterArray = [
      { property: 'Last edited time', date: { after: lastUpdated } }
    ]
    if (filter) {
      filterArray.push(filter)
    }
    filter = {
      and: filterArray
    }
    const data = await this.getData(filename, appendTimestamp, filter);
    return data;
  }
}

async function getData() {
  const filepath = process.argv[2];
  const databaseId = process.env.EXERCISE_DATABASE;
  // const databaseId = process.env.MOVEMENT_DATABASE;
  const trackingFile = './utils/tracking.json';
  const client = new NotionApi(filepath, databaseId);
  client.getLastUpdate(trackingFile);
  const data = await client.getNewData(filepath);
  // const data = await client.getData(filepath);
  // console.log('\ndata:\n', data);
}

getData();
