import {
  findByText,
  getByText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegistrationForm } from "./RegistartionForm";

describe("<RegistrationForm/>", () => {
  const user = userEvent.setup();
  test("render form", () => {
    render(<RegistrationForm />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByLabelText("Email:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
  });
  test("send without email", async () => {
    render(<RegistrationForm />);
    const btn = screen.getByRole("button");
    await user.click(btn);
    expect(await screen.getByText("Email is required.")).toBeInTheDocument;
  });
  test("send without email", async () => {
    render(<RegistrationForm />);
    const inputEmail = screen.getByLabelText("Email:");
    await user.type(inputEmail, "email#wp.pl");
    const btn = screen.getByRole("button");
    await user.click(btn);
    expect(await screen.getByText("Provided email address is invalid."))
      .toBeInTheDocument;
  });
  test("send without password", async () => {
    render(<RegistrationForm />);
    const inputEmail = screen.getByLabelText("Email:");
    await user.type(inputEmail, "email@wp.pl");
    const btn = screen.getByRole("button");
    await user.click(btn);
    expect(await screen.getByText("Password is required.")).toBeInTheDocument;
  });
  test("send too short password", async () => {
    render(<RegistrationForm />);
    const inputEmail = screen.getByLabelText("Email:");
    const inputPassword = screen.getByLabelText("Password:");
    await user.type(inputEmail, "email@wp.pl");
    await user.type(inputPassword, "tyhu");
    const btn = screen.getByRole("button");
    await user.click(btn);
    expect(
      await screen.getByText("Password must be at least 8 characters long.")
    ).toBeInTheDocument;
  });
  test("send too short password", async () => {
    render(<RegistrationForm />);
    const inputEmail = screen.getByLabelText("Email:");
    const inputPassword = screen.getByLabelText("Password:");
    await user.type(inputEmail, "email@wp.pl");
    await user.type(inputPassword, "tyhukujeden");
    const btn = screen.getByRole("button");
    await user.click(btn);
    await waitFor(() => {
      expect(screen.queryByText("Email is required.")).not.toBeInTheDocument();
      expect(
        screen.queryByText("Password is required.")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Password must be at least 8 characters long.")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Provided email address is invalid.")
      ).not.toBeInTheDocument();
    });
  });
});
