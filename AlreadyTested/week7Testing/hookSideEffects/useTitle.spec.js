import { act, renderHook } from "@testing-library/react";
import { useDocumentTitle } from "./useTitle";

describe("useDocumentTile", () => {
  test("default title", () => {
    renderHook(() => {
      useDocumentTitle("The Title");
    });
    expect(document.title).toBe("The Title");
  });
  test("Change Title", () => {
    const { rerender } = renderHook(({ title }) => useDocumentTitle(title), {
      initialProps: { title: "The Title" },
    });

    rerender({ title: "The Title 2" });
    expect(document.title).toBe("The Title 2");
  });
  test("cleanup Function", () => {
    const { unmount } = renderHook(() => useDocumentTitle("the title"));
    unmount();
    expect(document.title).toBe("Cleanup title");
  });
});
