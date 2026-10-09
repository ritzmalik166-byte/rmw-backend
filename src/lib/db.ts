import mysql, { Pool } from "mysql2/promise";


// Use globalThis instead of global
const globalForMySQL = globalThis as unknown as { _mysqlPool?: Pool };

const pool =
  globalForMySQL._mysqlPool ??
  mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: Number(process.env.DATABASE_PORT),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

if (process.env.NODE_ENV !== "production") {
  globalForMySQL._mysqlPool = pool; // ✅ Assign pool to globalThis
}

/** Returns a guaranteed MySQL pool instance */
export const getDBPool = (): Pool => {
  if (!pool) {
    throw new Error("Database pool is not initialized");
  }
  return pool;
};