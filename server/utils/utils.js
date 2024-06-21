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

export async function saveResponseJson(data, jsonFileName, appendTimestamp) {
  try {
    if (appendTimestamp) {
      const timestamp = getCurrentTimestamp();
      jsonFileName = `${jsonFileName}_${timestamp}`
    }
    await fs.promises.writeFile(`${jsonFileName}.json`, JSON.stringify(data, null, 2));
    console.log(`Saved response to ${jsonFileName}.json`);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function loadJsonFile(filename, path = '') {
  /**
   * Loads a JSON file from the specified path and returns the parsed data.
   *
   * @param {string} filename - The name of the JSON file to load.
   * @param {string} [path='../private'] - The path to the directory containing the JSON file. Defaults to '../private'.
   * @return {object} The parsed JSON data from the file, or null if there was an error.
   */
  try {
    const filePath = `${path}${filename}`;
    console.log(`Loading JSON file: ${filePath}`);
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(jsonData);
    return data;
  } catch (error) {
    console.error('Error loading JSON file:', error);
    return null;
  }
}