import jwt from 'jsonwebtoken';
import appError from '../errors/AppError.js';

const authMiddleware = (req, res, next) => {
    // pegar o token através do header da requisicao que pegaremos atraves do bearer <token>
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]

    if (!token) {
        throw appError("Token não fornecido. Acesso negado", 401)
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) // decodificar o token
        req.data = decoded
        next()
    } catch (err) {
        throw appError("Sessão expirada, faça login novamente", 401)
    }
}

export default authMiddleware;