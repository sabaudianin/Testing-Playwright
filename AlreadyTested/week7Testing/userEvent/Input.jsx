import { useState } from "react";

export const Input = ({ isDisabled }) => {
  const [value, setValue] = useState(0);
  const [formattedValue, setFormattedValue] = useState("$0");

  const handleFocus = () => setValue("");
  const handleChange = (e) => setValue(e.target.value);
  const handleBlur = () => setFormattedValue(`$${value}`);

  return (
    <div>
      <input
        disabled={isDisabled}
        onFocus={handleFocus}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
      />
      \<p>{formattedValue}</p>
    </div>
  );
};
