import { Request, Response } from "express";
const {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} = require("../services/firebase");

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);
    res.send({
      message: "User created successfully",
      data: null,
    });
  } catch (error) {
    // console.error("error", error);
    return res.status(500).send({
      message: "An error occurred while registering user",
      data: null,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const idToken = userCredential._tokenResponse.idToken;
    if (idToken) {
      res.cookie("access_token", idToken, {
        // httpOnly: true
      });
      res.send({
        message: "User logged in successfully",
        data: null,
        // data: userCredential,
      });
    } else {
      return res.status(500).send({
        message: "An error occurred while logging in",
        data: null,
      });
    }
  } catch (error) {
    // console.error("error", error);
    return res.status(500).send({
      message: "An error occurred while logging in",
      data: null,
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const auth = getAuth();
    await signOut(auth);
    res.clearCookie("access_token");
    res.send({
      message: "User logged out successfully",
      data: null,
      // data: userCredential,
    });
  } catch (error) {
    // console.error("error", error);
    return res.status(500).send({
      message: "Internal Server Error",
      data: null,
    });
  }
};
