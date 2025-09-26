export const handleEditorDidMount = (editor, monaco, setHeight) => {
  monaco.editor.defineTheme("github-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#0d1117",
      "editor.foreground": "#c9d1d9",
    },
  });

  monaco.editor.defineTheme("github-light", {
    base: "vs",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#ffffff",
      "editor.foreground": "#24292f",
    },
  });

  monaco.editor.defineTheme("dracula", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#282a36",
      "editor.foreground": "#f8f8f2",
    },
  });

  monaco.editor.defineTheme("one-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#282c34",
      "editor.foreground": "#abb2bf",
    },
  });

  monaco.editor.defineTheme("nord", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#2e3440",
      "editor.foreground": "#d8dee9",
    },
  });

  monaco.editor.defineTheme("solarized-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#002b36",
      "editor.foreground": "#839496",
    },
  });

  monaco.editor.defineTheme("solarized-light", {
    base: "vs",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#fdf6e3",
      "editor.foreground": "#657b83",
    },
  });

  monaco.editor.defineTheme("monokai", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#272822",
      "editor.foreground": "#f8f8f2",
    },
  });

  monaco.editor.defineTheme("cobalt", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#002240",
      "editor.foreground": "#ffffff",
    },
  });

  monaco.editor.defineTheme("ayu-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#0f1419",
      "editor.foreground": "#b3b1ad",
    },
  });

  monaco.editor.defineTheme("gruvbox-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#282828",
      "editor.foreground": "#ebdbb2",
    },
  });

  monaco.editor.defineTheme("material-darker", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#212121",
      "editor.foreground": "#eeeeee",
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