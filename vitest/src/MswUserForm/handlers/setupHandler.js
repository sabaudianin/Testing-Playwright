import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://www.example.com/api/users/:id", ({ params }) => {
    const { id } = params;
    console.log('Fetching user with ID "%s"', id);

    if (id === "1") {
      return HttpResponse.json({
        firstName: "John",
        lastName: "Doe",
        email: "john@doe.com",
      });
    }
    return HttpResponse.error();
  }),
  http.put("https://www.example.com/api/users", async ({ request }) => {
    const updatedUser = await request.json();
    console.log("Updating user:", updatedUser);

    return HttpResponse.json(
      { message: "User updated successfully" },
      { status: 200 }
    );
  }),
];
