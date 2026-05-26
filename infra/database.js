import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
  });

  try {
    await client.connect();

    const result = await client.query(queryObject);
    return result;
  } catch (err) {
    console.error("Failed to connect to the database:", err);
    throw err;
  } finally {
    await client.end();
  }
}

const database = { query };

export default database;
