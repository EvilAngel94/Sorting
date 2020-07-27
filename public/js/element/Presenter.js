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
        if (typeof sortedMarkupElement === 'undefined') {
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

export {presentSortedArray, checkIfArrayEntryContainsHexColorCode, checkIfSearchedWordIsACssKeyWord}