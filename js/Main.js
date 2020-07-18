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
    let arrayOfSplitString = fileToBeSorted.replace(/ /g, '').split(/[{}]/)
    let sortedArray = createSortedArraysForEachSplitArray(arrayOfSplitString);
    return presentSortedArray(sortedArray);
}

function presentSortedArray(sortedArray) {
    let presentedString = "";

    for (const arrayEntry of sortedArray) {
        // If arrayEntry is undefined or null, it should just skip this entry.
        if (typeof arrayEntry === 'undefined' || arrayEntry === null) {

        } else if (arrayEntry.length === 1 && (arrayEntry[0].includes(".") || arrayEntry[0].includes("#"))) {
            presentedString = presentedString + arrayEntry + " {\n";

        } else if (arrayEntry.length === 1 && arrayEntry.includes(":")) {
            presentedString = presentedString + "  " + arrayEntry;
            /*
            When multiple keywords are used we need to see this as a title of a block markup.
            eg;
              .column-bottom,
              .column-top,
              .container
            These are skiped by the sorting, but need to be recreated again, in the exact same format as before.
            */
        } else if (arrayEntry.length < 10 && (arrayEntry[0].includes(".") || arrayEntry[0].includes("#"))) {
            let counter = 1;
            arrayEntry.forEach(element => {
                if (counter === arrayEntry.length) {
                    presentedString = presentedString + element + " {\n";
                    return;
                }
                presentedString = presentedString + element + "\n";
                counter++;
            })
            /*
            When a special keyword of CSS is present, then these entries will just be regarded as titles of format blocks.
            eg;
                button,
                body,
                html
                and so on
             */
        } else if (checkIfSearchedWordIsACssKeyWord(arrayEntry[0])) {
            presentedString = presentedString + arrayEntry + " {\n";
        } else {
            arrayEntry.forEach(element => {
                presentedString = presentedString + "  " + element + "\n";
            })
            presentedString = presentedString + "}\n\n"
        }
    }

    return presentedString;
}

const CSSKeyWords = ["a", "body", "blockquote", "button", "canvas", "cite", "code", "col", "colgroup", "details", "div", "em", "fieldset", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hr", "html", "i", "iframe", "img", "input", "label", "li", "link", "map", "menu", "menuitem", "nav", "ol", "option", "p", "param", "pre", "script", "select", "small", "span", "style", "summary", "table", "td", "template", "textarea", "th", "thead", "tr", "u", "ul", "var", "video"]

function checkIfSearchedWordIsACssKeyWord(searchKeyword) {
    return CSSKeyWords.includes(searchKeyword);
}


function getRemoveEmptyUselessElements(sortedArray) {
    let temp = [];
    for (let item of sortedArray) {
        item && temp.push(item);
    }
    return temp.filter(String);
}

function createSortedArraysForEachSplitArray(arrayOfSplitString) {
    let sortedArray = new Array(arrayOfSplitString.length)

    /*
    We're going to loop over the split elements of the CSS file.
    However, we only take the actual content so not the <b>body, button, select<b> elements.
    Therefore we're checking for the uneven elements of the array, and then we do a sort.
     */
    for (let i = 0; i < arrayOfSplitString.length; i++) {
        let splitElement = arrayOfSplitString[i].trim().split(/\n/)
        if (i % 2 === 1) {
            splitElement = splitElement.sort();
        }
        sortedArray.push(splitElement)
    }

    return getRemoveEmptyUselessElements(sortedArray);
}


