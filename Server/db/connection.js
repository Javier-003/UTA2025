import mysql from 'mysql2/promise';


export const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
    password: '123456789', // su contraseña de mysql
    database: 'UT2025',  // el nombre de la base de datos, de preferencia creen una con el mismo nombre que aqui aparece e importan la que les mandare
  waitForConnections: true,
  connectionLimit: 10, // 🔹 Permite hasta 10 conexiones simultáneas
  queueLimit: 0
});

