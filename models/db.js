const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "schema",
  password: "root",
  port: 5432,
});

client
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Connection error", err.stack));

module.exports = client;
