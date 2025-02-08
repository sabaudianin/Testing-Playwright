import "@testing-library/jest-dom/vitest";
import { server } from "./src/__mocks__/server";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
