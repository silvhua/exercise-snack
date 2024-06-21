import 'dotenv/config';

const databaseVariables = Object.keys(process.env).filter(key => key.includes('DATABASE'));

console.log(databaseVariables);