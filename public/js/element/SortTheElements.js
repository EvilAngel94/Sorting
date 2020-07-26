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
    let arrayOfSplitMarkUpElements = fileToBeSorted.replace(/ /g, ' ').split(/[{}]/)
    let sortedArray = new Array(arrayOfSplitMarkUpElements.length)

    /*
    We're going to loop over the split elements of the CSS file.
    However, we only take the actual content so not the <b>body, button, select<b> elements.
    Therefore we're checking for the uneven elements of the array, and then we do a sort.
     */
    for (let i = 0; i < arrayOfSplitMarkUpElements.length; i++) {
        let splitElement = arrayOfSplitMarkUpElements[i].trim().split(/\n/)
        if (i % 2 === 1) {
            splitElement = splitElement.sort();
        }
        sortedArray.push(splitElement)
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

export {createSortedArraysForEachSplitArray}