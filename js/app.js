document.addEventListener('DOMContentLoaded', function () {
    const editors = {};
    const tagsToAutoClose = ['h1', 'h2', 'h3', 'h4', 'p', 'div', 'button', 'a', 'nav', 'footer', 'main', 'header', 'section', 'article', 'aside', 'b', 'u', 'pre'];
    let hintElement = document.createElement('div');
  
    // Style the hint element
    hintElement.style.position = 'absolute';
    hintElement.style.padding = '5px';
    hintElement.style.backgroundColor = '#333';
    hintElement.style.color = '#fff';
    hintElement.style.borderRadius = '3px';
    hintElement.style.fontSize = '12px';
    hintElement.style.zIndex = '1000';
    hintElement.style.display = 'none';
    hintElement.textContent = "Press Enter to complete the tag";
    document.body.appendChild(hintElement);
  
    // Show hint near cursor
    function showHint(editor) {
        const cursorPos = editor.cursorCoords(true, "page");
        hintElement.style.left = `${cursorPos.left}px`;
        hintElement.style.top = `${cursorPos.bottom}px`;
        hintElement.style.display = 'block';
    }
  
    // Hide hint
    function hideHint() {
        hintElement.style.display = 'none';
    }
  
    // Initialize CodeMirror editors for HTML, CSS, and JavaScript
    editors.html = CodeMirror.fromTextArea(document.getElementById('html-editor'), {
        mode: "text/html",
        theme: "monokai",
        lineNumbers: true,
        lineWrapping: true,
        extraKeys: {
            "Ctrl-Space": "autocomplete",
        }
    });
  
    editors.css = CodeMirror.fromTextArea(document.getElementById('css-editor'), {
        mode: "text/css",
        theme: "monokai",
        lineNumbers: true,
        lineWrapping: true,
        extraKeys: {
            "Ctrl-Space": "autocomplete",
        }
    });
  
    editors.javascript = CodeMirror.fromTextArea(document.getElementById('js-editor'), {
        mode: "text/javascript",
        theme: "monokai",
        lineNumbers: true,
        lineWrapping: true,
        extraKeys: {
            "Ctrl-Space": "autocomplete",
        }
    });
  
    // Auto-closing brackets and quotes
    Object.values(editors).forEach(editor => {
        editor.on('beforeChange', (instance, changeObj) => {
            if (changeObj.origin === "+input" && changeObj.text.length === 1) {
                const char = changeObj.text[0];
                let closingChar;
  
                switch (char) {
                    case '(':
                        closingChar = ')';
                        break;
                    case '{':
                        closingChar = '}';
                        break;
                    case '[':
                        closingChar = ']';
                        break;
                    case '"':
                        closingChar = '"';
                        break;
                    case "'":
                        closingChar = "'";
                        break;
                    case '<':
                        closingChar = '></>';
                        break;
                    default:
                        return;
                }
  
                changeObj.cancel();
                const cursorPosition = changeObj.from.ch;
                instance.replaceRange(char + closingChar, changeObj.from);
                instance.setCursor({ line: changeObj.from.line, ch: cursorPosition + 1 });
            }
        });
  
        // Backspace for removing paired characters
        editor.on('keydown', (instance, event) => {
            if (event.key === "Backspace") {
                const cursor = instance.getCursor();
                const line = instance.getLine(cursor.line);
                const charBeforeCursor = line[cursor.ch - 1];
                const charAfterCursor = line[cursor.ch];
  
                const pairs = { '(': ')', '{': '}', '[': ']', '<': '>', '"': '"', "'": "'" };
  
                if (pairs[charBeforeCursor] && pairs[charBeforeCursor] === charAfterCursor) {
                    event.preventDefault();
                    instance.replaceRange('', { line: cursor.line, ch: cursor.ch - 1 }, { line: cursor.line, ch: cursor.ch + 1 });
                }
            }
        });
    });
  
    // Add auto tags like <h1></h1> when recognized tag is typed + Enter is pressed
    editors.html.on('keydown', (cm, event) => {
        const cursor = cm.getCursor();
        const lineContent = cm.getLine(cursor.line).trim();
        const lastWord = lineContent.split(' ').pop();
  
        if (event.key === 'Enter' && tagsToAutoClose.includes(lastWord)) {
            event.preventDefault();
            const tagName = lastWord;
  
            // Replace the last word with opening and closing tags
            const start = { line: cursor.line, ch: lineContent.length - lastWord.length };
            const end = { line: cursor.line, ch: lineContent.length };
  
            cm.replaceRange(`<${tagName}></${tagName}>`, start, end);
            
            // Set the cursor position between the tags
            cm.setCursor({ line: cursor.line, ch: start.ch + tagName.length + 2 });
            hideHint(); // Hide the hint on Enter
        }
    });
  
    Object.values(editors).forEach(editor => {
      editor.setOption("extraKeys", {
          "Alt-Shift-Down": function(cm) { // Duplicate line
              const cursor = cm.getCursor();
              const lineContent = cm.getLine(cursor.line);
              cm.replaceRange(lineContent + "\n", { line: cursor.line + 1, ch: 0 });
          },
          "Alt-Down": function(cm) { // Move line down
              const cursor = cm.getCursor();
              const lineContent = cm.getLine(cursor.line);
              cm.replaceRange("", { line: cursor.line, ch: 0 }, { line: cursor.line + 1, ch: 0 });
              cm.replaceRange(lineContent + "\n", { line: cursor.line + 1, ch: 0 });
              cm.setCursor({ line: cursor.line + 1, ch: cursor.ch });
          },
          "Alt-Up": function(cm) { // Move line up
              const cursor = cm.getCursor();
              if (cursor.line === 0) return;
              const lineContent = cm.getLine(cursor.line);
              cm.replaceRange("", { line: cursor.line, ch: 0 }, { line: cursor.line + 1, ch: 0 });
              cm.replaceRange(lineContent + "\n", { line: cursor.line - 1, ch: 0 });
              cm.setCursor({ line: cursor.line - 1, ch: cursor.ch });
          },
          "Ctrl-/": "toggleComment"
      });
    });
  
    // Show hint when recognized tag is typed
    editors.html.on('change', (instance, changeObj) => {
        if (changeObj.origin === '+input' && changeObj.text.length === 1) {
            const lineContent = instance.getLine(changeObj.from.line).trim();
            const lastWord = lineContent.split(' ').pop();
  
            if (tagsToAutoClose.includes(lastWord)) {
                showHint(instance);
            } else {
                hideHint();
            }
        } else {
            hideHint();
        }
    });
  
    function updateOutput() {
        const htmlCode = editors.html ? editors.html.getValue() : '';
        const cssCode = `<style>
          body {
            background-color: black;
            color: white;
            margin: 0;
            padding: 10px;
            font-family: Arial, sans-serif;
          }
          ${editors.css ? editors.css.getValue() : ''}
        </style>`;
        const jsCode = `<script>${editors.javascript ? editors.javascript.getValue() : ''}<\/script>`;
  
        const output = document.getElementById('output');
        output.srcdoc = htmlCode + cssCode + jsCode;
  
        saveCodeToLocalStorage();
    }
  
    Object.values(editors).forEach(editor => {
        editor.on('change', updateOutput);
    });
  
    // Load, save, copy, and clear functions
    loadSavedCode();
  
    function saveCodeToLocalStorage() {
        const htmlCode = editors.html.getValue();
        const cssCode = editors.css.getValue();
        const jsCode = editors.javascript.getValue();
  
        localStorage.setItem('htmlCode', htmlCode);
        localStorage.setItem('cssCode', cssCode);
        localStorage.setItem('jsCode', jsCode);
    }
  
    function loadSavedCode() {
        const savedHtml = localStorage.getItem('htmlCode');
        const savedCss = localStorage.getItem('cssCode');
        const savedJs = localStorage.getItem('jsCode');
  
        if (savedHtml) editors.html.setValue(savedHtml);
        if (savedCss) editors.css.setValue(savedCss);
        if (savedJs) editors.javascript.setValue(savedJs);
  
        updateOutput();
    }
  
    function clearCode() {
        editors.html.setValue('');
        editors.css.setValue('');
        editors.javascript.setValue('');
  
        localStorage.removeItem('htmlCode');
        localStorage.removeItem('cssCode');
        localStorage.removeItem('jsCode');
  
        updateOutput();
        alert('Code cleared!');
    }
  
    function copyCode(language) {
        let editorContent;
        if (language === 'html') {
            editorContent = editors.html.getValue();
        } else if (language === 'css') {
            editorContent = editors.css.getValue();
        } else if (language === 'js') {
            editorContent = editors.javascript.getValue();
        }
  
        navigator.clipboard.writeText(editorContent)
            .then(() => {
                alert(`${language.toUpperCase()} code copied!`);
            })
            .catch((error) => {
                alert('Failed to copy code:', error);
            });
    }
  
    document.getElementById('clear-code').addEventListener('click', clearCode);
    document.getElementById('copy-html').addEventListener('click', () => copyCode('html'));
    document.getElementById('copy-css').addEventListener('click', () => copyCode('css'));
    document.getElementById('copy-js').addEventListener('click', () => copyCode('js'));
  });
  