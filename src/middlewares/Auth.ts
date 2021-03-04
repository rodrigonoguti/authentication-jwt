import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const Auth = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({
      error: 'No token provided'
    })
  }

  const parts = header.split(' ');

  if (!(parts.length === 2)) {
    return res.status(401).json({
      error: 'Token error'
    })
  }

  const [bearer, token] = parts;

  if (!/^Bearer$/i.test) {
    return res.status(401).json({
      error: 'Malformatted token'
    })
  }

  jwt.verify(token, process.env.JWT_PUBLIC_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error: 'Invalid token'
      })
    }

    return next();
  });
}

export { Auth };