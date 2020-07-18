import {presentSortedArray} from './element/Presenter.js';
import {createSortedArraysForEachSplitArray} from './element/SortTheElements.js';

const input = document.querySelector('input');
const textArea = document.querySelector('textarea')

input.addEventListener('change', () => {
    let files = input.files;
    if (files.length === 0) {
        return;
    }

    const file = files[0]
    const reader = new FileReader();

    reader.onload = (fileReader) => {
        const sortedFile = sortTheFile(fileReader.target.result);
        const lines = sortedFile.split(/\r\n|\n/);
        textArea.value = lines.join('\n');
    }

    reader.onerror = (e) => alert(e.target.error.name);

    reader.readAsText(file);

});

/**
 * This is the main function, makes sure the file is prepared to be sorted, and after sorted back rebuild.
 *
 * @param fileToBeSorted
 *
 * @returns Sorted CSS file.
 */
function sortTheFile(fileToBeSorted) {
    let sortedArray = createSortedArraysForEachSplitArray(fileToBeSorted);
    return presentSortedArray(sortedArray);
}
