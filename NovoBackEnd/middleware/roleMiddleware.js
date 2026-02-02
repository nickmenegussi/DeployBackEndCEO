const { default: appError } = require("../errors/AppError")

const verifyPermission = (allowedRoles) => {
  return (req, res, next) => {
    const user = req.data

    if (!user) {
      throw appError("Usuário não autenticado.", 401)
    }

    // aqui eu faço uma verificação para ver se as permissões que eu colocar quando chamar o middlware incluem o que está nas informações do usuário, bem como, a permissão dele.
    if (!allowedRoles.includes(user.role)) {
      throw appError("Permissão negada. Você não tem acesso a esta rota.", 403);
    }

    next()
  }
}
module.exports = verifyPermission;