import { useState, useEffect } from "react";

export const MagicComponent = ({ user }) => {
  const [name, setName] = useState(user);

  useEffect(() => {
    const timer = setTimeout(() => {
      setName("JS Master!");
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return <div>{`Hello, ${name ?? "stranger"}`}</div>;
};
