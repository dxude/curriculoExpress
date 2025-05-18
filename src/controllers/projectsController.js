const pool = require('../config/db');

exports.getAllProjects = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects');
    res.json({
      success: true,
      count: result.rowCount,
      data: result.rows
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Error fetching projects',
      details: err.message
    });
  }
};

exports.getProjectById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Error fetching project',
      details: err.message
    });
  }
};

exports.createProject = async (req, res) => {
  const { title, description, url } = req.body;

  
  if (!title || !description) {
    return res.status(400).json({
      success: false,
      error: 'Title and description are required'
    });
  }

  try {
    const result = await pool.query(
      'INSERT INTO projects (title, description, url) VALUES ($1, $2, $3) RETURNING *',
      [title, description, url]
    );
    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Error creating project',
      details: err.message
    });
  }
};

exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, url } = req.body;

  try {
    const result = await pool.query(
      'UPDATE projects SET title = $1, description = $2, url = $3 WHERE id = $4 RETURNING *',
      [title, description, url, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Error updating project',
      details: err.message
    });
  }
};

exports.deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM projects WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully',
      deleted: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Error deleting project',
      details: err.message
    });
  }
};