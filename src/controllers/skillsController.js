const pool = require('../config/db'); 

exports.getAllSkills = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM skills');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createSkill = async (req, res) => {
  const { name, level } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO skills (name, level) VALUES ($1, $2) RETURNING *',
      [name, level]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSkill = async (req, res) => {
  const { id } = req.params;
  const { name, level } = req.body;
  try {
    const result = await pool.query(
      'UPDATE skills SET name = $1, level = $2 WHERE id = $3 RETURNING *',
      [name, level, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSkill = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM skills WHERE id = $1', [id]);
    res.json({ message: 'Habilidade removida.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
