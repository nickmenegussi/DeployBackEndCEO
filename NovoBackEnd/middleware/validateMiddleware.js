import appError from "../errors/AppError.js";

const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    }, { abortEarly: false });
    return next();
  } catch (err) {
    const message = err.inner.map((error) => error.message).join(", ");
    next(appError(message, 400));
  }
};

export default validate;
