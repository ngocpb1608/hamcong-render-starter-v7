import jwt from 'jsonwebtoken'; import type { Request, Response, NextFunction } from 'express';
export function requireAuth(req: Request & { user?: any }, res: Response, next: NextFunction) {
  const h = req.headers.authorization || ''; const token = h.startsWith('Bearer ')? h.slice(7):'';
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try { const payload = jwt.verify(token, process.env.JWT_SECRET!); (req as any).user = payload; return next(); }
  catch { return res.status(401).json({ error: 'Invalid token' }); }
}