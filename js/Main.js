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

function sortTheFile(fileToBeSorted) {
    console.log(fileToBeSorted)
    let arrayOfSplitString = fileToBeSorted.replace(/ /g, '').split(/[{}]/)

    let sortedArray = createSortedIndividualArrays(arrayOfSplitString);

    let newlyCreatedSortedArray = presentSortedArray(sortedArray);
    console.log(newlyCreatedSortedArray)
    return newlyCreatedSortedArray;
}

function presentSortedArray(sortedArray) {
    let presentedString = "";

    for (const arrayEntry of sortedArray) {
        if (typeof arrayEntry === 'undefined' || arrayEntry === null) {

        } else if (arrayEntry.length === 1 || arrayEntry === " ") {
            presentedString = presentedString + arrayEntry + " {\n";
        } else {
            arrayEntry.forEach(element => {
                presentedString = presentedString + "  " + element + "\n";
            })
        }
    }
    return presentedString;
}

function createSortedIndividualArrays(arrayOfSplitString) {
    let sortedArray = new Array(arrayOfSplitString.length)

    for (const inputElement of arrayOfSplitString) {
        let splitElement = inputElement.trim().split(/\n/);
        if (splitElement.length !== 1) {
            splitElement = splitElement.sort();
        }
        sortedArray.push(splitElement)
    }
    return sortedArray;
}

