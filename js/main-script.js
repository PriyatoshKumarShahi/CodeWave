const typedText = document.querySelector(".typed-text");
const cursor = document.querySelector(".cursor");

const textArray = [
  "Collaborate in real-time",
  "Customize your coding experience",
];
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    typedText.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 2000);
  }
}

function erase() {
  if (charIndex > 0) {
    typedText.textContent = textArray[textArrayIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(erase, 100);
  } else {
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, 1000);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(type, 1000);
});

const buttons = document.querySelectorAll(".lang-btn");
const codeSnippets = document.querySelectorAll(".code-snippet");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const lang = button.getAttribute("data-lang");

    // Hide all code snippets
    codeSnippets.forEach((snippet) => {
      snippet.style.display = "none";
    });

    // Show the selected language's code snippet
    document.getElementById(`${lang}-code`).style.display = "block";
  });
});