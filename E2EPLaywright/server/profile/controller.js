import { User } from "../user/model.js";

export function getProfile(req, res) {
  const { username } = req.params;
  const loggedin = req.loggedin;
  const user = User.findOne({ username });

  if (!user) {
    return res.status(404).json({
      message: "User Not Found",
    });
  }

  if (!loggedin) {
    return res.status(200).json({
      profile: user.toProfileJSON(false),
    });
  }

  const loginUser = User.findOne({ email: req.userEmail });

  return res.status(200).json({
    profile: user.toProfileJSON(loginUser),
  });
}

export function followUser(req, res) {
  const { username } = req.params;
  const loginUser = User.findOne({ email: req.userEmail });
  const user = User.findOne({ username });

  if (!user || !loginUser) {
    return res.status(404).json({
      message: "User Not Found",
    });
  }

  loginUser.follow(user.id);

  return res.status(200).json({
    profile: user.toProfileJSON(loginUser),
  });
}

export function unFollowUser(req, res) {
  const { username } = req.params;
  const loginUser = User.findOne({ email: req.userEmail });
  const user = User.findOne({ username });

  if (!user || !loginUser) {
    return res.status(404).json({
      message: "User Not Found",
    });
  }

  loginUser.unfollow(user.id);

  return res.status(200).json({
    profile: user.toProfileJSON(loginUser),
  });
}
