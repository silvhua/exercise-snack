import { loadJsonFile, saveResponseJson, getLastUpdate, getIsoTimestamp } from './utils.js';

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
      'context'
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
  constructor(filenameOrArray, parseRelations = false) {
    /**
     * Initializes a new instance of the NotionParser class.
     *
     * @param {string | Array} filenameOrArray - The filename or array of data to be parsed.
     * @param {boolean} [parseRelations=false] - Whether to parse relation properties or not. Defaults to false.
     */
    this.data = filenameOrArray;
    this.parseRelations = parseRelations;
  }

  async parseData(
    path, databaseId, trackingFile, propertiesToDestructure = null,
    dropTitle=false
  ) {
    this.trackingFile = trackingFile;
    this.propertiesToDestructure = propertiesToDestructure;
    this.dropTitle = dropTitle;
    let updateDate;
    if (typeof this.data === 'string') {
      await this.loadJson(this.data);
      updateDate = false;
    } else {
      this.rawDataArray = this.data;
      updateDate = true;
    }
    await this.parseProperties();
    const parsedData = [];
    for (let i = 0; i < this.rawDataArray.length; i++) {
      parsedData.push(await this.parsePage(this.rawDataArray[i]));
    }
    this.save(parsedData, path, databaseId, updateDate);
    return parsedData;
  }

  async loadJson(filename) {
    this.rawDataArray = await loadJsonFile(filename);
  }

  async parseProperties() {
    const { properties } = await this.rawDataArray[0];
    this.propertyNames = Object.keys(properties);
    this.propertyTypes = [...new Set(this.propertyNames.map(name => properties[name].type))];
  }

  async parsePage(pageObject) {
    const parsedPageObject = {};
    parsedPageObject.id = pageObject.id;
    parsedPageObject.url = pageObject.url;
    if (!this.propertyNames.includes('Created time')) {
      // parse this meta data if it is not explicitely included in the notion table as property
      parsedPageObject.created_time = pageObject.created_time;
    }
    for (let property of this.propertyNames) {
      const pageProperties = await pageObject.properties
      const type = await pageProperties[property].type;
      const typeValue = await pageProperties[property][type];
      if (type === 'relation' && this.parseRelations) {
        parsedPageObject[property] = await typeValue.map(typeObject => typeObject.id);
        if (this.propertiesToDestructure.includes(property)) {
          parsedPageObject[property] = parsedPageObject[property][0];
        }
      } else if (['number', 'last_edited_time', 'created_time', 'email'].includes(type)) {
        parsedPageObject[property] = await typeValue;
      } else if (type === 'multi_select') {
        parsedPageObject[property] = await typeValue.map(typeObject =>
          typeObject.name
        );
      } else if (type === 'rich_text' || (type === 'title' && !this.dropTitle)) {
        parsedPageObject[property] = await typeValue[0]?.plain_text || '?';
      } else if (type === 'select') {
        parsedPageObject[property] = await typeValue?.name;
      }
    }
    return parsedPageObject;
  }

  async save(object, path, databaseId, updateDate, appendTimestamp = true) {
    // Save the parsed data
    const savedFilename = await saveResponseJson(object, path, appendTimestamp);
    await this.loadTrackingFile(databaseId, this.trackingFile);
    
    // Update the tracking file with the filename of the newest filename
    this.trackingObject[databaseId] = await this.trackingObject[databaseId] || {};
    this.trackingObject[databaseId]['newest_json'] = savedFilename;

    if (updateDate) {
      const currentTimestamp = getIsoTimestamp() || '';
      this.trackingObject[`${databaseId}`]['last_notion_pull'] = currentTimestamp;
    }
    await saveResponseJson(this.trackingObject, this.trackingFile, false);
    console.log(`Updated ${this.trackingFile} with newest filename: ${savedFilename}`);
  }

  async loadTrackingFile(databaseId, trackingFile) {
    this.trackingObject = await loadJsonFile(trackingFile);
    const [_lastUpdated, trackingObject] = await getLastUpdate(databaseId, trackingFile, 'last_notion_pull');
    this.trackingObject = trackingObject;
  }
}

async function parseNotion(
  filenameOrArray, savePath, databaseId, trackingFile, dropTitle,
  parseRelations = false
) {
  /**
   * Parses the Notion data from either a filename or an array.
   *
   * @param {string|Array} filenameOrArray - The filename or array of data to be parsed.
   * @param {boolean} [parseRelations=false] - Whether to parse relation properties or not. Defaults to false.
   * @return {Promise<Array>} - A promise that resolves to an array of parsed data.
   */
  const parser = new NotionParser(filenameOrArray, parseRelations);

  // These are properties stored in arrays where only the first element is required
  const propertiesToDestructure = [
    'discreetness', // exercise table
    'video_id', // exercise table
    'user_id', // session table
    'exercise', // actvity table
    'session_id', // actvity table
  ]
  const parsedData = await parser.parseData(
    savePath, databaseId, trackingFile, propertiesToDestructure,
    dropTitle
  );
  return parsedData;
}
export default parseNotion;
