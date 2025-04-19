import { Request, Response } from 'express';
import pool from '../db';
import { Order } from '../types';

export const placeOrder = async (req: Request, res: Response): Promise<void> => {
  const { buyer_name, buyer_contact, delivery_address, items }: Order = req.body;

  if (!buyer_name || !buyer_contact || !delivery_address || !items) {
    res.status(400).json({ error: 'Missing fields' });
    return;
  }

  try {
    const result = await pool.query(
      'INSERT INTO orders (buyer_name, buyer_contact, delivery_address, items) VALUES ($1, $2, $3, $4) RETURNING *',
      [buyer_name, buyer_contact, delivery_address, JSON.stringify(items)]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error placing order' });
  }
};

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(404).json({ error: 'Order not found' });
  }
};

export const getAllOrders = async (_: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query('SELECT * FROM orders ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const result = await pool.query(
      'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: 'Error updating status' });
  }
};
