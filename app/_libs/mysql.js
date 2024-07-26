import mysql from 'mysql2/promise'
import 'dotenv/config';

console.log(`User: ${process.env.DB_USER}`)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    // connectionLimit: 2,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    queueLimit: 0, // The maximum number of connection requests the pool will queue before returning an error from getConnection.
    idleTimeout: 30000, // 30 seconds idle timeout
})

export default pool