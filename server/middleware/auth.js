import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
  try {
    // First check session
    if (req.session.userId) {
      req.userId = req.session.userId;
      return next();
    }

    // If no session, check token
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const token = authHeader.replace('Bearer ', '');
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
}; 