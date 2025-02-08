import { Button } from "./Button";
import { screen, render, fireEvent } from "@testing-library/react";

describe("<Button/>", () => {
  test("display message after click", async () => {
    render(<Button />);
    const buttonEl = screen.getByRole("button");

    fireEvent.click(buttonEl);
    expect(await screen.findByText("Button clicked")).toBeInTheDocument();
  });
});
