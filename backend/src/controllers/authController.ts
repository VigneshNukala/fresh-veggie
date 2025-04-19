import { Request, Response } from 'express';

import pool from '../db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  password: string;
};

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const SALT_ROUNDS = 10;

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password, role: expectedRole = 'customer' } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user: User = result.rows[0];

    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    if (user.role !== expectedRole) {
      res.status(403).json({ error: 'Access denied for this role' });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, role = 'customer' } = req.body;
//   console.log(name, email, password, role);
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    // console.log(hashedPassword);
    const result = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, email, hashedPassword, role]
    );
    // console.log(result);
    const user = result.rows[0];
    res.status(201).json(user);
  } catch (err) {
    if ((err as any) .code === '23505') {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: 'Registration failed' });
    }
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  // In a real implementation, you might want to invalidate the token
  res.json({ message: 'Logged out successfully' });
};

export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: 'No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const result = await pool.query('SELECT id, name, email, role FROM users WHERE id = $1', [decoded.id]);
    
    if (!result.rows[0]) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};