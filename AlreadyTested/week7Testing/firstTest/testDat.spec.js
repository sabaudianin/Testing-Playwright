// import { describe, expect, vi, test } from "vitest";
// import {
//   add,
//   data,
//   divide,
//   proccessNumber,
//   fetchUserData,
//   generateGreeting,
//   isEven,
// } from "./testDat";

// describe("Example function Data", () => {
//   test("toBe & toEqual matchers", () => {
//     expect(add(2, 3)).toBe(5);
//     expect(data.props).toEqual({
//       id: 1,
//       isActive: true,
//       tags: ["js", "testing"],
//     });
//   });
//   test("toBeTruthy toBeFalsy", () => {
//     // expect(data.props.isActive).toBe(true);
//     expect(data.props.isActive).toBeTruthy();
//     expect("").toBeFalsy();
//   });

//   test("toThrow & toThrowError matchers", () => {
//     expect(() => divide(1, 0)).toThrow();
//     expect(() => divide(1, 0)).toThrowError("Nie Dziel przez 0");
//   });

//   test("ToMatch", () => {
//     expect(generateGreeting("John")).toMatch(/Hello John/);
//   });

//   test.each([
//     [2, true],
//     [3, false],
//     [4, true],
//   ])("isEvent for %s returns  %s", (number, expected) => {
//     expect(isEven(number)).toBe(expected);
//   });

//   test("Process numbers with callback", () => {
//     const mockCallback = vi.fn();
//     proccessNumber(2, mockCallback);
//     expect(mockCallback).toHaveBeenCalledTimes(1);
//     expect(mockCallback).toHaveBeenCalledWith(4);
//   });
// });
