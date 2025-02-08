import {
  findByText,
  getByText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserProfile } from "./UserProfile";

describe("UserProfile/>", () => {
  test("displays loading state initially", async () => {
    render(<UserProfile userId={100} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
  test("John Doe", async () => {
    render(<UserProfile userId={100} />);
    expect(await screen.findByText("John Doe")).toBeInTheDocument();
  });
  test("Not Found", async () => {
    render(<UserProfile userId={2} />);
    expect(await screen.findByText("User not found.")).toBeInTheDocument();
  });
  test("Ups", async () => {
    render(<UserProfile userId={1} />);
    expect(
      await screen.findByText("Oops, something went wrong.")
    ).toBeInTheDocument();
  });
  test("Toast cloase after 200ms", async () => {
    render(<UserProfile userId={2} />);
    // expect(await screen.queryByText("User not found.")).not.toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByText("User not found.")).not.toBeInTheDocument()
    );
  });
});
