import { UserForm } from "./UserForm";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderUserForm } from "./renderUserForm";

describe("<UserForm/>", () => {
  test("Display data", async () => {
    renderUserForm(1);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(await screen.findByDisplayValue("John")).toBeInTheDocument();
    expect(screen.getByDisplayValue("john@doe.com")).toBeInTheDocument();
  });

  test("validationForm", async () => {
    const user = userEvent.setup();
    renderUserForm(1);
    await userEvent.clear(await screen.findByLabelText("First Name"));
    await userEvent.clear(await screen.findByLabelText("Last Name"));
    await userEvent.clear(await screen.findByLabelText("Email"));
    const btn = screen.getByRole("button");
    await userEvent.click(btn);
    expect(
      await screen.findByText("First name is required")
    ).toBeInTheDocument();
    expect(screen.getByText("Last name is required")).toBeInTheDocument();
    expect(screen.getByText("Email is invalid")).toBeInTheDocument();
  });

  test("Sumbit Form", async () => {
    const user = userEvent.setup();
    renderUserForm(1);
    await userEvent.clear(await screen.findByLabelText("First Name"));
    await userEvent.clear(await screen.findByLabelText("Last Name"));
    await userEvent.clear(await screen.findByLabelText("Email"));
    await userEvent.type(await screen.findByLabelText("First Name"), "Jane");
    await userEvent.type(await screen.findByLabelText("Last Name"), "Mary");
    await userEvent.type(
      await screen.findByLabelText("Email"),
      "mary@jane.com"
    );

    const btn = await screen.findByRole("button");
    await user.click(btn);
    screen.debug();
    expect(
      await screen.findByText("User has been updated")
    ).toBeInTheDocument();
  });
});
