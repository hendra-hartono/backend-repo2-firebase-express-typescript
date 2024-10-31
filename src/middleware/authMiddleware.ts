import { Request, Response, NextFunction } from "express";
const { auth } = require("../services/firebase");

export interface IAuthTokenRequest extends Request {
  authToken?: string;
  authId?: string;
}

export const verifyToken = async (
  req: IAuthTokenRequest,
  res: Response,
  next: NextFunction
) => {
  const idToken = req.cookies.access_token;
  if (!idToken) {
    res.status(401).send({ message: "Unauthorized: No token provided" });
  } else {
    try {
      const decodedToken = await auth.verifyIdToken(idToken);
      req.authId = decodedToken;
      next();
    } catch (error) {
      console.error("Error verifying token:", error);
      res.status(401).send({ message: "Unauthorized: Invalid token" });
    }
  }
};
