import { Request, Response, NextFunction } from 'express';

export function authorizeRoles(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user || !user['cognito:groups']) {
      return res.status(403).json({ error: 'No roles found.' });
    }

    const userRoles = user['cognito:groups'];
    const hasAccess = allowedRoles.some(role => userRoles.includes(role));

    if (!hasAccess) {
      return res.status(403).json({ error: 'Insufficient permissions.' });
    }

    next();
  };
}