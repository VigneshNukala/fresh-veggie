import express from 'express';
import {
  getProducts,
  addProduct,
  editProduct,
  deleteProduct,
} from '../controllers/productController';

const router = express.Router();

router.get('/', getProducts);
router.post('/', addProduct);
router.put('/:id', editProduct);
router.delete('/:id', deleteProduct);

export default router;
