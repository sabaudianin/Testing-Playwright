import { http, HttpResponse } from "msw";

export const dataHandlers = [
  http.get("https://example.com/data", () => {
    return HttpResponse.json({ name: "Config" });
  }),
];
