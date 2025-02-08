import userEvent from "@testing-library/user-event";
import { screen, render } from "@testing-library/react";
import { ContactForm } from "./ContactForm";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("<ContactForm/>", () => {
  test("Render Component", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText("Name:")).toBeInTheDocument();
    expect(screen.getByLabelText("Message:")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  test("Sending data form", async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn().mockName("handleSubmit");
    render(<ContactForm onSubmit={mockSubmit} />);
    const inputMsg = screen.getByLabelText("Message:");
    const inputName = screen.getByLabelText("Name:");
    await user.type(inputName, "Jan");
    await user.type(inputMsg, "Tekst");
    await user.click(screen.getByRole("button", { name: /send/i }));
    expect(mockSubmit).toHaveBeenCalledWith({
      name: "Jan",
      message: "Tekst",
    });
  });
  test("Validation", async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn().mockName("handleSubmit");
    render(<ContactForm onSubmit={mockSubmit} />);
    await user.click(screen.getByRole("button", { name: /send/i }));
    expect(mockSubmit).not.toHaveBeenCalled();
  });
});
