import pkg from "jsonwebtoken";

const { sign } = pkg;

export const users = [];

export class User {
  constructor({
    username,
    email,
    password,
    bio = "",
    image = "https://static.productionready.io/images/smiley-cyrus.jpg",
    followingUsers,
  }) {
    this.id = User.generateId();
    this.username = username.toLowerCase();
    this.email = email.toLowerCase();
    this.password = password;
    this.bio = bio;
    this.image = image;
    this.favouriteArticles = [];
    this.followingUsers = followingUsers ?? [];
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static create(userData) {
    const user = new User(userData);

    users.push(user);

    return user;
  }

  static findOne(query) {
    return users.find((user) =>
      Object.keys(query).every((key) => query[key].toLowerCase() === user[key])
    );
  }

  save() {
    const index = users.findIndex((user) => user.id === this.id);

    if (index !== -1) {
      users[index] = this;
      return this;
    }

    users.push(this);

    return this;
  }

  static generateId() {
    return users.length + 1;
  }

  generateAccessToken() {
    return sign(
      {
        user: {
          id: this.id,
          email: this.email,
          password: this.password,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
  }

  toUserResponse() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      bio: this.bio,
      image: this.image,
      token: this.generateAccessToken(),
      followingUsers: this.followingUsers,
    };
  }

  toProfileJSON(forUser) {
    return {
      username: this.username,
      bio: this.bio,
      image: this.image,
      following: forUser ? forUser.isFollowing(this.id) : false,
    };
  }

  isFollowing(id) {
    return this.followingUsers.includes(id);
  }

  follow(id) {
    if (!this.followingUsers.includes(id)) {
      this.followingUsers.push(id);
      this.save();
    }
  }

  unfollow(id) {
    const index = this.followingUsers.indexOf(id);

    if (index !== -1) {
      this.followingUsers.splice(index, 1);
      this.save();
    }
  }

  isFavourite(articleId) {
    return this.favouriteArticles.includes(articleId);
  }

  favorite(articleId) {
    if (!this.favouriteArticles.includes(articleId)) {
      this.favouriteArticles.push(articleId);
      this.save();
    }
  }

  unfavorite(articleId) {
    const index = this.favouriteArticles.indexOf(articleId);

    if (index !== -1) {
      this.favouriteArticles.splice(index, 1);
      this.save();
    }
  }

  static findById(id) {
    return users.find((user) => user.id === id);
  }
}

users.push(
  new User({
    username: "Luke",
    email: "luke@coderslab.pl",
    password: "$2a$10$4IhP5w.qtJsX1L.37IQ8PeBAniAVEvSz6ODYGS6wOoPom0CTc7yTK", // "secret" but hashed
    bio: "Jedi Master, Yoda's Apprentice",
    image: "https://api.realworld.io/images/demo-avatar.png",
  })
);
users.push(
  new User({
    username: "Leia",
    email: "leia@coderslab.pl",
    password: "$2a$10$4IhP5w.qtJsX1L.37IQ8PeBAniAVEvSz6ODYGS6wOoPom0CTc7yTK", // "secret" but hashed
    bio: "Princess Leia, the lover of the Wookies",
    image: "https://api.realworld.io/images/demo-avatar.png",
    followingUsers: [1],
  })
);
