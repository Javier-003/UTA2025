import mysql from 'mysql2/promise';


export const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
    password: '1234',
    database: 'UT2025', 
  waitForConnections: true,
  connectionLimit: 10, // 🔹 Permite hasta 10 conexiones simultáneas
  queueLimit: 0
});

