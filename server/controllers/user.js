import { UserDetail } from "../models/userDetails.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const JWT_SECRET = 
"hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";



export const createUser = async (req, res) => {
  const { fname, lname, email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password,10);
  try {
    const oldUser = await UserDetail.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await UserDetail.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
};

export const userLogin = async (req, res) => {
   
  const { email, password } = req.body;

  const user = await UserDetail.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);

    if (res.status(201)) {
      console.log('this is token of user'+ token);
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
};

export const userData = async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    
    console.log(user.email);
    res.send({ status: "ok", data: user.email });
    
  } catch (error) {}
};