import { expect, test as base } from "@playwright/test";

import { Article } from "../../PageObjectModel/PagObjMod_Base/ClassArticle";
import { injectArticlePage } from "../../PageObjectModel/PagObjMod_Base/ClassArticle";

const test = base.extend({ articlePage: injectArticlePage });

test.describe("Article class ", async () => {
  await articlePage.fillArticleTitle("Tytuł");
  await articlePage.fillArticleSummary("Podsumowanie");
  await articlePage.fillArticleContent("Opis");
  await articlePage.addTags(["#testyE2E"]);
  await articlePage.clickPublish();
});
