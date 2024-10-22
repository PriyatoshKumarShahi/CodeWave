// Initialize CodeMirror editors with auto-complete support
const htmlEditor = CodeMirror.fromTextArea(document.getElementById('html-editor'), {
  mode: "text/html",
  theme: "monokai",
  lineNumbers: true,
  lineWrapping: true,
  extraKeys: {
      "Ctrl-Space": "autocomplete" // Trigger auto-complete on Ctrl + Space
  }
});

const cssEditor = CodeMirror.fromTextArea(document.getElementById('css-editor'), {
  mode: "text/css",
  theme: "monokai",
  lineNumbers: true,
  lineWrapping: true,
  extraKeys: {
      "Ctrl-Space": "autocomplete" // Trigger auto-complete on Ctrl + Space
  }
});

const jsEditor = CodeMirror.fromTextArea(document.getElementById('js-editor'), {
  mode: "text/javascript",
  theme: "monokai",
  lineNumbers: true,
  lineWrapping: true,
  extraKeys: {
      "Ctrl-Space": "autocomplete" // Trigger auto-complete on Ctrl + Space
  }
});

// Function to update the iframe with HTML, CSS, and JS code
function updateOutput() {
  const htmlCode = htmlEditor.getValue();
  
  // Default background color (black) and text color (white) styles for the iframe content
  const cssCode = `
      <style>
          body { 
              background-color: black; /* Set default background to black */
              color: white; /* Set default text color to white */
              margin: 0;
              padding: 10px;
              font-family: Arial, sans-serif;
          }
          ${cssEditor.getValue()}
      </style>`;
  
  const jsCode = `<script>${jsEditor.getValue()}<\/script>`;

  const output = document.getElementById('output');
  
  // Combine and inject HTML, CSS, and JS into iframe
  output.srcdoc = htmlCode + cssCode + jsCode;
}

// Update the output in real-time
htmlEditor.on('change', updateOutput);
cssEditor.on('change', updateOutput);
jsEditor.on('change', updateOutput);

// Enable auto-complete as you type for HTML
htmlEditor.on("inputRead", function(editor) {
  if (editor.getOption("mode") === "text/html") {
      // Using XML hint for HTML
      CodeMirror.commands.autocomplete(editor);
  }
});

// Enable auto-complete as you type for CSS
cssEditor.on("inputRead", function(editor) {
  if (editor.getOption("mode") === "text/css") {
      editor.showHint({hint: CodeMirror.hint.css});
  }
});

// Enable auto-complete as you type for JavaScript
jsEditor.on("inputRead", function(editor) {
  if (editor.getOption("mode") === "text/javascript") {
      editor.showHint({hint: CodeMirror.hint.javascript});
  }
});
