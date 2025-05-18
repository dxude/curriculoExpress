const pool = require('../config/db');  

exports.getAllExperiences = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM experiences ORDER BY start_date DESC');
        res.json({
            success: true,
            count: result.rowCount,
            data: result.rows
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Erro ao buscar experiências profissionais',
            details: err.message
        });
    }
};

exports.createExperience = async (req, res) => {
    const { company, role, start_date, end_date, description, user_id } = req.body;

    if (!company || !role || !start_date || !user_id) {
        return res.status(400).json({
            success: false,
            error: 'Campos obrigatórios faltando: company, role, start_date e user_id'
        });
    }

    try {
        const result = await pool.query(
            `INSERT INTO experiences 
             (company, role, start_date, end_date, description, user_id) 
             VALUES ($1, $2, $3, $4, $5, $6) 
             RETURNING *`,
            [company, role, start_date, end_date, description, user_id]
        );
        
        res.status(201).json({
            success: true,
            data: result.rows[0]
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Erro ao criar experiência profissional',
            details: err.message
        });
    }
};

exports.updateExperience = async (req, res) => {
    const { id } = req.params;
    const { company, role, start_date, end_date, description } = req.body;

    try {
        const result = await pool.query(
            `UPDATE experiences 
             SET company = $1, role = $2, start_date = $3, end_date = $4, description = $5 
             WHERE id = $6 
             RETURNING *`,
            [company, role, start_date, end_date, description, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Experiência não encontrada'
            });
        }

        res.json({
            success: true,
            data: result.rows[0]
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Erro ao atualizar experiência profissional',
            details: err.message
        });
    }
};


exports.deleteExperience = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            `DELETE FROM experiences WHERE id = $1 RETURNING *`,
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Experiência não encontrada'
            });
        }

        res.json({
            success: true,
            message: 'Experiência excluída com sucesso'
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Erro ao excluir experiência profissional',
            details: err.message
        });
    }
}; 

exports.getExperience = async (req, res) => { 
    const { id } = req.params;

    try {
        const result = await pool.query(
            'SELECT * FROM experiences WHERE id = $1', 
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Experiência não encontrada'
            });
        }

        res.json({
            success: true,
            data: result.rows[0]
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Erro ao buscar experiência profissional',
            details: err.message
        });
    }
}; 