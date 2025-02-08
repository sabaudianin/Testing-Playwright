const tags = [];

export class Tag {
  constructor(tagName) {
    this.id = Tag.generateId();
    this.tagName = tagName;
    this.articles = [];
  }

  static generateId() {
    return tags.length + 1;
  }

  static async create({ tagName }) {
    let tag = tags.find((t) => t.tagName === tagName);

    if (!tag) {
      tag = new Tag(tagName);
      tags.push(tag);
    }

    return tag;
  }

  static async find() {
    return tags;
  }

  static async distinct(field) {
    const allTags = tags.map((tag) => tag[field]).flat();

    return [...new Set(allTags)];
  }

  addArticle(articleId) {
    if (!this.articles.includes(articleId)) {
      this.articles.push(articleId);
    }
  }
}
