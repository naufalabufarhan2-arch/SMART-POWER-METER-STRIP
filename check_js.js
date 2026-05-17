const fs = require('fs');
const path = require('path');

const htmlPath = 'C:\\Users\\ASUS\\.gemini\\antigravity\\scratch\\power_monitoring\\index.html';
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Extract script contents
const scriptRegex = /<script>([\s\S]*?)<\/script>/;
const match = htmlContent.match(scriptRegex);

if (match && match[1]) {
  const jsContent = match[1];
  
  // We can write it to a temp file and run it
  const tempJsPath = path.join(__dirname, 'temp_check.js');
  
  // Since some browser variables like window, document, Chart are used, we mock them
  const mocks = `
    const window = { addEventListener: () => {} };
    const document = {
      getElementById: () => ({
        getContext: () => ({ createLinearGradient: () => ({ addColorStop: () => {} }) }),
        addEventListener: () => {},
        textContent: '',
        classList: { remove: () => {}, add: () => {}, contains: () => true },
        querySelector: () => ({ innerHTML: '' }),
        querySelectorAll: () => [
          { classList: { remove: () => {}, add: () => {}, toggle: () => {} }, style: {} },
          { classList: { remove: () => {}, add: () => {}, toggle: () => {} }, style: {} },
          { classList: { remove: () => {}, add: () => {}, toggle: () => {} }, style: {} },
          { classList: { remove: () => {}, add: () => {}, toggle: () => {} }, style: {} },
          { classList: { remove: () => {}, add: () => {}, toggle: () => {} }, style: {} }
        ],
        innerHTML: ''
      }),
      querySelectorAll: () => [
        { classList: { remove: () => {}, add: () => {}, toggle: () => {} }, style: {} },
        { classList: { remove: () => {}, add: () => {}, toggle: () => {} }, style: {} }
      ]
    };
    class Chart {
      constructor() {
        this.data = { labels: [], datasets: [{ data: [] }] };
      }
      update() {}
    }
  `;
  
  fs.writeFileSync(tempJsPath, mocks + jsContent, 'utf8');
  console.log('JS extracted and mocked. Running syntax check...');
  
  try {
    require(tempJsPath);
    console.log('SYNTAX CHECK SUCCESSFUL: No syntax errors detected!');
  } catch (err) {
    console.error('SYNTAX CHECK FAILED:', err);
  }
} else {
  console.error('No script tag found!');
}
