import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValues(),
  });

  console.log({
    POSTGRES_HOST: [
      process.env.POSTGRES_HOST,
      typeof process.env.POSTGRES_HOST,
    ],
    POSTGRES_PORT: [
      process.env.POSTGRES_PORT,
      typeof process.env.POSTGRES_PORT,
    ],
    POSTGRES_USER: [
      process.env.POSTGRES_USER,
      typeof process.env.POSTGRES_USER,
    ],
    POSTGRES_DB: [process.env.POSTGRES_DB, typeof process.env.POSTGRES_DB],
    POSTGRES_PASSWORD: [
      process.env.POSTGRES_PASSWORD,
      typeof process.env.POSTGRES_PASSWORD,
    ],
  });

  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}

function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }
  console.log("NODE_ENV: " + process.env.NODE_ENV);
  return process.env.NODE_ENV === "production" ? true : false;
}

export default {
  query,
};
