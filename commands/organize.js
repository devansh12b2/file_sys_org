//organize function
let fs = require("fs");
let path = require("path");

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

function organizeFunc(dirPath) {
    // console.log(`organize command impelemnted for ${dirPath}`);
    //1 input-> directory's path
    let destpath;
    if (dirPath === undefined) {
        // console.log(`Kindely enter the directory path.`);
        dirPath = process.cwd();
        destpath = path.join(dirPath, "organized_files");
        if (!fs.existsSync(destpath)) fs.mkdirSync(destpath);
    } else {
        let doesexist = fs.existsSync(dirPath);
        if (doesexist) {
            //2 implement-> organized files-> directory
            destpath = path.join(dirPath, "organized_files");
            if (!fs.existsSync(destpath)) fs.mkdirSync(destpath);
        } else {
            console.log(`Kindely enter the directory path.`);
            return;
        }
    }

    organizefile(dirPath, destpath);
}

function organizefile(src, dest) {
    //3 identify categories of all the files in the directory
    let file_name = fs.readdirSync(src);
    let file_add;
    for (let i in file_name) {
        file_add = path.join(src, file_name[i]);
        if (fs.lstatSync(file_add).isFile()) {
            // 4.copy/cut files to the organized directories path
            let catg = getCategory(file_name[i]);
            sendFile(file_add, dest, catg);
        }
    }
}

function sendFile(src, dest, catg) {
    let CategPath = path.join(dest, catg);
    if (!fs.existsSync(CategPath)) {
        fs.mkdirSync(CategPath);
    }
    let fileName = path.basename(src);
    let destPath = path.join(CategPath, fileName);
    fs.copyFileSync(src, destPath);
    fs.unlinkSync(src);
    console.log(fileName);
}

function getCategory(name) {
    let ext = path.extname(name);
    ext = ext.slice(1);
    for (let type in types) {
        let current = types[type];
        for (let i = 0; i < current.length; i++) {
            if (ext == current[i]) {
                return type;
            }
        }
    }
    return "others";
}
module.exports = {
    organizeKey: organizeFunc,
};