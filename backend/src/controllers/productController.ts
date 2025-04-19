import { Request, Response } from 'express';
import pool from '../db';
import { Product } from '../types';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
    return;
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
    return;
  }
};

export const addProduct = async (req: Request, res: Response): Promise<void> => {
  const { name, price }: Product = req.body;
  if (!name || !price) {
    res.status(400).json({ error: 'Missing fields' });
    return;
  }

  try {
    const result = await pool.query(
      'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
      [name, price]
    );
    res.status(201).json(result.rows[0]);
    return;
  } catch (err) {
    res.status(500).json({ error: 'Error adding product' });
    return;
  }
};

export const editProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, price }: Product = req.body;

  try {
    const result = await pool.query(
      'UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *',
      [name, price, id]
    );
    res.json(result.rows[0]);
    return;
  } catch (err) {
    res.status(400).json({ error: 'Error updating product' });
    return;
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.json({ message: 'Product deleted' });
    return;
  } catch (err) {
    res.status(500).json({ error: 'Error deleting product' });
    return;
  }
};
