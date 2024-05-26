const db = require("../models/db");

exports.createProject = async (req, res) => {
  const { name, description } = req.body;
  try {
    const project = await db.query(
      "INSERT INTO schema.project (name, description) VALUES ($1, $2) RETURNING *",
      [name, description]
    );
    res.json(project.rows[0]);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await db.query("SELECT * FROM schema.project");
    res.json(projects.rows);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

exports.getProjectById = async (req, res) => {
  const id = req.params.id;
  try {
    const project = await db.query(
      "SELECT * FROM schema.project WHERE idproject = $1",
      [id]
    );

    if (!project.rows.length) throw new Error("Record not found");

    res.json(project.rows[0]);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

exports.updateProject = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  if (data.idproject) delete data.idproject;

  try {
    for (const [key, value] of Object.entries(data)) {
      await db.query(
        `UPDATE schema.project SET ${key} = $1 WHERE idproject = $2`,
        [value, id]
      );
    }

    const project = await db.query(
      "SELECT * FROM schema.project WHERE idproject = $1",
      [id]
    );
    res.json(project.rows[0]);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

exports.deleteProject = async (req, res) => {
  const id = req.params.id;
  try {
    const project = await db.query(
      "SELECT * FROM schema.project WHERE idproject = $1",
      [id]
    );

    if (!project.rows.length) throw new Error("Record not found");

    await db.query("DELETE FROM schema.project WHERE idproject = $1", [id]);
    res.json(project.rows[0]);
  } catch (err) {
    res.status(404).json(err.message);
  }
};
