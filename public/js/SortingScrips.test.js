import {
    checkIfArrayEntryContainsHexColorCode,
    checkIfSearchedWordIsACssKeyWord,
    createSortedArraysForEachSplitArray,
    presentSortedArray
} from "./SortingScript.js";

///////////////////////////////////////
//  checkIfSearchedWordIsACssKeyWord //
///////////////////////////////////////
test("html is valid htmlKeyword", () => {
    let result = checkIfSearchedWordIsACssKeyWord("html");
    expect(result).toBe(true);
});

test("body is valid htmlKeyword", () => {
    let result = checkIfSearchedWordIsACssKeyWord("body");
    expect(result).toBe(true);
});

test("img is valid htmlKeyword", () => {
    let result = checkIfSearchedWordIsACssKeyWord("img");
    expect(result).toBe(true);
});

test("iframe is valid htmlKeyword", () => {
    let result = checkIfSearchedWordIsACssKeyWord("iframe");
    expect(result).toBe(true);
});

test("Invalid htmlKeyword", () => {
    let result = checkIfSearchedWordIsACssKeyWord("NotKnown");
    expect(result).toBe(false);
});

test("* is a valid cssKeyword ", () => {
    let result = checkIfSearchedWordIsACssKeyWord("*");
    expect(result).toBe(true);
});

////////////////////////////////////////////
//  checkIfArrayEntryContainsHexColorCode //
////////////////////////////////////////////
test("String is an Hex color code", () => {
    let result = checkIfArrayEntryContainsHexColorCode(["color: #e5eaf5;", "font-size: 10vw;"]);
    expect(result).toBe(true);
});

test("String is an invalid Hex color code", () => {
    let result = checkIfSearchedWordIsACssKeyWord(["color: e5eaf5;", "font-size: 10vw;"]);
    expect(result).toBe(false);
});

//////////////////////////////////////////
//  createSortedArraysForEachSplitArray //
//////////////////////////////////////////
test("Create sorted arrays", () => {
    let fileExample = "body {\n" +
        "  background: black;\n" +
        "  font-family: 'Alatsi', sans-serif;\n" +
        "  margin: 0;\n" +
        "  overflow: hidden;\n" +
        "}\n" +
        "\n" +
        "canvas {\n" +
        "  width: 100%;\n" +
        "}\n" +
        "\n" +
        ".container {\n" +
        "  display: flex;\n" +
        "  height: 100vh;\n" +
        "  left: 0;\n" +
        "  position: fixed;\n" +
        "  top: 0;\n" +
        "  width: 100vw;\n" +
        "}";
    let result = createSortedArraysForEachSplitArray(fileExample);
    expect(result.length).toBe(6);
    expect(result[0]).toContain("body");
    expect(result[1]).toContain("  background: black;");
    expect(result[2]).toContain("canvas");
    expect(result[3]).toContain("  width: 100%;");
    expect(result[4]).toContain(".container");
    expect(result[5]).toContain("  display: flex;");
});

/////////////////////////
//  presentSortedArray //
/////////////////////////
test("Present a sorted array", () => {
    let sortedArray = [["body"], ["  background: black;", "  font-family: 'Alatsi', sans-serif;", "  margin: 0;", "  overflow: hidden;"], [".container"], ["  display: flex;", "  height: 100vh;", "  left: 0;", "  position: fixed;", "  top: 0;", "  width: 100vw;"]];
    let result = presentSortedArray(sortedArray);
    expect(result).toEqual("body {\n" +
        "  background: black;\n" +
        "  font-family: 'Alatsi', sans-serif;\n" +
        "  margin: 0;\n" +
        "  overflow: hidden;\n" +
        "}\n" +
        "\n" +
        ".container {\n" +
        "  display: flex;\n" +
        "  height: 100vh;\n" +
        "  left: 0;\n" +
        "  position: fixed;\n" +
        "  top: 0;\n" +
        "  width: 100vw;\n" +
        "}\n\n"
    );
});