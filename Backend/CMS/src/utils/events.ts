
export function placeCursorAtEnd(inputElement:HTMLInputElement | HTMLTextAreaElement) {
    // 1. Ensure the element is focused first
    inputElement.focus();

    // 2. Get the length of the input value
    const len = inputElement.value.length;

    // 3. Set the selection start and end to the length of the value
    // This moves the cursor to the end and ensures nothing is selected
    inputElement.setSelectionRange(len, len);
}