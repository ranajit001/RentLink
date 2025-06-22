import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
configDotenv();
const JWT_SECRET = process.env.JWT_SECRET ;

// ✅ Verify Token
export const protect = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth)
    return res.status(401).json({ message: 'Unauthorized' });

  const token = auth.split(' ')[1]; 
  

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// 🎭 Role checkers
export const isTenant = (req, res, next) => {
                if (req.user.role !== 'tenant') return res.status(403).json({ message: 'Access denied' });
            next();
};

export const isLandlord = (req, res, next) => {
            if (req.user.role !== 'landlord') return res.status(403).json({ message: 'Access denied' });
             next();
};
