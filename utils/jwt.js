import { sign, verify } from 'jsonwebtoken';

export function createToken(payload) {
  return sign(payload, process.env.JWT_SECRET);
}

export async function verifyToken(token) {
  try {
    var decoded = verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    throw err;
  }
}
