import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import html2canvas from "html2canvas";
import Footer from "./Components/Footer";
import themeStyles from "./utils/themeStyles";
import ThemeSelector from "./Components/ThemeSelector";
import LanguageSelector from "./Components/LanguageSelector";
import FontSizeInput from "./Components/FontSizeInput"; // Import the FontSizeInput component
import LineHeightInput from "./Components/LineHeightInput"; // Import the new LineHeightInput component
import TopDots from "./Components/TopDots";
import { handleEditorDidMount } from "./utils/editorUtils"; // Import the function
import "./App.css";

export default function CodeEditor() {
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(20);
  const [code, setCode] = useState(`(function repeat() {
eat();
sleep();
love_yourself();
repeat();
})();`);
  const [height, setHeight] = useState(100);
  const codeBoxRef = useRef(null);

  const handleExport = () => {
    if (codeBoxRef.current === null) return;

    html2canvas(codeBoxRef.current, {
      backgroundColor: null, // Use transparent background if needed
      scale: 5,
      useCORS: true, // Increase resolution for better quality
    })
      .then((canvas) => {
        const link = document.createElement("a");
        link.download = "snipsy-code.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      })
      .catch((err) => {
        console.error("Failed to capture code box", err);
      });
  };

  const codeBoxStyle = themeStyles[theme] || themeStyles["vs-dark"];

  return (
    <div className="container">
      <h1 className="title">SNIPSY</h1>
      <p className="subtitle">
        Create and share beautiful images of your source code.
      </p>

      <div className="controls">
        <LanguageSelector language={language} setLanguage={setLanguage} />
        <ThemeSelector theme={theme} setTheme={setTheme} />
        <FontSizeInput fontSize={fontSize} setFontSize={setFontSize} />
        <LineHeightInput
          lineHeight={lineHeight}
          setLineHeight={setLineHeight}
        />

        <button className="export-btn" onClick={handleExport}>
          Export
        </button>
      </div>

      <div
        style={{ padding: "20px", backgroundColor: "transparent" }}
        ref={codeBoxRef}
      >
        <div className="code-box" style={codeBoxStyle}>
          <TopDots />
          <Editor
            height={height}
            width="100%"
            language={language}
            value={code}
            theme={theme}
            onChange={(value) => setCode(value)}
            onMount={(editor, monaco) =>
              handleEditorDidMount(editor, monaco, setHeight)
            } // Use the imported function
            options={{
              fontSize: fontSize,
              lineHeight: lineHeight,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              scrollbar: {
                vertical: "hidden",
                horizontal: "hidden",
                handleMouseWheel: false,
              },
              overviewRulerLanes: 0,
              hideCursorInOverviewRuler: true,
              lineNumbers: "off",
            }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
