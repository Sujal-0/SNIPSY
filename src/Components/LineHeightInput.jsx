import React from "react";

export default function LineHeightInput({ lineHeight, setLineHeight }) {
  return (
    <input
      type="number"
      min="10"
      value={lineHeight}
      onChange={(e) => setLineHeight(+e.target.value)}
      placeholder="Line Height"
    />
  );
}
