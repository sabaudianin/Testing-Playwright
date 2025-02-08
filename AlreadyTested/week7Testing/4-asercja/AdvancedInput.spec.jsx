import { AdvancedInput } from "./AdvancedInput";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("<AdvancedInput/>", () => {
  test("rendering componet", () => {
    render(<AdvancedInput isVisible />);
    const inputEl = screen.getByRole("textbox");
    expect(inputEl).toBeInTheDocument();
  });

  test("not rendering componet", () => {
    render(<AdvancedInput isVisible={false} />);
    const inputEl = screen.queryByRole("textbox");
    expect(inputEl).not.toBeInTheDocument();
  });

  test("classTest", () => {
    render(
      <AdvancedInput
        isVisible
        className={"light"}
      />
    );
    const inputEl = screen.queryByRole("textbox");
    expect(inputEl).toHaveClass("light");
  });

  test("Value test", async () => {
    render(<AdvancedInput isVisible />);
    const inputEl = screen.getByRole("textbox");
    await userEvent.type(inputEl, "John");
    expect(inputEl).toHaveValue("John");
  });

  test("componet is on/off", () => {
    render(
      <AdvancedInput
        isVisible
        isDisabled
      />
    );
    const inputEl = screen.getByRole("textbox");
    expect(inputEl).toBeDisabled();
  });
});
