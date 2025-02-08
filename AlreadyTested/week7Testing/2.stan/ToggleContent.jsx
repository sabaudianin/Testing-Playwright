import { useState } from "react";

export function ToggleContent() {
  const [isToggled, setIsToggled] = useState(false);
  const contentVisibility = isToggled ? "visible" : "hidden";

  const toggleContent = () => setIsToggled((prev) => !prev);

  return (
    <div>
      <button onClick={toggleContent}>Toggle</button>
      <p>Content is {contentVisibility}</p>
    </div>
  );
}
