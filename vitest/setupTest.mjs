import "@testing-library/jest-dom/vitest";
import { server } from "./src/MswUserForm/__mocks__/server";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
