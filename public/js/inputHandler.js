import {sortTheFile} from "./SortingScript.js";

const input = document.querySelector("input");
const textArea = document.querySelector("textarea");
const dropArea = document.getElementById("drop-area");

input.addEventListener("change", () => {
    let files = input.files;
    if (files.length === 0) {
        return;
    }

    const file = files[0];
    const reader = new FileReader();

    reader.onload = (fileReader) => {
        createSortedCssFile(fileReader.target.result);
    };

    reader.onerror = (e) => alert(e.target.error.name);
    reader.readAsText(file);
});

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
})

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
})

;['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
})

function highlight(e) {
    dropArea.classList.add('highlight');
}

function unhighlight(e) {
    dropArea.classList.remove('highlight');
}

dropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files;

    handleFiles(files);
}

function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = function(event) {
            createSortedCssFile(event.target.result);
        }
        reader.readAsText(files[i]);
    }
}

function createSortedCssFile(file) {
    const sortedFile = sortTheFile(file);
    const lines = sortedFile.split(/\r\n|\n/);
    textArea.value = lines.join("\n");
}