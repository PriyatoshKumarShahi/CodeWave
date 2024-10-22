// Object to store CodeMirror editors
const editors = {};

// Initialize CodeMirror editors with auto-complete support for default editors (HTML, CSS, JS)
editors.html = CodeMirror.fromTextArea(document.getElementById('html-editor'), {
  mode: "text/html",
  theme: "monokai",
  lineNumbers: true,
  lineWrapping: true,
  extraKeys: {
      "Ctrl-Space": "autocomplete" // Trigger auto-complete on Ctrl + Space
  }
});

editors.css = CodeMirror.fromTextArea(document.getElementById('css-editor'), {
  mode: "text/css",
  theme: "monokai",
  lineNumbers: true,
  lineWrapping: true,
  extraKeys: {
      "Ctrl-Space": "autocomplete" // Trigger auto-complete on Ctrl + Space
  }
});

editors.javascript = CodeMirror.fromTextArea(document.getElementById('js-editor'), {
  mode: "text/javascript",
  theme: "monokai",
  lineNumbers: true,
  lineWrapping: true,
  extraKeys: {
      "Ctrl-Space": "autocomplete" // Trigger auto-complete on Ctrl + Space
  }
});

// Function to dynamically add new editors (including TypeScript)
function addEditor(language, mode, editorId) {
  // Check if the editor for the selected language already exists
  if (!editors[language]) {
    const editorSection = document.createElement('div');
    editorSection.classList.add('editor-section');
    editorSection.setAttribute('data-lang', language);

    // Create a title and textarea
    const langName = language.charAt(0).toUpperCase() + language.slice(1);
    editorSection.innerHTML = `
      <h3>${langName}</h3>
      <textarea id="${editorId}"></textarea>
      <span class="remove-editor">×</span>
    `;

    // Add the editor to the DOM
    document.getElementById('editor-container').appendChild(editorSection);

    // Initialize CodeMirror for the newly added textarea
    editors[language] = CodeMirror.fromTextArea(
      document.getElementById(editorId), {
        mode: mode,
        theme: "monokai",
        lineNumbers: true,
        lineWrapping: true,
        extraKeys: {
          "Ctrl-Space": "autocomplete" // Trigger auto-complete on Ctrl + Space
        }
    });

    // Attach real-time output update on editor change
    editors[language].on('change', updateOutput);

    // Attach auto-complete event for the new editor
    editors[language].on("inputRead", function(editor) {
      editor.showHint();
    });
  }
}

// Add TypeScript editor
addEditor('typescript', 'application/typescript', 'ts-editor');

// Function to update the iframe with HTML, CSS, JS, and TypeScript code
function updateOutput() {
  const htmlCode = editors.html ? editors.html.getValue() : '';
  
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
          ${editors.css ? editors.css.getValue() : ''}
      </style>`;
  
  const jsCode = `<script>${editors.javascript ? editors.javascript.getValue() : ''}<\/script>`;

  // Compile TypeScript code to JavaScript
  const tsCode = `<script>${editors.typescript ? ts.transpile(editors.typescript.getValue()) : ''}<\/script>`;

  const output = document.getElementById('output');
  
  // Combine and inject HTML, CSS, JS, and compiled TS into iframe
  output.srcdoc = htmlCode + cssCode + jsCode + tsCode;
}

// Update the output in real-time
Object.values(editors).forEach(editor => editor.on('change', updateOutput));

// Dropdown to add new language editors dynamically
document.getElementById('add-language').addEventListener('click', function() {
  const selectedLanguage = document.getElementById('language-select').value;

  // Mapping languages to modes and editor IDs
  const languageMap = {
    html: { mode: "text/html", editorId: "html-editor" },
    css: { mode: "text/css", editorId: "css-editor" },
    javascript: { mode: "text/javascript", editorId: "js-editor" },
    typescript: { mode: "application/typescript", editorId: "ts-editor" }
  };

  const { mode, editorId } = languageMap[selectedLanguage];

  addEditor(selectedLanguage, mode, editorId);
});

// Remove an editor when the close icon is clicked
document.getElementById('editor-container').addEventListener('click', function(event) {
  if (event.target.classList.contains('remove-editor')) {
    const editorSection = event.target.parentElement;
    const language = editorSection.getAttribute('data-lang');

    // Remove the editor from DOM and editors object
    editorSection.remove();
    delete editors[language];

    // Update output after removal
    updateOutput();
  }
});

// Enable auto-complete for HTML, CSS, JS, and TypeScript editors as you type
Object.keys(editors).forEach(language => {
  editors[language].on("inputRead", function(editor) {
    if (language === 'html') {
      CodeMirror.commands.autocomplete(editor); // HTML uses XML hint
    } else if (language === 'css') {
      editor.showHint({ hint: CodeMirror.hint.css });
    } else if (language === 'javascript' || language === 'typescript') {
      editor.showHint({ hint: CodeMirror.hint.javascript });
    }
  });
});
