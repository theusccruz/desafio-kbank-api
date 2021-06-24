import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const clientDB = new Client({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT),
});

clientDB.connect();

export default clientDB;
