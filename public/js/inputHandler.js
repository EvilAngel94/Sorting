import {sortTheFile} from "./SortingScript.js";

const input = document.querySelector("input");
const textArea = document.querySelector("textarea");

input.addEventListener("change", () => {
    let files = input.files;
    if (files.length === 0) {
        return;
    }

    const file = files[0];
    const reader = new FileReader();

    reader.onload = (fileReader) => {
        const sortedFile = sortTheFile(fileReader.target.result);
        const lines = sortedFile.split(/\r\n|\n/);
        textArea.value = lines.join("\n");
    };

    reader.onerror = (e) => alert(e.target.error.name);
    reader.readAsText(file);
});
