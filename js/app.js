document.addEventListener('DOMContentLoaded', function () {
  const editors = {};

  // Initialize CodeMirror editors for HTML, CSS, JS
  editors.html = CodeMirror.fromTextArea(document.getElementById('html-editor'), {
    mode: "text/html",
    theme: "monokai",
    lineNumbers: true,
    lineWrapping: true
  });

  editors.css = CodeMirror.fromTextArea(document.getElementById('css-editor'), {
    mode: "text/css",
    theme: "monokai",
    lineNumbers: true,
    lineWrapping: true
  });

  editors.javascript = CodeMirror.fromTextArea(document.getElementById('js-editor'), {
    mode: "text/javascript",
    theme: "monokai",
    lineNumbers: true,
    lineWrapping: true
  });

  // Load the saved code from localStorage when the page loads
  loadSavedCode();

  // Function to save code to localStorage
  function saveCodeToLocalStorage() {
    const htmlCode = editors.html.getValue();
    const cssCode = editors.css.getValue();
    const jsCode = editors.javascript.getValue();

    localStorage.setItem('htmlCode', htmlCode);
    localStorage.setItem('cssCode', cssCode);
    localStorage.setItem('jsCode', jsCode);
  }

  // Function to load the saved code from localStorage
  function loadSavedCode() {
    const savedHtml = localStorage.getItem('htmlCode');
    const savedCss = localStorage.getItem('cssCode');
    const savedJs = localStorage.getItem('jsCode');

    if (savedHtml) editors.html.setValue(savedHtml);
    if (savedCss) editors.css.setValue(savedCss);
    if (savedJs) editors.javascript.setValue(savedJs);

    updateOutput();
  }

  // Function to clear code and show an alert
  function clearCode() {
    editors.html.setValue('');
    editors.css.setValue('');
    editors.javascript.setValue('');

    // Clear localStorage as well
    localStorage.removeItem('htmlCode');
    localStorage.removeItem('cssCode');
    localStorage.removeItem('jsCode');

    // Update the output and show an alert
    updateOutput();
    alert('Code cleared!');
  }

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

    // Using modern Clipboard API for better compatibility
    if (navigator.clipboard) {
      navigator.clipboard.writeText(editorContent)
        .then(() => {
          alert(`${language.toUpperCase()} code copied to clipboard!`);
        })
        .catch(err => {
          console.error('Error copying to clipboard: ', err);
        });
    } else {
      // Fallback for older browsers
      const tempTextArea = document.createElement('textarea');
      tempTextArea.value = editorContent;
      document.body.appendChild(tempTextArea);
      tempTextArea.select();
      document.execCommand('copy');
      document.body.removeChild(tempTextArea);

      alert(`${language.toUpperCase()} code copied to clipboard!`);
    }
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

  // Add event listener to the clear button
  document.getElementById('clear-code').addEventListener('click', clearCode);

  // Function to update the iframe with HTML, CSS, JS code
  function updateOutput() {
    const htmlCode = editors.html ? editors.html.getValue() : '';
    const cssCode = `
      <style>
        body {
          background-color: black; /* Set the default background color */
          color: white; /* Set the default text color */
          margin: 0;
          padding: 10px;
          font-family: Arial, sans-serif;
        }
        ${editors.css ? editors.css.getValue() : ''}
      </style>`;
    
    const jsCode = `<script>${editors.javascript ? editors.javascript.getValue() : ''}<\/script>`;

    const output = document.getElementById('output');
    output.srcdoc = htmlCode + cssCode + jsCode;

    // Save code to localStorage whenever the output is updated
    saveCodeToLocalStorage();
  }

  // Attach real-time output update on editor change
  Object.values(editors).forEach(editor => {
    editor.on('change', updateOutput);
  });
});
