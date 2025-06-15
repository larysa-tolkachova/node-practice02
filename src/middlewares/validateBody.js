import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    console.log(req.body);
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    const error = err.details.map((detail) => detail.message);
    console.log('Error in validateBody', error);

    next(createHttpError(400, error));
  }
};
