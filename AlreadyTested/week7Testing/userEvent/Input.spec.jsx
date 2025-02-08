import { Input } from "./Input";
import { screen, render, fireEvent } from "@testing-library/react";

describe("<Input/>", () => {
  it("should dispaly formated value", async () => {
    render(<Input />);
    const inputEl = screen.getByRole("textbox");
    //wrong type,value should be string
    fireEvent.change(inputEl, { target: { value: 123 } });
    fireEvent.focusOut(inputEl);
    expect(await screen.findByText("$123")).toBeInTheDocument();
  });
  it("should not change", async () => {
    render(<Input isDisabled />);
    const inputEl = screen.getByRole("textbox");

    fireEvent.change(inputEl, { target: { value: 123 } });
    fireEvent.focusOut(inputEl);
    expect(await screen.queryByText("$123")).not.toBeInTheDocument();
  });
});
