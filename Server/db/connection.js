
import mysql from 'mysql2/promise';

export const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1223',
    database: 'UT2025_3'
});
