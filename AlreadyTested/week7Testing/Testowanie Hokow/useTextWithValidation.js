import { useState } from "react";

export function useTextWithValidation(minLength = 3, maxLength = 20) {
  const [text, setText] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleChange = (newText) => {
    const isValid = newText.length >= minLength && newText.length <= maxLength;

    setIsValid(isValid);
    setText(newText);
  };

  return { text, isValid, handleChange };
}
