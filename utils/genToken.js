import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export default createSecretToken;