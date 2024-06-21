import { loadJsonFile, saveResponseJson } from './utils.js';

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
class NotionParser {
  constructor(filenameOrArray) {
    this.data = filenameOrArray;
  }

  async loadJson(filename) {
    this.rawDataArray = await loadJsonFile(filename);
  }

  async parseProperties() {
    const { properties } = await this.rawDataArray[0];
    this.propertyNames = Object.keys(properties);
    this.propertyTypes = [...new Set(this.propertyNames.map(name => properties[name].type))];
    // this.propertyTypes.forEach(type => { console.log(type) });
  }

  async parseData() {
    if (typeof this.data === 'string') {
      await this.loadJson(this.data);
    } else {
      this.rawDataArray = this.data;
    }
    await this.parseProperties();
    const parsedData = [];
    for (let i = 0; i < this.rawDataArray.length; i++) {
      parsedData.push(await this.parsePage(this.rawDataArray[i]));
    }
    return parsedData;
  }

  async parsePage(pageObject) {
    const parsedPageObject = {};
    parsedPageObject.id = pageObject.id;
    parsedPageObject.databaseId = pageObject.parent.database_id || null;
    parsedPageObject.url = pageObject.url;
    for (const property of this.propertyNames) {
      const pageProperties = await pageObject.properties
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
    return parsedPageObject;
  }
}
async function parseNotion(filenameOrArray) {
  const filename = 'raw_movement_2024-06-20_2117';
  const parser = new NotionParser(filenameOrArray);
  const parsedData = await parser.parseData();
  return parsedData;
}
export default parseNotion;
