const pool = require('../config/db');

exports.getAllEducations = async (req, res) => {  
  try {
    const result = await pool.query('SELECT * FROM education');  
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createEducation = async (req, res) => {
  const { institution, degree, start_date, end_date, user_id } = req.body;

  if (!institution || !degree || !start_date || !user_id) {
    return res.status(400).json({
      success: false,
      error: "Todos os campos são obrigatórios: institution, degree, start_date, user_id"
    });
  }

  try {
    const userCheck = await pool.query('SELECT id FROM users WHERE id = $1', [user_id]);
    if (userCheck.rowCount === 0) {
      return res.status(404).json({
        success: false,
        error: "Usuário não encontrado"
      });
    }

    const result = await pool.query(
      `INSERT INTO education 
       (institution, degree, start_date, end_date, user_id) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [institution, degree, start_date, end_date || null, user_id]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0]
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Erro ao criar formação acadêmica",
      details: err.message
    });
  }
};

exports.updateEducation = async (req, res) => {
  const { id } = req.params;
  const { institution, degree, start_date, end_date } = req.body;
  try {
    const result = await pool.query(
      'UPDATE education SET institution = $1, degree = $2, start_date = $3, end_date = $4 WHERE id = $5 RETURNING *',
      [institution, degree, start_date, end_date, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEducation = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM education WHERE id = $1', [id]);
    res.json({ message: 'Formação removida.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 

exports.getEducationById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query('SELECT * FROM education WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Formação acadêmica não encontrada"
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Erro ao buscar formação acadêmica",
      details: err.message
    });
  }
}; 