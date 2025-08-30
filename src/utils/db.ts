import mysql from 'mysql2'
import { env } from './utils'

const DB = mysql.createConnection({
  host: env('DB_HOST'),
  user: env('DB_USER'),
  password: env('DB_PASS'),
  database: env('DB_NAME')
})

export default DB
