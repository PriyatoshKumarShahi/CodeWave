document.addEventListener('DOMContentLoaded', function () {
  const editors = {};

  // Initialize CodeMirror editors with auto-complete support for HTML, CSS, JS
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

  // Attach real-time output update on editor change
  Object.values(editors).forEach(editor => {
    editor.on('change', updateOutput);
  });

  // Attach auto-complete event for each editor
  Object.keys(editors).forEach(language => {
    editors[language].on("inputRead", function (editor) {
      if (language === 'html') {
        CodeMirror.commands.autocomplete(editor); // HTML uses XML hint
      } else if (language === 'css') {
        editor.showHint({ hint: CodeMirror.hint.css });
      } else if (language === 'javascript') {
        editor.showHint({ hint: CodeMirror.hint.javascript });
      }
    });
  });

  // Function to copy code from the specified editor
  function copyCode(language) {
    let editorContent;
    if (language === 'html') {
      editorContent = editors.html.getValue();
    } else if (language === 'css') {
      editorContent = editors.css.getValue();
    } else if (language === 'js') {
      editorContent = editors.javascript.getValue();
    }

    // Create a temporary textarea to hold the code for copying
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = editorContent;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);

    // Notify the user that the code was copied
    alert(`${language.toUpperCase()} code copied to clipboard!`);
  }

  // Add event listeners to the copy buttons
  document.getElementById('copy-html').addEventListener('click', function () {
    copyCode('html');
  });

  document.getElementById('copy-css').addEventListener('click', function () {
    copyCode('css');
  });

  document.getElementById('copy-js').addEventListener('click', function () {
    copyCode('js');
  });

  // Function to update the iframe with HTML, CSS, JS code
  function updateOutput() {
    const htmlCode = editors.html ? editors.html.getValue() : '';

    const cssCode = `
      <style>
        body { 
          background-color: black; /* Default background to black */
          color: white; /* Default text color to white */
          margin: 0;
          padding: 10px;
          font-family: Arial, sans-serif;
        }
        ${editors.css ? editors.css.getValue() : ''}
      </style>`;

    const jsCode = `<script>${editors.javascript ? editors.javascript.getValue() : ''}<\/script>`;

    const output = document.getElementById('output');

    // Combine and inject HTML, CSS, and JS into iframe
    output.srcdoc = htmlCode + cssCode + jsCode;
  }
});
