const pool = require('../config/db');  

exports.getAllCertifications = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM certifications');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ 
      error: err.message,
      details: 'Erro ao buscar certificações'
    });
  }
};

exports.createCertification = async (req, res) => {
  const { title, institution, date } = req.body;

  if (!title || !institution || !date) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO certifications (title, institution, date) VALUES ($1, $2, $3) RETURNING *',
      [title, institution, date]
    );
    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ 
      error: err.message,
      details: 'Erro ao criar certificação'
    });
  }
};

exports.updateCertification = async (req, res) => {
  const { id } = req.params;
  const { title, institution, date } = req.body;

  try {
    const result = await pool.query(
      'UPDATE certifications SET title = $1, institution = $2, date = $3 WHERE id = $4 RETURNING *',
      [title, institution, date, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Certificação não encontrada' });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ 
      error: err.message,
      details: 'Erro ao atualizar certificação'
    });
  }
};

exports.deleteCertification = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM certifications WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Certificação não encontrada' });
    }

    res.json({
      success: true,
      message: 'Certificação removida com sucesso',
      deleted: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ 
      error: err.message,
      details: 'Erro ao remover certificação'
    });
  }
};

exports.getCertificationById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM certifications WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Certificação não encontrada' });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ 
      error: err.message,
      details: 'Erro ao buscar certificação por ID'
    });
  }
};
