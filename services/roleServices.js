const db = require("../db");

exports.createRole = async (data) => {
  const { name, description } = data;
  const result = await db.query(
    "INSERT INTO schema.role (name, description) VALUES ($1, $2) RETURNING *",
    [name, description]
  );
  return result.rows[0];
};

exports.getAllRoles = async () => {
  const result = await db.query("SELECT * FROM schema.role");
  return result.rows;
};

exports.getRoleById = async (id) => {
  const result = await db.query("SELECT * FROM schema.role WHERE idrole = $1", [
    id,
  ]);
  if (!result.rows.length) throw new Error("Record not found");
  return result.rows[0];
};

exports.updateRole = async (id, data) => {
  const keys = Object.keys(data);
  for (const key of keys) {
    await db.query(`UPDATE schema.role SET ${key} = $1 WHERE idrole = $2`, [
      data[key],
      id,
    ]);
  }
  const result = await db.query("SELECT * FROM schema.role WHERE idrole = $1", [
    id,
  ]);
  return result.rows[0];
};

exports.deleteRole = async (id) => {
  const result = await db.query("SELECT * FROM schema.role WHERE idrole = $1", [
    id,
  ]);
  if (!result.rows.length) throw new Error("Record not found");
  await db.query("DELETE FROM schema.role WHERE idrole = $1", [id]);
  return result.rows[0];
};
