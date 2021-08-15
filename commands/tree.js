let fs = require("fs");
let path = require("path");

function treeFunc(dirPath) {
    // console.log(`tree command impelemnted for ${dirPath}`);
    if (dirPath === undefined) {
        // console.log(`Kindely enter the directory path.`);
        treeHelper(process.cwd(), "");
        return;
    } else {
        let doesexist = fs.existsSync(dirPath);
        if (doesexist) {
            treeHelper(dirPath, "");
        } else {
            console.log(`Kindely enter the directory path.`);
            return;
        }
    }
}

function treeHelper(dirPath, indent) {
    //file or folder
    let isFile = fs.lstatSync(dirPath).isFile();
    if (isFile) {
        let fileName = path.basename(dirPath);
        console.log(indent + "├──" + fileName);
    } else {
        let dirName = path.basename(dirPath);
        console.log(indent + "└──" + dirName);
        let child = fs.readdirSync(dirPath);
        for (let i = 0; i < child.length; i++) {
            let childPath = path.join(dirPath, child[i]);
            treeHelper(childPath, indent + "\t");
        }
    }
}
module.exports = {
    treeKey: treeFunc,
};