
export function errorHandler(err, req, res, next) {
  // err && err.statusCode

  if (err?.statusCode) {
    return res.status(err.statusCode).json({
      message: err.message,
      success: false
    });
  }

  console.error("ERRO INTERNO:", err);

  return res.status(500).json({
    message: "Erro interno",
    success: false
  });
}