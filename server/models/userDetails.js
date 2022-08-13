import mongoose from "mongoose";

const UserDetailsScehma = new mongoose.Schema(
  {
    fname: {
      type:String,
      required:true
    },
    lname: {
      type:String,
      required:true
    },
    email: { 
      type: String, 
      unique: true },
    password: {
      type:String,
      required:true
    },
  },
  {
    collection: "UserInfo",
  }
);

export const UserDetail = mongoose.model("UserInfo", UserDetailsScehma);