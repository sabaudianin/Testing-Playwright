import { render, screen } from "@testing-library/react";
import { useState, useEffect } from "react";
import { MagicComponent } from "./MagicComponent";
import { describe, expect, test } from "vitest";

describe("<MagicComponent/> ", () => {
  test("render 'Hello Stranger' if no user provided", () => {
    render(<MagicComponent />);
    expect(screen.getByText("Hello, stranger")).toBeInTheDocument();
  });
  test("render username", () => {
    render(<MagicComponent user="Joe" />);
    expect(screen.getByText("Hello, Joe")).toBeInTheDocument();
  });

  test("async update after a delay ", async () => {
    render(<MagicComponent />);
    const delayedMsg = await screen.findByText(
      "Hello, JS Master!",
      {},
      { timeout: 1600 }
    );
    expect(delayedMsg).toBeInTheDocument();
  });

  test("initial deos not show 'Hello Js Master ", () => {
    render(<MagicComponent />);
    const delayMsg = screen.queryByText("Hello, Js Master!");
    expect(delayMsg).not.toBeInTheDocument();
  });
});

// describe("all In 1", () => {
//   test("validate All", async () => {
//     const { rerender } = render(<MagicComponent />);
//     expect(screen.getByText("Hello, stranger")).toBeInTheDocument();

//     rerender(<MagicComponent user="Joe" />);
//     expect(screen.getByText("Hello, Joe")).toBeInTheDocument();

//     rerender(<MagicComponent />);
//     const delayedMsg = await screen.findByText(
//       "Hello, JS Master!",
//       {},
//       { timeout: 1600 }
//     );
//     expect(delayedMsg).toBeInTheDocument();

//     rerender(<MagicComponent />);

//     const noDelayedMsg = screen.queryByText("Hello, Js Master!");
//     expect(noDelayedMsg).not.toBeInTheDocument();
//   });
// });

describe("<MagicComponent/>", () => {
  test("validate all scenarios in one test", async () => {
    // Renderowanie bez użytkownika - oczekiwany wynik: "Hello, stranger"
    const { rerender } = render(<MagicComponent />);
    expect(screen.getByText("Hello, stranger")).toBeInTheDocument();

    // Renderowanie z użytkownikiem "Joe" - oczekiwany wynik na początku
    rerender(<MagicComponent user="Joe" />);
    expect(screen.getByText("Hello, Joe")).toBeInTheDocument();

    // Oczekiwanie na zmianę na "Hello, JS Master!" (po 1,5 sekundy)
    const delayedMsg = await screen.findByText(
      "Hello, JS Master!",
      {},
      { timeout: 1600 }
    );
    expect(delayedMsg).toBeInTheDocument();

    // Sprawdzanie, że "Hello, JS Master!" nie pojawia się na początku
    rerender(<MagicComponent />);
    const noDelayedMsg = screen.queryByText("Hello, JS Master!");
    expect(noDelayedMsg).not.toBeInTheDocument();
  });
});
