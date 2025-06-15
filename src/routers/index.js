import { Router } from 'express';
// import contactsRouter from './contacts.js';
import authRouter from './auth.js';
import productsRouter from '../routers/products.js';

const router = Router();

// router.use('/contacts', contactsRouter);
router.use('/products', productsRouter);

router.use('/auth', authRouter);

export default router;
