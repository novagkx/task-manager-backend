import pg from "pg";
const { Pool } = pg;
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: "5432",
  password: "3112",
  database: "task_manager_db",
});

export default pool;