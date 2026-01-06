import React, { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import html2canvas from "html2canvas";
import Footer from "./Components/Footer";
import themeStyles from "./utils/themeStyles";
import ThemeSelector from "./Components/ThemeSelector";
import LanguageSelector from "./Components/LanguageSelector";
import FontSizeInput from "./Components/FontSizeInput";
import LineHeightInput from "./Components/LineHeightInput";
import TopDots from "./Components/TopDots";
import { handleEditorDidMount } from "./utils/editorUtils";
import "./App.css";
import toast from "react-hot-toast";

/* ---------- helpers for shareable URLs ---------- */
const encodeState = (data) => btoa(encodeURIComponent(JSON.stringify(data)));
const decodeState = (str) => JSON.parse(decodeURIComponent(atob(str)));

export default function CodeEditor() {
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(20);
  const [snippetName, setSnippetName] = useState("");
  const [code, setCode] = useState(`(function repeat() {
eat();
sleep();
love_yourself();
repeat();
})();`);
  const [height, setHeight] = useState(100);
  const [isHydrated, setIsHydrated] = useState(false);
  const [editorInstance, setEditorInstance] = useState(null);

  const codeBoxRef = useRef(null);

  /* ---------- LOAD FROM URL (only on initial load) ---------- */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const snippet = params.get("snippet");
    if (!snippet) return;

    try {
      const data = decodeState(snippet);
      setCode(data.code);
      setLanguage(data.language);
      setTheme(data.theme);
      setFontSize(data.fontSize);
      setLineHeight(data.lineHeight);

      // Clear URL after loading to prevent 431 errors
      window.history.replaceState(null, "", window.location.pathname);
    } catch {
      console.error("Failed to decode snippet from URL");
    }
  }, []);

  /* ---------- LOAD FROM LOCAL STORAGE ---------- */
  useEffect(() => {
    // Only load from localStorage if there's no URL snippet
    const params = new URLSearchParams(window.location.search);
    const snippet = params.get("snippet");
    if (snippet) {
      setIsHydrated(true);
      return;
    }

    const saved = JSON.parse(localStorage.getItem("snipsy-state"));
    if (!saved) {
      setIsHydrated(true);
      return;
    }

    setCode(saved.code ?? "");
    setLanguage(saved.language ?? "javascript");
    setTheme(saved.theme ?? "vs-dark");
    setFontSize(saved.fontSize ?? 16);
    setLineHeight(saved.lineHeight ?? 20);
    setSnippetName(saved.snippetName ?? "");

    setIsHydrated(true);
  }, []);

  /* ---------- SAVE TO LOCAL STORAGE ---------- */
  useEffect(() => {
    if (!isHydrated) return;

    localStorage.setItem(
      "snipsy-state",
      JSON.stringify({
        code,
        language,
        theme,
        fontSize,
        lineHeight,
        snippetName,
      })
    );
  }, [code, language, theme, fontSize, lineHeight, snippetName, isHydrated]);

  /* ---------- FIX WHITE BACKGROUND ON THEME CHANGE ---------- */
  useEffect(() => {
    if (editorInstance) {
      // Force re-render editor background when theme changes
      setTimeout(() => {
        editorInstance.updateOptions({});
      }, 50);
    }
  }, [theme, editorInstance]);

  /* ---------- EXPORT FILE NAME ---------- */
  const getExportFileName = () => {
    const safe = snippetName
      .trim()
      .replace(/[^\w\-]+/g, "-")
      .toLowerCase();

    return safe || "snipsy-snippet";
  };

  /* ---------- EXPORT ---------- */
  const handleExport = async () => {
    if (!codeBoxRef.current) return;

    const canvas = await html2canvas(codeBoxRef.current, {
      backgroundColor: null,
      scale: 4,
      useCORS: true,
    });

    const link = document.createElement("a");
    link.download = `${getExportFileName()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();

    toast.success("Image downloaded");
  };

  const codeBoxStyle = themeStyles[theme] || themeStyles["vs-dark"];

  const copyToClipboard = async () => {
    if (!codeBoxRef.current) return;

    try {
      const canvas = await html2canvas(codeBoxRef.current, {
        backgroundColor: null,
        scale: 4,
        useCORS: true,
      });

      const blob = await new Promise((res) => canvas.toBlob(res, "image/png"));

      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);

      toast.success("Image copied to clipboard");
    } catch {
      toast.error("Copy failed");
    }
  };

  /* ---------- SHARE SNIPPET (ONLY WHEN CLICKED) ---------- */
  const shareSnippet = async () => {
    try {
      // Check if code is too large
      const stateData = {
        code,
        language,
        theme,
        fontSize,
        lineHeight,
      };

      const encoded = encodeState(stateData);

      // URL length limit check (typically ~2000 chars is safe)
      if (encoded.length > 1500) {
        toast.error("Code is too large to share via URL. Try shortening it.");
        return;
      }

      const shareUrl = `${window.location.origin}${window.location.pathname}?snippet=${encoded}`;

      await navigator.clipboard.writeText(shareUrl);
      toast.success("Shareable link copied");
    } catch (error) {
      toast.error("Failed to create share link");
      console.error(error);
    }
  };

  /* ---------- RESET FUNCTION ---------- */
  const handleReset = () => {
    // Clear local storage
    localStorage.removeItem("snipsy-state");

    // Reset all state to default values
    setCode(`(function repeat() {
eat();
sleep();
love_yourself();
repeat();
})();`);
    setLanguage("javascript");
    setTheme("vs-dark");
    setFontSize(16);
    setLineHeight(20);
    setSnippetName("");

    // Clear URL params
    window.history.replaceState(null, "", window.location.pathname);

    toast.success("Reset to default");
  };

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

        <button className="export-btn" onClick={copyToClipboard}>
          Copy
        </button>

        <button className="export-btn" onClick={shareSnippet}>
          Share
        </button>

        <button className="export-btn reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>

      {/* ---------- SNIPPET NAME ---------- */}
      <input
        className="snippet-name"
        placeholder="Snippet name..."
        value={snippetName}
        onChange={(e) => setSnippetName(e.target.value)}
      />

      {/* ---------- EXPORT TARGET WITH GRADIENT BACKGROUND ---------- */}
      <div ref={codeBoxRef} className="export-wrapper">
        <div className="code-box" style={codeBoxStyle}>
          <TopDots />
          <Editor
            key={theme}
            height={height}
            width="100%"
            language={language}
            value={code}
            theme={theme}
            onChange={(value) => setCode(value)}
            onMount={(editor, monaco) => {
              setEditorInstance(editor);
              handleEditorDidMount(editor, monaco, setHeight);
            }}
            options={{
              fontSize,
              lineHeight,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,

              wordWrap: "on",
              wordWrapColumn: 80,
              wrappingIndent: "same",

              insertSpaces: true,
              tabSize: 2,
              detectIndentation: false,

              automaticLayout: true,

              scrollbar: {
                vertical: "hidden",
                horizontal: "hidden",
                handleMouseWheel: false,
              },

              overviewRulerLanes: 0,
              hideCursorInOverviewRuler: true,
              lineNumbers: "off",

              formatOnPaste: true,
              formatOnType: true,
            }}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
