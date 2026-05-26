import { Client } from "pg";

async function query(queryObject) {
  let client;

  try {
    client = await getClient();

    const result = await client.query(queryObject);
    return result;
  } catch (err) {
    console.error("Failed to connect to the database:", err);
    throw err;
  } finally {
    await client.end();
  }
}

async function getClient() {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
  });

  await client.connect();
  return client;
}

const database = { query, getClient };

export default database;
