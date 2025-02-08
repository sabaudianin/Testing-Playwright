import { users } from "../user/model.js";

export class Article {
  constructor({ title, description, body, tagList = [], author, comments }) {
    this.id = Article.generateId();
    this.slug = Article.slugify(title);
    this.title = title;
    this.description = description;
    this.body = body;
    this.tagList = tagList;
    this.author = author;
    this.favouritesCount = 0;
    this.comments = comments || [];
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static create(articleData) {
    const article = new Article(articleData);

    articles.push(article);

    return article;
  }

  static findOne({ slug }) {
    return articles.find((article) => article.slug === slug);
  }

  static deleteOne({ slug }) {
    const index = articles.findIndex((article) => article.slug === slug);

    if (index !== -1) {
      articles.splice(index, 1);
    }
  }

  save() {
    this;
  }

  updateFavoriteCount(type) {
    if (type === "add") {
      this.favouritesCount++;
    } else {
      this.favouritesCount--;
    }

    return this;
  }

  toArticleResponse(user) {
    return {
      id: this.id,
      slug: this.slug,
      title: this.title,
      description: this.description,
      body: this.body,
      tagList: this.tagList,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      favorited: user ? user.isFavourite(this.id) : false,
      favoritesCount: this.favouritesCount,
      author: this.author,
    };
  }

  static slugify(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-*|-*$/g, "");
  }

  static generateId() {
    return articles.length + 1;
  }

  static distinct() {
    const allTags = articles.flatMap((article) => article.tagList ?? []);

    return [...new Set(allTags)];
  }

  static getUniqueTags() {
    const allTags = articles.flatMap((article) => article.tagList);

    return [...new Set(allTags)];
  }

  addComment(id) {
    this.comments.push(id);
  }

  removeComment(id) {
    this.comments = this.comments.filter((commentId) => commentId !== id);
  }
}

export const articles = [];
articles.push(
  new Article({
    title: "The Mastery of Lightsaber Combat: Insights from Luke Skywalker",
    description:
      "Explore the artistry of lightsaber combat through the eyes of Luke Skywalker.",
    body: "In a galaxy far, far away, the lightsaber has long been synonymous with the noble art of combat. Luke Skywalker, a Jedi Master renowned for his prowess with the lightsaber, shares his insights on mastering this iconic weapon. With graceful movements and focused determination, Skywalker demonstrates the finesse required to wield a lightsaber effectively.",
    tagList: ["#lightsaberCombat", "#jediTraining"],
    author: users[0],
    comments: [1],
  })
);
articles.push(
  new Article({
    title: "Unveiling the Enigma of Wookie Culture: Leia Organa's Perspective",
    description:
      "Delve into the rich tapestry of Wookie culture from the eyes of Leia Organa.",
    body: "As the galaxy's diversity stretches far and wide, few species captivate the imagination quite like the Wookiees. In this insightful piece, Leia Organa, distinguished diplomat and rebel leader, shares her observations on the enigmatic Wookiee culture. From their towering presence to their unwavering loyalty, Organa sheds light on the intricacies of Wookiee society, offering a glimpse into their traditions, values, and deep-rooted sense of honor.",
    tagList: ["#wookieeCulture", "#galacticDiplomacy"],
    author: users[1],
  })
);
