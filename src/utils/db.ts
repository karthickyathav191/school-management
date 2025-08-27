import mysql from 'mysql2'

const DB = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'school_management'
})

export default DB
