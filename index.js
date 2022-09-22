#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const inputElements = process.argv.slice(2, -1);
const [outputFilePath] = process.argv.slice(-1);

let fileContent = ""

function isDir(path) {
    try {
        var stat = fs.lstatSync(path);
        return stat.isDirectory();
    } catch (e) {
        // lstatSync throws an error if path doesn't exist
        return false;
    }
}

const inputFiles = [];

for(let inputPath of inputElements){
    if(isDir(inputPath)){
        let paths = [];
        for(let fileName of fs.readdirSync(inputPath)){
            paths.push(path.join(inputPath, fileName))
        }
        inputFiles.push(...paths)
    } else {
        inputFiles.push(inputPath)
    }
}

inputFiles.forEach(filePath => {
    if (filePath.search(".prisma") !== -1){
        fileContent += fs.readFileSync(filePath, "utf-8") + "\n"
    }
});

let fragments = fileContent.matchAll(/fragment +(\S*?) *{([\s\S]*?)}\n?/g)

for (let fragment of fragments){
    fileContent = fileContent.replaceAll(fragment[0], "")
    fileContent = fileContent.replaceAll("..." + fragment[1], fragment[2])
}

fs.writeFileSync(outputFilePath, fileContent)