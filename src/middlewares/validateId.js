import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return next(createHttpError(400, 'Id is not valid'));
  }
  next();
};
