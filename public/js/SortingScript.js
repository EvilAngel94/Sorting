/**
 * This is the main function, makes sure the file is prepared to be sorted, and after sorted back rebuild.
 *
 * @param fileToBeSorted
 *
 * @returns Sorted CSS file.
 */
function sortTheFile(fileToBeSorted) {
    return presentSortedArray(createSortedArraysForEachSplitArray(fileToBeSorted));
}

/**
 * This is the main function of this class.
 * The method parsed the incoming file, and makes different arrays from it. Each of these arrays can be divided into titleBlock and markupBlocks.
 * The titleBlock are for example the <b>body, button, select<b> elements.
 * The markupBlocks can be represented by <b>color, font-family<b> to name a few.
 *
 * @param fileToBeSorted
 *
 * @returns sorted arrays based on the alphabet.
 */
function createSortedArraysForEachSplitArray(fileToBeSorted) {
    let arrayOfSplitMarkUpElements = fileToBeSorted.replace(/ /g, " ").split(/[{}]/);
    let sortedArray = new Array(arrayOfSplitMarkUpElements.length);

    /*
    We're going to loop over the split elements of the CSS file.
    However, we only take the actual content so not the <b>body, button, select<b> elements.
    Therefore we're checking for the uneven elements of the array, and then we do a sort.
     */
    for (let i = 0; i < arrayOfSplitMarkUpElements.length; i++) {
        const splitMarkUpElementArray = arrayOfSplitMarkUpElements[i];
        let splitElement = splitMarkUpElementArray.trim().split(/\n/);
        if (i % 2 === 1) {
            let element = splitElement[0];
            splitElement[0] = "  " + element;
            splitElement = splitElement.sort();
        }
        sortedArray.push(splitElement);
    }

    return removeUnusableElementsFormTheArray(sortedArray);
}

function removeUnusableElementsFormTheArray(sortedArray) {
    let temp = [];
    for (let item of sortedArray) {
        item && temp.push(item);
    }
    return temp.filter(String);
}

/**
 * This main function is responsible for to display the sorted document, and make it possible for the user to just copy past the outcome to put in their own CSS file.
 *
 * @param sortedMarkupElementsInArray
 *
 * @returns the whole sorted document.
 */
function presentSortedArray(sortedMarkupElementsInArray) {
    let presentedString = "";

    for (const sortedMarkupElement of sortedMarkupElementsInArray) {
        const lengtOfOne = sortedMarkupElement.length === 1;
        const elementContainsPoint = sortedMarkupElement[0].includes(".");
        const elementContainsHashTag = sortedMarkupElement[0].includes("#");
        const elementContainsHexColorCode = checkIfArrayEntryContainsHexColorCode(sortedMarkupElement);

        // If sortedMarkupElement is undefined or null, it should just skip this entry.
        if (typeof sortedMarkupElement === "undefined") {
            /*
            This line of code would cover the solo key elements such as .container, #container-id, select and so on
            */
        } else if (lengtOfOne && (elementContainsPoint || elementContainsHashTag) && !elementContainsHexColorCode) {
            presentedString = presentedString + sortedMarkupElement + " {\n";

            /*
            This line is responsible for only parsing a single property of a format block.
            */
        } else if (lengtOfOne && sortedMarkupElement.includes(":")) {
            presentedString = presentedString + "  " + sortedMarkupElement;
            /*
            When multiple keywords are used we need to see this as a title of a block markup.
            eg;
              .column-bottom,
              .column-top,
              .container
            These are skipped by the sorting, but need to be recreated again, in the exact same format as before.
            */
        } else if (sortedMarkupElement.length < 10 && (elementContainsPoint || elementContainsHashTag) && !elementContainsHexColorCode) {
            let counter = 1;
            sortedMarkupElement.forEach(element => {
                if (counter === sortedMarkupElement.length) {
                    presentedString = presentedString + element + " {\n";
                    return;
                }
                presentedString = presentedString + element + "\n";
                counter++;
            })
            /*
             When a special keyword of CSS is present, then these entries will just be regarded as titles of format blocks.
               eg;
              button, body, html and so on
            */
        } else if (checkIfSearchedWordIsACssKeyWord(sortedMarkupElement[0])) {
            presentedString = presentedString + sortedMarkupElement + " {\n";
        } else {
            sortedMarkupElement.forEach(element => {
                presentedString = presentedString + element + "\n";
            });
            presentedString = presentedString + "}\n\n"
        }
    }
    return presentedString;
}


const CSSKeyWords = ["a", "body", "blockquote", "button", "canvas", "cite", "code", "col", "colgroup", "details", "div", "em", "fieldset", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hr", "html", "i", "iframe", "img", "input", "label", "li", "link", "map", "menu", "menuitem", "nav", "ol", "option", "p", "param", "pre", "script", "select", "small", "span", "style", "summary", "table", "td", "template", "textarea", "th", "thead", "tr", "u", "ul", "var", "video"]

function checkIfSearchedWordIsACssKeyWord(searchKeyword) {
    return CSSKeyWords.includes(searchKeyword);
}

function checkIfArrayEntryContainsHexColorCode(markupElements) {
    let isHexColor = false;
    // Go through all the markup elements to check for hex combination
    for (const element of markupElements) {
        const splitArray = element.replace(/;/, "").split(/:/);
        // go through each pair
        for (const splitElement of splitArray) {
            // if pair matches the hex colour regex it returns true
            isHexColor = /^#[0-9A-F]{6}$/i.test(splitElement.trim());
            if (isHexColor) {
                return isHexColor;
            }
        }
    }
    return isHexColor;
}

export {
    sortTheFile,
    checkIfSearchedWordIsACssKeyWord,
    checkIfArrayEntryContainsHexColorCode,
    createSortedArraysForEachSplitArray,
    presentSortedArray,
    removeUnusableElementsFormTheArray
};
