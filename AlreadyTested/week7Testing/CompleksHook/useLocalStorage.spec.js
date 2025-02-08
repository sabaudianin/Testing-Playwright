import { act, renderHook } from "@testing-library/react";
import useLocalStorage from "./useLocalStorage.js";

describe("useLocalStorage", () => {
  test("default initial value ", () => {
    const { result } = renderHook(() =>
      useLocalStorage("testKey", "testInitialValue")
    );
    expect(result.current[0]).toBe("testInitialValue");
  });

  test("Initail Value from localStorage", () => {
    localStorage.setItem("key", JSON.stringify("localValue"));
    const { result } = renderHook(() =>
      useLocalStorage("key", "testInitialValue")
    );
    expect(result.current[0]).toBe("localValue");
  });
  test("Update Value from localStorage", () => {
    const { result } = renderHook(() =>
      useLocalStorage("key", "testInitialValue")
    );
    const [, setValue] = result.current;
    act(() => {
      result.current[1]("UpdatedValue");
    });
    expect(result.current[0]).toBe("UpdatedValue");
    expect(localStorage.getItem("key")).toBe(JSON.stringify("UpdatedValue"));
  });

  test("should update the value when localStorage changes", () => {
    const { result } = renderHook(() => useLocalStorage("key", "initialValue"));

    act(() => {
      localStorage.setItem("key", JSON.stringify("externalValue"));
      window.dispatchEvent(new Event("storage"));
    });

    expect(result.current[0]).toBe("externalValue");
  });
});
