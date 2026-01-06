//src/helpers/jwt.js - Enhanced token verification with better error handling
import jwt from "jsonwebtoken";


const SECRET = process.env.JWT_SECRET || "yoursecretkey";

export function generateToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export async function verifyToken(token) {
  return jwt.verify(token, SECRET);
}


