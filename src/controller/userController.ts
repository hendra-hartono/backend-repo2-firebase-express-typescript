import { Request, Response } from "express";
import User from "../model/userModel";
const { db } = require("../services/firebase");

export const fetchUsers = async (req: Request, res: Response) => {
  try {
    const response = await db.collection("USERS").get();
    const data = response.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    res.send({
      message: "Fetched users",
      data,
    });
  } catch (error) {
    // console.error("error", error);
    return res.status(400).send({
      message: "Failed to fetch users",
      data: null,
    });
  }
};

export const fetchUser = async (req: Request, res: Response) => {
  try {
    const response = await db.collection("USERS").doc(req.params.id).get();
    const data = response.data();

    if (!data)
      return res.send({
        message: "User was not found.",
        data: null,
      });

    data.id = response.id;
    res.send({
      message: "Fetched user",
      data,
    });
  } catch (error) {
    // console.error("error", error);
    return res.status(400).send({
      message: "Failed to fetch user",
      data: null,
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const payload = {
      name: req.body.name,
      email: req.body.email,
      mobilePhone: req.body.mobilePhone,
    };

    /* 
    const newUser = new User(
      req.body.name,
      req.body.email,
      req.body.mobilePhone
    );
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.mobilePhone = req.body.mobilePhone; 
    */

    const response = await db.collection("USERS").add(payload);

    res.send({
      message: "User created successfully",
      // data: response,
      data: payload,
    });
  } catch (error) {
    console.error("error", error);
    return res.status(400).send({
      message: "Failed to create user",
      data: null,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, email, mobilePhone } = req.body;
    const check = await db.collection("USERS").doc(req.params.id).get();
    const exists = check.data();

    if (!exists)
      return res.send({
        message: "User was not found.",
        data: null,
      });

    const payload = { name, email, mobilePhone };
    const response = await db
      .collection("USERS")
      .doc(req.params.id)
      .update(payload);

    res.send({
      message: "User updated successfully",
      // data: response,
      data: payload,
    });
  } catch (error) {
    // console.error("error", error);
    return res.status(400).send({
      message: "Failed to update user",
      data: null,
    });
  }
};
