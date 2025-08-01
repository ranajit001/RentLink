import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
configDotenv();
const JWT_SECRET = process.env.JWT_SECRET ;


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


export const isTenant = (req, res, next) => {  //console.log('is tenante');
                if (req.user.role !== 'tenant') return res.status(403).json({ message: 'Access denied' });
                
            next();
};

export const isLandlord = (req, res, next) => {     //console.log('islandlord');

            if (req.user.role !== 'landlord') return res.status(403).json({ message: 'Access denied' });
             next();
};
