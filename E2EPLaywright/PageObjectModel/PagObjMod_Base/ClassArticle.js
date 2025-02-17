import { Common } from "../CommonPage.mjs";

export const injectArticlePage = async ({ page }, use) =>
  await use(new Article(page));

export class Article extends Common {
  constructor(page) {
    super(page);
  }
  async fillArticleTitle(title) {
    await this.fillInput("title", title);
  }
  async fillArticleSummary(summary) {
    await this.fillInput("description", summary);
  }
  async fillArticleContent(content) {
    await this.page.locator.fill("input[name=content]", content);
  }

  async addTags(tags) {
    const locator = this.page.locator("input[placeholder='Enter tags']");

    for (const tag of tags) {
      await locator.fill(tag);
      await locator.press("Enter");
    }
  }

  async clickPublisk() {
    await this.page.locator("button", { name: "Publish Article" }).click();
  }
}
