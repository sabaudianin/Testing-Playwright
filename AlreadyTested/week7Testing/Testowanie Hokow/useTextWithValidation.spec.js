import { renderHook, act } from "@testing-library/react";
import { useTextWithValidation } from "./useTextWithValidation";
import { use } from "react";

describe("hook useTextWithValidation", () => {
  test("render with initial Value", () => {
    const { result } = renderHook(useTextWithValidation);
    expect(result.current.text).toBe("");
    expect(result.current.isValid).toBeFalsy();
  });
  test("render with custom Value in scope", () => {
    const { result } = renderHook(useTextWithValidation);
    act(() => {
      result.current.handleChange("Test Text");
    });
    expect(result.current.text).toBe("Test Text");
    expect(result.current.isValid).toBeTruthy();
  });
  test("text lest than minimum", () => {
    const { result } = renderHook(useTextWithValidation);
    act(() => {
      result.current.handleChange("ra");
    });
    expect(result.current.isValid).toBeFalsy();
  });
  test("text longer than minimum", () => {
    const { result } = renderHook(useTextWithValidation);
    act(() => {
      result.current.handleChange("Test very long text above maximum");
    });
    expect(result.current.isValid).toBeFalsy();

    expect(result.current.text).toBe("Test very long text above maximum");
  });
});
