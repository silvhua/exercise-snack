import fs from 'fs';
import { loadJsonFile, saveResponseJson } from './utils.js';



class NotionParser {
  constructor(filename) {
    this.filename = filename;
  }

  async loadJson() {
    /* 
    EXERCISES TABLE
    Property types: 
      ['created_time', 'rollup', 'relation', 'number', 'multi_select', 'last_edited_time', 'title']

    Properties
      Unique:
        'Name'

      One to many:
        'discreteness'
        'difficulty'

      Many to many:
        'muscles'
        'movement category'
        'modifier'
        'condition'
        'focus'

      Multi-select
        'environment'

      Rollups:
        'discreteness description'
        'body region'

      Metadata:
        'Created time'
        'Last edited time'
    */
    this.data = await loadJsonFile(this.filename);
    const { properties } = await this.data[0];
    this.propertyNames = Object.keys(properties);
    this.propertyTypes = [...new Set(this.propertyNames.map(name => properties[name].type))];
    // this.propertyTypes.forEach(type => { console.log(type) });
  }

  async parseData() {
    const parsedData = [];
    for (let i = 0; i < this.data.length; i++) {
      parsedData.push(await this.parsePage(this.data[i]));
    }
    // const parsedData = Promise.all(this.data.map(async (page) => await this.parsePage(page)));
    // console.log('parsedData', parsedData);
    return parsedData;
  }

  async parsePage(pageObject) {
    const parsedPageObject = {};
    parsedPageObject.id = pageObject.id;
    parsedPageObject.databaseId = pageObject.parent.database_id || null;
    parsedPageObject.url = pageObject.url;
    for (const property of this.propertyNames) {
      const pageProperties = await pageObject.properties;
      const type = await pageProperties[property].type;
      const typeValue = await pageProperties[property][type];
      if (type === 'relation') {
        parsedPageObject[property] = await typeValue.map(typeObject => typeObject.id);
      } else if (['number', 'last_edited_time', 'created_time'].includes(type)) {
        parsedPageObject[property] = await typeValue;
      } else if (type === 'multi_select') {
        parsedPageObject[property] = await typeValue.map(typeObject => typeObject.name);
      } else if (type === 'title') {
        parsedPageObject[property] = await typeValue[0]?.plain_text || '?';
      }
    }

    // console.log('parsedPageObject', parsedPageObject);
    return parsedPageObject;
  }
}
async function parseNotion() {
  const filename = 'raw_movement_2024-06-20_2117'
  const parser = new NotionParser(`./data/${filename}.json`);
  await parser.loadJson();
  const parsedData = await parser.parseData();
  await saveResponseJson(parsedData, `./data/${filename}_parsed`);
  return parsedData;
}
const parser = parseNotion();
