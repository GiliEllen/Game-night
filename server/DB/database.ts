import mysql from "mysql";

require("dotenv").config();

const sqlPassword = process.env.SQLPASSWORD;

const connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: sqlPassword,
    database: "gamenight",
    multipleStatements: true
  });
  
  connection.connect((err) => {
    try {
      if (err) throw err;
  
      console.info("🔥 MySQL is connected 🛢 ");
    } catch (error) {
      console.error(error);
    }
  });

  export default connection;