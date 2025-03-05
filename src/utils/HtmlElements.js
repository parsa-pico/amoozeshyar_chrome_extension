export function getDivLikeButton(label) {
  const element = document.createElement('div');
  element.innerText = label;
  element.style.cursor = 'pointer';
  element.style.padding = '10px 20px';
  element.style.backgroundColor = '#4CAF50';
  element.style.color = 'white';
  element.style.textAlign = 'center';
  element.style.borderRadius = '5px';
  element.style.userSelect = 'none';
  element.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  element.style.display = 'inline-block';
  return element;
}
export function getBeautifulTextInput(placeholder) {
  const input = document.createElement('input');
  input.placeholder = placeholder;
  input.type = 'text';
  input.style.padding = '12px 20px';
  input.style.border = '2px solid #ddd';
  input.style.borderRadius = '8px';
  input.style.fontSize = '16px';
  input.style.color = '#333';
  input.style.backgroundColor = '#f9f9f9';
  input.style.transition = 'border-color 0.3s ease';
  input.style.width = '100%';
  input.style.boxSizing = 'border-box';
  input.style.outline = 'none';

  // Adding hover and focus effects
  input.addEventListener('focus', () => {
    input.style.borderColor = '#4CAF50';
    input.style.backgroundColor = '#e8f5e9';
  });
  input.addEventListener('blur', () => {
    input.style.borderColor = '#ddd';
    input.style.backgroundColor = '#f9f9f9';
  });

  return input;
}
export function getBeautifulContainer() {
  const container = document.createElement('div');

  // Styling for the container
  container.style.padding = '20px';
  container.style.borderRadius = '10px';
  container.style.backgroundColor = '#fff';
  container.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
  container.style.maxWidth = '600px';
  container.style.margin = '20px auto';
  container.style.textAlign = 'center';
  container.style.fontFamily = 'Arial, sans-serif';

  // Create the heading
  const heading = document.createElement('h2');
  heading.innerText = 'آموزش باگ';
  heading.style.marginTop = 0;
  heading.style.fontSize = '24px';
  heading.style.marginBottom = '20px';

  // Append heading to container
  container.appendChild(heading);

  return container;
}
