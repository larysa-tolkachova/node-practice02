import { Router } from 'express';
import {
  getAllProductsController,
  getProductByIdController,
  updateProductController,
  creatProductController,
  deleteProductController,
} from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createProductsSchema,
  updateProductsSchema,
} from '../validation/products.js';
import { validateId } from '../middlewares/validateId.js';

const router = Router();
router.get('/', ctrlWrapper(getAllProductsController));

router.get('/:id', validateId, ctrlWrapper(getProductByIdController));

router.patch(
  '/:id',
  validateId,
  validateBody(updateProductsSchema),
  ctrlWrapper(updateProductController),
);

router.post(
  '/',
  validateBody(createProductsSchema),
  ctrlWrapper(creatProductController),
);

router.delete('/:id', validateId, ctrlWrapper(deleteProductController));

export default router;
