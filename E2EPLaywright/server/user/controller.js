import { User } from "./model.js";
import { hash, compare } from "bcrypt";

export async function registerUser(req, res) {
  const { user } = req.body;

  if (User.findOne({ email: req.body.user.email })) {
    return res.status(409).json({ message: "User already exists" });
  }

  if (!user || !user.email || !user.username || !user.password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const hashedPwd = await hash(user.password, 10);
  const userObject = {
    username: user.username,
    password: hashedPwd,
    email: user.email,
  };

  const createdUser = User.create(userObject);

  if (createdUser) {
    return res.status(201).json({
      user: createdUser.toUserResponse(),
    });
  }

  return res.status(422).json({
    errors: {
      body: "Unable to register a user",
    },
  });
}

export function getCurrentUser(req, res) {
  const email = req.userEmail;
  const user = User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }

  return res.status(200).json({
    user: user.toUserResponse(),
  });
}

export async function userLogin(req, res) {
  const { user } = req.body;

  if (!user || !user.email || !user.password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const loginUser = User.findOne({ email: user.email });

  if (!loginUser) {
    return res.status(404).json({ message: "User Not Found" });
  }

  const match = await compare(user.password, loginUser.password);

  if (!match) {
    return res.status(401).json({ message: "Unauthorized: Wrong password" });
  }

  return res.status(200).json({
    user: loginUser.toUserResponse(),
  });
}

export async function updateUser(req, res) {
  const { user } = req.body;

  if (!user) {
    return res.status(400).json({ message: "Required a User object" });
  }

  const email = req.userEmail;
  const target = User.findOne({ email });

  if (user.email) {
    target.email = user.email;
  }

  if (user.username) {
    target.username = user.username;
  }

  if (user.password) {
    const hashedPwd = await hash(user.password, 10);

    target.password = hashedPwd;
  }

  if (typeof user.image !== "undefined") {
    target.image = user.image;
  }

  if (typeof user.bio !== "undefined") {
    target.bio = user.bio;
  }

  await target.save();

  return res.status(200).json({
    user: target.toUserResponse(),
  });
}
