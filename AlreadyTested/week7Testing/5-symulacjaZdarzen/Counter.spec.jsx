import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Counter } from "./COunter";

describe("<Counter/>", () => {
  const user = userEvent.setup();
  test("Counter Initaial Value", () => {
    render(<Counter />);
    const count = screen.getByTestId("counter");
    expect(count).toHaveTextContent("0");
  });
  test("Component with props", () => {
    render(<Counter initialValue={5} />);
    const count = screen.getByTestId("counter");
    expect(count).toHaveTextContent("5");
  });
  test("Component with props > Max", () => {
    render(<Counter initialValue={15} />);
    const count = screen.getByTestId("counter");
    expect(count).toHaveTextContent("10");
  });
  test("Component with props < Min", () => {
    render(<Counter initialValue={-10} />);
    const count = screen.getByTestId("counter");
    expect(count).toHaveTextContent("0");
  });
  test("Component After Click +1", async () => {
    render(<Counter initialValue={9} />);
    const count = screen.getByTestId("counter");
    const btn = screen.getByText("+");
    await userEvent.click(btn);
    expect(count).toHaveTextContent("10");
  });
  test("Component After Click -1", async () => {
    render(<Counter initialValue={1} />);
    const count = screen.getByTestId("counter");
    const btn = screen.getByText("-");
    await userEvent.click(btn);
    expect(count).toHaveTextContent("0");
  });
  test("Reset", async () => {
    render(<Counter initialValue={1} />);
    const count = screen.getByTestId("counter");
    const resetBtn = screen.getByRole("button", { name: "Reset" });
    await userEvent.click(resetBtn);
    expect(count).toHaveTextContent("0");
  });
  test("Edge condition MAx", async () => {
    render(<Counter initialValue={10} />);
    const count = screen.getByTestId("counter");
    const btn = screen.getByRole("button", { name: "+" });
    expect(btn).toBeDisabled();
    await userEvent.click(btn);
    expect(count).toHaveTextContent("10");
  });
  test("Edge condition Min", async () => {
    render(<Counter initialValue={0} />);
    const count = screen.getByTestId("counter");
    const btn = screen.getByRole("button", { name: "-" });
    expect(btn).toBeDisabled();
    await userEvent.click(btn);
    expect(count).toHaveTextContent("0");
  });
});
