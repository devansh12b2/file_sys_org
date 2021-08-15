#!/usr/bin/env node

let input = process.argv.slice(2);
let fs = require("fs");
let path = require("path");
let helpObj = require("./commands/help");
let treeObj = require("./commands/tree");
let orgObj = require("./commands/organize");
console.log(input);
//node main.js tree "directoryPath"
//node main.js organize 'directoryPath'
//node main.js help

//to anaalysze the fucntion performned
let types = {
    media: ["mp4", "mkv"],
    archives: ["zip", "rar", "iso", "7z", "tar", "gz", "xy", "ar"],
    documents: [
        "doc",
        "docx",
        "xls",
        "xlsx",
        "pdf",
        "odf",
        "odt",
        "odp",
        "odg",
        "ods",
        "txt",
        "ps",
        "tex",
    ],
    app: ["exe", "dmg", "pkg", "deb"],
};
let command = input[0];
switch (command) {
    case "tree":
        treeObj.treeKey(input[1]);
        break;
    case "organize":
        orgObj.organizeKey(input[1]);
        break;
    case "help":
        helpObj.helpKey();
        break;
    default:
        console.log("Please! Input the valid command");
}