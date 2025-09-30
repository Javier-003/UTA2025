import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: 'localhost',
  user: 'utaserver',
  password: 'utaserveruta2025',
  database: 'uta2025',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

