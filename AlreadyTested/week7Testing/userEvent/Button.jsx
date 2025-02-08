import { useState } from "react";

export const Button = () => {
  const [message, setMessage] = useState("");
  const handleClick = () => {
    setTimeout(() => {
      setMessage("Button clicked");
    }, 50);
  };

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      {message ? <p>{message}</p> : null}
    </div>
  );
};
