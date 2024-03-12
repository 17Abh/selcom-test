import bcrypt from "bcryptjs";
import validator from "validator";

import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  userName: {
    type: String,
    default: "bookReader",
  },
  email: {
    type: String,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Must be a Valid email",
    },
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "is invalid"],
    index: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },

  createdAt: {
    type: Number,
    default: Date.now(),
  },
  updatedAt: {
    type: Number,
    default: Date.now(),
  },
});

// UserSchema.pre("save", async function (next) {
//   if (!this.password || !this.isModified("password")) return next;
//   const HASH = process.env.HASH || "";
//   //@ts-ignore
//   this.password = await bcrypt.hash(this.password, parseInt(HASH, 10));
//   next();
// });

UserSchema.methods.toJSON = function () {
  const user = this;

  const userObj = user.toObject();

  delete userObj.password;
  delete userObj.__v;
  return userObj;
};

UserSchema.statics.checkExistingField = async function (field, value) {
  const user = this;

  return user.findOne({ [`${field}`]: value });
};

/**
 * Function to find record from database using a particular query
 * @param query , Query to match record from database
 */
const findByQuery = async (query) => {
  return UserModel.findOne(query).lean();
};

/**
 *Function to save the validated details of the user
 * @param user, user validated details
 * @return updated user details after saving in database
 */
const saveRecord = async (user) => {
  const userInstance = new UserModel(user);
  console.log({ user, userInstance });
  await userInstance.save();
  await userInstance.toJSON();
  return userInstance;
};

const UserModel = model("user", UserSchema);

export { UserModel, saveRecord, findByQuery };
