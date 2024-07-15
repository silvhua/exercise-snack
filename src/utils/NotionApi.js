
import { Client } from '@notionhq/client';
import 'dotenv/config';
import { getIsoTimestamp, saveResponseJson, getLastUpdate, loadJsonFile } from './utils.js';
import fs from 'fs';

class NotionApi {
  constructor(trackingFile=null, filepath=null) {
    this.notionApiKey = process.env.notion_secret;
    this.filepath = filepath || '';
    this.notion = new Client({ auth: this.notionApiKey });
    this.trackingFile = trackingFile;
  }

  async save(object, filename, appendTimestamp = true) {
    const fullPath = `${this.filepath}/${filename}` || filename;
    await saveResponseJson(object, fullPath, appendTimestamp);
  }

  async getLastUpdate(databaseId) {
    const [lastUpdated, trackingObject] = await getLastUpdate(databaseId, this.trackingFile, 'last_notion_pull');
    this.trackingObject = trackingObject;
    return lastUpdated;
  }

  async getData(databaseId, filename=null, appendTimestamp=true, filter=null) {
    const pages = [];
    let cursor = undefined;
    const requestObject = {
      database_id: databaseId,
      start_cursor: cursor
    }
    if (filter) {
      requestObject.filter = filter;
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
      this.trackingObject[`${databaseId}`] = this.trackingObject[`${databaseId}`] || {};
      const currentTimestamp = getIsoTimestamp() || '';
      this.trackingObject[`${databaseId}`]['last_notion_pull'] = currentTimestamp;
      fs.writeFileSync(this.trackingFile, JSON.stringify(this.trackingObject, null, 2));
      console.log(`Updated ${this.trackingFile} with current timestamp: ${currentTimestamp}`);
    }
    return pages;
  }

  async getNewData(databaseId, filename = null, appendTimestamp = true, filter = null) {
    const lastUpdated = await this.getLastUpdate(databaseId);

    const filterArray = [
      { property: 'Last edited time', date: { after: lastUpdated } }
    ]
    if (filter) {
      filterArray.push(filter)
    }
    filter = {
      and: filterArray
    }
    const data = await this.getData(databaseId, filename, appendTimestamp, filter);
    return data;
  }
}

export default NotionApi;
