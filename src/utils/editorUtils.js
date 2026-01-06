export const handleEditorDidMount = (editor, monaco, setHeight) => {
  // Define all custom themes with TRANSPARENT backgrounds
  monaco.editor.defineTheme("github-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#00000000", // Transparent
      "editor.foreground": "#c9d1d9",
    },
  });

  monaco.editor.defineTheme("github-light", {
    base: "vs",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#00000000", // Transparent
      "editor.foreground": "#24292f",
    },
  });

  monaco.editor.defineTheme("dracula", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#00000000", // Transparent
      "editor.foreground": "#f8f8f2",
    },
  });

  monaco.editor.defineTheme("one-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#00000000", // Transparent
      "editor.foreground": "#abb2bf",
    },
  });

  monaco.editor.defineTheme("nord", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#00000000", // Transparent
      "editor.foreground": "#d8dee9",
    },
  });

  monaco.editor.defineTheme("solarized-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#00000000", // Transparent
      "editor.foreground": "#839496",
    },
  });

  monaco.editor.defineTheme("solarized-light", {
    base: "vs",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#00000000", // Transparent
      "editor.foreground": "#657b83",
    },
  });

  monaco.editor.defineTheme("monokai", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#00000000", // Transparent
      "editor.foreground": "#f8f8f2",
    },
  });

  monaco.editor.defineTheme("cobalt", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#00000000", // Transparent
      "editor.foreground": "#ffffff",
    },
  });

  monaco.editor.defineTheme("ayu-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#00000000", // Transparent
      "editor.foreground": "#b3b1ad",
    },
  });

  monaco.editor.defineTheme("gruvbox-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#00000000", // Transparent
      "editor.foreground": "#ebdbb2",
    },
  });

  monaco.editor.defineTheme("material-darker", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#00000000", // Transparent
      "editor.foreground": "#eeeeee",
    },
  });

  // Also override the default themes to be transparent
  monaco.editor.defineTheme("vs-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#00000000", // Transparent
    },
  });

  monaco.editor.defineTheme("light", {
    base: "vs",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#00000000", // Transparent
    },
  });

  monaco.editor.defineTheme("hc-black", {
    base: "hc-black",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#00000000", // Transparent
    },
  });

  const updateSize = () => {
    const contentHeight = editor.getContentHeight();
    setHeight(contentHeight);
    editor.layout();
  };

  editor.onDidContentSizeChange(updateSize);
  updateSize();
};