import { testFunction } from "./testFunction";

describe("testing msw", () => {
  it("should return data from MSW", async () => {
    expect(await testFunction()).toEqual({ name: "Config" });
  });
});
