export function appendFormSearchParam(formName) {
  __appendSearchParams({ 'form': formName });
}

function __appendSearchParams(params) {
  const urlParams = new URLSearchParams(window.location.search);

  // Add parameters only if they are not already present
  Object.keys(params).forEach((key) => {
    if (!urlParams.has(key)) {
      urlParams.set(key, params[key]);
    }
  });

  // Check if the URL has changed and reload the page with the new parameters
  const newUrl =
    window.location.origin +
    window.location.pathname +
    '?' +
    urlParams.toString();
  if (window.location.href !== newUrl) {
    window.location.href = newUrl;
  }
}

// Run the function when the page loads
window.onload = function () {
  __appendSearchParams();
};
