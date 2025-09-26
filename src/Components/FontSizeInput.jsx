import React from "react";

export default function FontSizeInput({ fontSize, setFontSize }) {
  return (
    <input
      type="number"
      min="10"
      value={fontSize}
      onChange={(e) => setFontSize(+e.target.value)}
      placeholder="Font Size"
    />
  );
}
