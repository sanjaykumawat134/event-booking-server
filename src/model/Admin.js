const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const adminSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.default.isEmail(value)) {
          throw new Error("enter a valid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("password cannot contain string password");
        }
      },
    },

    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
// generate token
adminSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString(), role: "ADMIN" },
    process.env.JWT_SECRET
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

//find user by its credientials
adminSchema.statics.findUserByCredientials = async function (email, password) {
  const user = await Admin.findOne({ email });
  if (!user) {
    throw new Error("unable to login ...!");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("unable to login...!");
  }
  return user;
};

//remove unwanted information from user object
adminSchema.methods.toJSON = function () {
  const user = this;
  const userobj = user.toObject();
  delete userobj.password;
  delete userobj.tokens;
  return userobj;
};

adminSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
