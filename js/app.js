document.addEventListener('DOMContentLoaded', function () {
    const editors = {};
    const tagsToAutoClose = ['h1', 'h2', 'h3', 'h4', 'p', 'div', 'button', 'a', 'nav', 'footer', 'main', 'header', 'section', 'article', 'aside', 'b', 'u', 'pre'];
    const cssProperties = [
        'align-content',
        'align-items',
        'align-self',
        'animation',
        'animation-delay',
        'animation-direction',
        'animation-duration',
        'animation-fill-mode',
        'animation-iteration-count',
        'animation-name',
        'animation-timing-function',
        'background',
        'background-attachment',
        'background-color',
        'background-image',
        'background-position',
        'background-repeat',
        'background-size',
        'border',
        'border-bottom',
        'border-bottom-color',
        'border-bottom-left-radius',
        'border-bottom-right-radius',
        'border-bottom-style',
        'border-bottom-width',
        'border-collapse',
        'border-color',
        'border-left',
        'border-left-color',
        'border-left-style',
        'border-left-width',
        'border-radius',
        'border-right',
        'border-right-color',
        'border-right-style',
        'border-right-width',
        'border-spacing',
        'border-style',
        'border-top',
        'border-top-color',
        'border-top-left-radius',
        'border-top-right-radius',
        'border-top-style',
        'border-top-width',
        'border-width',
        'box-shadow',
        'color',
        'cursor',
        'display',
        'flex',
        'flex-direction',
        'flex-wrap',
        'float',
        'font',
        'font-family',
        'font-size',
        'font-size-adjust',
        'font-stretch',
        'font-style',
        'font-variant',
        'font-weight',
        'height',
        'justify-content',
        'letter-spacing',
        'line-height',
        'margin',
        'margin-bottom',
        'margin-left',
        'margin-right',
        'margin-top',
        'max-height',
        'max-width',
        'min-height',
        'min-width',
        'opacity',
        'overflow',
        'overflow-x',
        'overflow-y',
        'padding',
        'padding-bottom',
        'padding-left',
        'padding-right',
        'padding-top',
        'position',
        'quotes',
        'right',
        'text-align',
        'text-decoration',
        'text-indent',
        'text-transform',
        'top',
        'vertical-align',
        'visibility',
        'white-space',
        'width',
        'word-spacing',
        'z-index',
        'background-clip',
        'background-origin',
        'background-position-x',
        'background-position-y',
        'background-repeat-x',
        'background-repeat-y',
        'border-image',
        'border-image-source',
        'border-image-slice',
        'border-image-width',
        'border-image-outset',
        'clip',
        'filter',
        'grid',
        'grid-area',
        'grid-auto-columns',
        'grid-auto-flow',
        'grid-auto-rows',
        'grid-column',
        'grid-column-end',
        'grid-column-start',
        'grid-row',
        'grid-row-end',
        'grid-row-start',
        'object-fit',
        'overflow-wrap',
        'resize',
        'text-shadow',
        'transition',
        'transition-delay',
        'transition-duration',
        'transition-property',
        'transition-timing-function',
        'user-select',
        
        // Add more properties as needed
    ];
    const jsKeywords = [
                        "abstract", "arguments", "await", "boolean", "break", "byte", "case", "catch",   "document",
                             
    "char", "class", "const", "continue", "debugger", "default", "delete", "do",
    "double", "else", "enum", "eval", "export", "extends", "false", "final",
    "finally", "float", "for", "function", "goto", "if", "implements", "import",
    "in", "instanceof", "int", "interface", "let", "long", "native", "new",
    "null", "package", "private", "protected", "public", "return", "short",
    "static", "super", "switch", "synchronized", "this", "throw", "throws", 
    "transient", "true", "try", "typeof", "var", "void", "volatile", "while", 
    "with", "yield", "alert", "apply", "bind", "call", "constructor", "create", "defineProperty",
    "defineProperties", "entries", "every", "fill", "filter", "find", "findIndex",
    "forEach", "from", "hasOwnProperty", "includes", "indexOf", "join", "keys",
    "map", "match", "parse", "reduce", "reduceRight", "reject", "reverse", "",
    "some", "sort", "splice", "split", "toLocaleString", "toString()", "values","addEventListener()", "appendChild", "cloneNode", "createElement", "createTextNode",
    "dispatchEvent", "getAttribute", "getElementsByClassName()", "getElementsByTagName()",
    "getItem", "hasAttribute", "hasChildNodes", "insertBefore", "removeAttribute",
    "removeChild", "setAttribute", "setItem", "style", "textContent", "querySelector()",
    "querySelectorAll()", "toString()", "replace()", "split", "substring", "trim()",  "concat()", "copyWithin", "entries", "every", "fill", "filter", "find", "findIndex",
    "flat", "flatMap", "forEach", "includes", "indexOf", "join", "keys", "lastIndexOf",
    "map", "pop", "push", "reduce", "reduceRight", "reverse", "shift", "", 
    "some", "sort", "splice", "unshift", "toString", "valueOf",  "charAt", "charCodeAt", "concat", "endsWith", "fromCharCode", "includes", 
    "indexOf", "lastIndexOf", "localeCompare", "match", "repeat", "replace", 
    "search", "slice()", "split", "startsWith", "substr", "substring", "toLocaleLowerCase", 
    "toLocaleUpperCase", "toLowerCase", "toUpperCase", "trim", "trimEnd", "trimStart",  "assign", "create", "defineProperty", "defineProperties", "entries", "freeze", 
    "fromEntries", "getOwnPropertyDescriptor", "getOwnPropertyDescriptors", 
    "getOwnPropertyNames", "getOwnPropertySymbols", "keys", "is", "isExtensible", 
    "isFrozen", "isSealed", "values",   "abs", "acos", "asin", "atan", "atan2", "ceil", "cos", "exp", "floor", 
    "log", "max", "min", "pow", "random", "round", "sin", "sqrt", "tan","alignContent", "alignItems", "alignSelf", "all", "animation", "animationDelay",
    "animationDirection", "animationDuration", "animationFillMode", "animationIterationCount",
    "animationName", "animationTimingFunction", "backdropFilter", "background", "backgroundColor",
    "backgroundImage", "backgroundPosition", "backgroundSize", "border", "borderColor", 
    "borderRadius", "borderStyle", "borderWidth", "boxShadow", "color", "cursor", "display", 
    "flex", "flexDirection", "flexGrow", "flexShrink", "flexWrap", "font", "fontFamily", 
    "fontSize", "fontStyle", "fontWeight", "height", "justifyContent", "margin", "marginTop",
    "marginRight", "marginBottom", "marginLeft", "opacity", "padding", "paddingTop", 
    "paddingRight", "paddingBottom", "paddingLeft", "position", "textAlign", "textDecoration", 
    "textTransform", "transform", "transition", "width", "zIndex"
    ];
    

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
  
    // Initialize CodeMirror editors for HTML, CSS, JavaScript, and C
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
        },
        hintOptions: {
            hint: getCSSHints,
            completeSingle: false // This prevents automatic completion when there's only one match

        }
    });
  
    editors.javascript = CodeMirror.fromTextArea(document.getElementById('js-editor'), {
        mode: "text/javascript",
        theme: "monokai",
        lineNumbers: true,
        lineWrapping: true,
        extraKeys: {
            "Ctrl-Space": "autocomplete",
        },
        hintOptions: {
            hint: getJSHints, // Use the newly created hint function
            completeSingle: false // Prevent automatic completion when there's only one match
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




    function getCSSHints(cm) {
        const cursor = cm.getCursor();
        const line = cm.getLine(cursor.line);
        const token = cm.getTokenAt(cursor);
        
        // Check if the current token is a CSS property
        const input = token.string; 
        const currentInput = input; // Get the full input string
        const filteredProperties = cssProperties.filter(prop => prop.startsWith(currentInput));
    
        // Return hints for CodeMirror
        return {
            list: filteredProperties,
            from: CodeMirror.Pos(cursor.line, token.start),
            to: CodeMirror.Pos(cursor.line, token.end)
        };
    }
    editors.css.on('keyup', (cm, event) => {
        if (event.key.length === 1) { // Only show hints for actual characters
            cm.showHint({hint: getCSSHints});
        }
    });
   


    


// Function to show JS suggestions
    // Function to show JavaScript suggestions
    function getJSHints(cm) {
        const cursor = cm.getCursor();
        const token = cm.getTokenAt(cursor);
        const input = token.string;
    
        // Log the input being processed
    
        // Check if the input is valid
        if (!input || input.trim() === "") {
            return {
                list: [],
                from: CodeMirror.Pos(cursor.line, token.start),
                to: CodeMirror.Pos(cursor.line, token.end)
            };
        }
    
        // Filter the keywords based on input
        const filteredKeywords = jsKeywords.filter(keyword => keyword.startsWith(input));
    
        // Log the filtered keywords
    
        return {
            list: filteredKeywords,
            from: CodeMirror.Pos(cursor.line, token.start),
            to: CodeMirror.Pos(cursor.line, token.end)
        };
    }
    
  // Assuming editors.js is correctly initialized
editors.javascript.on('keyup', (cm, event) => {
    // Check if the key pressed is a printable character
    if (event.key.length === 1) {
        // Call showHint with the hint function
        cm.showHint({ hint: getJSHints });
    }
});






// Toggle dropdown visibility for each three-dot menu
document.querySelectorAll(".menu-icon").forEach((menuIcon) => {
    menuIcon.addEventListener("click", (event) => {
        const dropdown = event.currentTarget.nextElementSibling;
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    });
});

// Function to download code based on language
function downloadCode(language) {
    let codeContent;
    let fileExtension;
    let fileName;

    switch (language) {
        case 'html':
            codeContent = editors.html.getValue();
            fileExtension = 'html';
            fileName = 'index';
            break;
        case 'css':
            codeContent = editors.css.getValue();
            fileExtension = 'css';
            fileName = 'style';
            break;
        case 'js':
            codeContent = editors.javascript.getValue();
            fileExtension = 'js';
            fileName = 'script';
            break;
        
        default:
            console.error("Unsupported language for download.");
            return;
    }

    const blob = new Blob([codeContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// Add click events to each download button
document.querySelectorAll(".download-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
        const language = event.currentTarget.getAttribute("data-language");
        downloadCode(language);
        // Close the dropdown after download
        event.currentTarget.parentElement.style.display = "none";
    });
});

// Close dropdown if clicked outside
window.addEventListener("click", (event) => {
    document.querySelectorAll(".dropdown-content").forEach((dropdown) => {
        if (!dropdown.contains(event.target) && !dropdown.previousElementSibling.contains(event.target)) {
            dropdown.style.display = "none";
        }
    });
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
        localStorage.setItem('jsCode', jsCode);    }
  
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
  