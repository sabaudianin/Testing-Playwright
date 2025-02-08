import { UserStatus } from "./UserStatus";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("<UserStatus/>", () => {
  const userId = "user1";
  const userData = { name: "John Doe", active: true };
  afterEach(() => {
    localStorage.clear();
  });
  test("loading and show data ", () => {
    localStorage.setItem(`user-${userId}`, JSON.stringify(userData));
    render(<UserStatus userId={userId} />);
    expect(screen.getByText(userData.name)).toBeInTheDocument();
  });

  test("click", async () => {
    localStorage.setItem(`user-${userId}`, JSON.stringify(userData));
    render(<UserStatus userId={userId} />);
    const btnInactive = screen.getByText("Set Inactive");
    await userEvent.click(btnInactive);
    expect(localStorage.getItem(`user-${userId}`)).toContain('"active":false');
  });

  test("Unmount", () => {
    localStorage.setItem(`user-${userId}`, JSON.stringify(userData));
    const { unmount } = render(<UserStatus userId={userId} />);
    unmount();
    expect(localStorage.getItem(`user-${userId}`)).toBeNull();
  });
});
