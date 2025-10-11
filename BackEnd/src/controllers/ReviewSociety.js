const pool = require('../config/promise')

exports.CreateReviewSociety = async (req, res) => {
    const { descriptionReview, ratingReview, userId } = req.body
    
    if (!descriptionReview || !ratingReview || !userId) {
        return res.status(400).json({
            message: 'Preencha todos os campos.',
            success: false
        });
    }

    try {
        const [existingReview] = await pool.query(
            `SELECT * FROM ReviewSociety WHERE descriptionReview = ? AND ratingReview = ? AND userId = ?`,
            [descriptionReview, ratingReview, userId]
        );

        if (existingReview.length > 0) {
            return res.status(422).json({
                message: 'Você já fez uma avaliação com os mesmos comentários e avaliações. Faça outro diferente.',
                success: false
            });
        }

        const [result] = await pool.query(
            `INSERT INTO ReviewSociety (descriptionReview, ratingReview, userId) VALUES (?, ?, ?)`,
            [descriptionReview, ratingReview, userId]
        );

        return res.status(201).json({
            message: 'Avaliação criada com sucesso.',
            success: true,
            data: result
        });
    } catch (error) {
        console.error("Erro ao criar avaliação:", error);
        return res.status(500).json({
            message: 'Erro ao se conectar com o servidor.',
            success: false,
        });
    }
}

exports.ViewReviewSociety = async (req, res) => {
    const sortOrder = req.query.sortOrder === 'newSet' ? 'DESC' : 'ASC'

    try {
        const [result] = await pool.query(`
            SELECT idReviewSociety, descriptionReview, ratingReview, userId, create_at, nameUser, image_profile 
            FROM ReviewSociety as r
            INNER JOIN User as u ON u.idUser = r.userId
            ORDER BY create_at ${sortOrder}
        `);

        return res.status(200).json({
            message: 'Avaliações carregadas com sucesso.',
            success: true,
            data: result
        });
    } catch (error) {
        console.error("Erro ao buscar avaliações:", error);
        return res.status(500).json({
            message: 'Erro ao se conectar com o servidor.',
            success: false,
        });
    }
}

exports.UpdateReviewSociety = async (req, res) => {
    const { descriptionReview, ratingReview, userId } = req.body
    const { idReviewSociety } = req.params

    if (!idReviewSociety || !descriptionReview || !ratingReview || !userId) {
        return res.status(400).json({
            message: 'Preencha todos os campos.',
            success: false
        });
    }

    try {
        const [existingReview] = await pool.query(
            'SELECT * FROM ReviewSociety WHERE idReviewSociety = ?',
            [idReviewSociety]
        );

        if (existingReview.length === 0) {
            return res.status(400).json({
                message: 'Essa avaliação ainda não existe.',
                success: false,
            });
        }

        const [result] = await pool.query(
            'UPDATE ReviewSociety SET descriptionReview = ?, ratingReview = ? WHERE idReviewSociety = ? AND userId = ?',
            [descriptionReview, ratingReview, idReviewSociety, userId]
        );

        return res.status(200).json({
            message: 'Avaliação atualizada com sucesso.',
            success: true,
            data: result
        });
    } catch (error) {
        console.error("Erro ao atualizar avaliação:", error);
        return res.status(500).json({
            message: 'Erro ao se conectar com o servidor.',
            success: false,
        });
    }
}

exports.DeleteReviewSociety = async (req, res) => {
    const { idReviewSociety } = req.params
    const { userId } = req.body

    if (!idReviewSociety || !userId) {
        return res.status(400).json({
            message: 'Preencha todos os campos.',
            success: false
        });
    }

    try {
        const [existingReview] = await pool.query(
            'SELECT * FROM ReviewSociety WHERE idReviewSociety = ? AND userId = ?',
            [idReviewSociety, userId]
        );

        if (existingReview.length === 0) {
            return res.status(400).json({
                message: 'Essa avaliação ainda não existe.',
                success: false,
            });
        }

        const [result] = await pool.query(
            'DELETE FROM ReviewSociety WHERE idReviewSociety = ? AND userId = ?',
            [idReviewSociety, userId]
        );

        return res.status(200).json({
            message: 'Avaliação deletada com sucesso.',
            success: true,
            data: result
        });
    } catch (error) {
        console.error("Erro ao deletar avaliação:", error);
        return res.status(500).json({
            message: 'Erro ao se conectar com o servidor.',
            success: false,
        });
    }
}