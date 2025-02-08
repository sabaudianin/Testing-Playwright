import { renderProduct } from "./renderProduct";
import { screen } from "@testing-library/react";

describe("<ProductDetails/>", () => {
  test("display data", async () => {
    renderProduct(1);
    expect(screen.getByText("Loading product details...")).toBeInTheDocument();
    expect(await screen.findByText("iphone")).toBeInTheDocument();
    expect(screen.getByText("Price: 1000 EUR")).toBeInTheDocument();
    expect(screen.getByText("Rating: 10/10")).toBeInTheDocument();
  });
  test("error", async () => {
    renderProduct(2);
    expect(screen.getByText("Loading product details...")).toBeInTheDocument();
    expect(
      await screen.findByText("Could not load product details.")
    ).toBeInTheDocument();
  });
});
