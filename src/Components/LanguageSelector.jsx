import React from "react";

export default function LanguageSelector({ language, setLanguage }) {
  return (
    <select onChange={(e) => setLanguage(e.target.value)} value={language}>
      <option value="javascript">JavaScript</option>
      <option value="typescript">TypeScript</option>
      <option value="python">Python</option>
      <option value="java">Java</option>
      <option value="c">C</option>
      <option value="cpp">C++</option>
      <option value="json">JSON</option>
      <option value="css">CSS</option>
      <option value="html">HTML</option>
      <option value="sql">SQL</option>
      <option value="xml">XML</option>
      <option value="php">PHP</option>
      <option value="ruby">Ruby</option>
      <option value="go">Go</option>
      <option value="swift">Swift</option>
      <option value="kotlin">Kotlin</option>
      <option value="r">R</option>
    </select>
  );
}
