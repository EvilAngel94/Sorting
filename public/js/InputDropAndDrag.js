import {sortTheFile} from "./SortingScript.js";

const textArea = document.querySelector("textarea");
const dropArea = document.getElementById("drop-area");

["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    dropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

["dragenter", "dragover"].forEach((eventName) => {
    dropArea.addEventListener(eventName, highlight, false);
});

["dragleave", "drop"].forEach((eventName) => {
    dropArea.addEventListener(eventName, unhighlight, false);
});

function highlight() {
    dropArea.classList.add("highlight");
}

function unhighlight() {
    dropArea.classList.remove("highlight");
}

dropArea.addEventListener("drop", handleDrop, false);

function handleDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files;

    handleFiles(files);
}

function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
        const fileReader = new FileReader();
        fileReader.onload = function (event) {
            const sortedFile = sortTheFile(event.target.result);
            const lines = sortedFile.split(/\r\n|\n/);
            textArea.value = lines.join("\n");
        };
        fileReader.readAsText(files[i]);
    }
}