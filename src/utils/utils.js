import fs from 'fs';

export function getIsoTimestamp() {
  const currentDate = new Date();
  return currentDate.toISOString();
}

export function getCurrentTimestamp() {
  /**
  * Returns the current timestamp in the format "YYYY-MM-DD_HHMM".
  *
  * @return {string} The formatted timestamp.
  */
  const date = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
  const dateTime = new Date(date);
  const year = dateTime.getFullYear();
  const month = String(dateTime.getMonth() + 1).padStart(2, "0");
  const day = String(dateTime.getDate()).padStart(2, "0");
  const hours = String(dateTime.getHours()).padStart(2, "0");
  const minutes = String(dateTime.getMinutes()).padStart(2, "0");
  const formattedTimestamp = year + "-" + month + "-" + day + "_" + hours + minutes;
  return formattedTimestamp;
}

export async function saveResponseJson(data, jsonFilename, appendTimestamp) {
  try {
    if (appendTimestamp) {
      // remove extension if present before adding timestamp
      if (jsonFilename.endsWith('.json')) {
        jsonFilename = jsonFilename.split('.json')[0];
      } 
      const timestamp = getCurrentTimestamp();
      jsonFilename = `${jsonFilename}_${timestamp}`;
    }
    if (!jsonFilename.endsWith('.json')) {
      jsonFilename += '.json';
    }
    await fs.promises.writeFile(jsonFilename, JSON.stringify(data, null, 2));
    console.log(`Saved response to ${jsonFilename}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
  return jsonFilename;
}

export function loadJsonFile(filename, path = '', verbose=false) {
  /**
   * Loads a JSON file from the specified path and returns the parsed data.
   *
   * @param {string} filename - The name of the JSON file to load.
   * @param {string} [path='../private'] - The path to the directory containing the JSON file. Defaults to '../private'.
   * @return {object} The parsed JSON data from the file, or null if there was an error.
   */
  try {
    const filePath = `${path}${filename}`;
    if (verbose) {
      console.log(`Loading JSON file: ${filePath}`);
    }
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(jsonData);
    return data;
  } catch (error) {
    console.error('Error loading JSON file:', error);
    return null;
  }
}

export async function getLastUpdate(databaseId, trackingFile, key) {
  const trackingObject = await loadJsonFile(trackingFile);
  const lastUpdated = trackingObject?.[databaseId]?.[key] || "2024-01-01T00:00:00-08:00";
  console.log(`Data last fetched ${lastUpdated}`);
  return [lastUpdated, trackingObject];
}