import { ToggleContent } from "./ToggleContent";
import { screen, render, getByText } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("test <ToggleContent/>", () => {
  test("content is hide after render", () => {
    render(<ToggleContent />);
    expect(screen.getByText("Content is hidden")).toBeInTheDocument();
  });
  test("show content", async () => {
    render(<ToggleContent />);
    const btn = screen.getByText("Toggle");
    await userEvent.click(btn);
    expect(await screen.findByText("Content is visible")).toBeInTheDocument();
  });
});
