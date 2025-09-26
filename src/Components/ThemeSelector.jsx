import React from "react";

export default function ThemeSelector({ theme, setTheme }) {
  return (
    <select onChange={(e) => setTheme(e.target.value)} value={theme}>
      <option value="vs-dark">Dark</option>
      <option value="light">Light</option>
      <option value="hc-black">High Contrast</option>
      <option value="github-dark">GitHub Dark</option>
      <option value="github-light">GitHub Light</option>
      <option value="dracula">Dracula</option>
      <option value="one-dark">One Dark</option>
      <option value="nord">Nord</option>
      <option value="solarized-dark">Solarized Dark</option>
      <option value="solarized-light">Solarized Light</option>
      <option value="monokai">Monokai</option>
      <option value="cobalt">Cobalt</option>
      <option value="ayu-dark">Ayu Dark</option>
      <option value="gruvbox-dark">Gruvbox Dark</option>
      <option value="material-darker">Material Darker</option>
    </select>
  );
}
