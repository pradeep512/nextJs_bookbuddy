import jwt from "jsonwebtoken";

export const verifyJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded;
  } catch (err) {
    return null;
  }
};
