const pool = require('../db'); 


const getAllCertifications = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM certifications');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar certificações' });
  }
};

// Buscar certificação por ID
const getCertificationById = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await pool.query('SELECT * FROM certifications WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Certificação não encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar certificação' });
  }
};

// Criar nova certificação
const createCertification = async (req, res) => {
  const { name, institution, date } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO certifications (name, institution, date) VALUES ($1, $2, $3) RETURNING *',
      [name, institution, date]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar certificação' });
  }
};

// Atualizar certificação
const updateCertification = async (req, res) => {
  const id = req.params.id;
  const { name, institution, date } = req.body;

  try {
    const result = await pool.query(
      'UPDATE certifications SET name = $1, institution = $2, date = $3 WHERE id = $4 RETURNING *',
      [name, institution, date, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Certificação não encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar certificação' });
  }
};

// Deletar certificação
const deleteCertification = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await pool.query('DELETE FROM certifications WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Certificação não encontrada' });
    }

    res.json({ mensagem: 'Certificação deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar certificação' });
  }
};

module.exports = {
  getAllCertifications,
  getCertificationById,
  createCertification,
  updateCertification,
  deleteCertification,
};
