import express from 'express';
import {
  placeOrder,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} from '../controllers/orderController';

const router = express.Router();

router.post('/', placeOrder);
router.get('/:id', getOrderById);
router.get('/', getAllOrders);
router.put('/:id', updateOrderStatus);

export default router;
