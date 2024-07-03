
export function convertToSnakeCase(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(convertToSnakeCase);
  }
  
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [toSnakeCase(key), convertToSnakeCase(value)])
  );
}

export function toSnakeCase(str) {
  return str.replace(/\W+/g, ' ').split(/(?=[A-Z])/).map((part, index) => {
    return index > 0 ? part.toLowerCase() : part.toLowerCase().replace(/\s+/g, '_');
  }).join('_');
}

export function convertISO8601ToMySQL(timestampString) {
  const timestamp = new Date(timestampString);
  const year = timestamp.getFullYear();
  const month = String(timestamp.getMonth() + 1).padStart(2, '0');
  const day = String(timestamp.getDate()).padStart(2, '0');
  const hour = String(timestamp.getHours()).padStart(2, '0');
  const minute = String(timestamp.getMinutes()).padStart(2, '0');
  const second = String(timestamp.getSeconds()).padStart(2, '0');
  const millisecond = String(timestamp.getMilliseconds()).padStart(3, '0');
  
  return `${year}-${month}-${day} ${hour}:${minute}:${second}.${millisecond}`;
}

export function transformArrayValues(array, timestampKeys) {
  typeof timestampKeys === 'string' ? timestampKeys = [timestampKeys] : timestampKeys = timestampKeys;
  
  const newArray = array.map(object => {
    for (let i = 0; i < timestampKeys.length; i++) {
      const currentKey = timestampKeys[i];
      const formattedTimestamp = convertISO8601ToMySQL(object[currentKey]);
      object[currentKey] = formattedTimestamp;
    }
    return object
  })
  
  return newArray;
}

const data = [
  {
    "id": "68832720-0d92-4f0e-9a32-2bb96da5f925",
    "databaseId": "0848d627-2058-4c65-b9ca-255e6f1141ff",
    "url": "https://www.notion.so/rotator-cuff-688327200d924f0e9a322bb96da5f925",
    "Last edited time": "2024-06-04T19:40:00.000Z",
    "Name": "rotator cuff"
  },
  {
    "id": "011c8353-bd55-42ec-b26c-38b30ec81450",
    "databaseId": "0848d627-2058-4c65-b9ca-255e6f1141ff",
    "url": "https://www.notion.so/serratus-anterior-011c8353bd5542ecb26c38b30ec81450",
    "Last edited time": "2024-06-04T19:40:00.000Z",
    "Name": "serratus anterior"
  }
]

