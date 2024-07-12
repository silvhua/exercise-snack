export default function rotateArray(arr) {
  if (arr.length > 1) {
    let firstItem = arr.shift();
    arr.push(firstItem);
  }
  return arr;
}

export function convertToKebabCase(text) {
  return text.replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+|_+/g, '-')
    .toLowerCase();
}

export function replaceHyphens(str) {
  return str.replace(/-/g, '%');
}