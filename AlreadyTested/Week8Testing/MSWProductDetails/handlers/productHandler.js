import { http } from "msw";

export const productHandlers = [
  // Każdy handler to wywołanie np. "http.get()", "http.post()", itd.
  http.get("https://www.example.com/api/products/:id", ({ params }) => {
    // "params" to obiekt zawierający :id z URL
    const { id } = params;

    // Tworzymy obiekt Response (natywny obiekt Web API)
    // https://developer.mozilla.org/en-US/docs/Web/API/Response
    if (id === "1") {
      return new Response(
        JSON.stringify({
          name: "iphone",
          price: 1000,
          quantity: 10,
          rating: 10,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
  }),
];
