#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const [inputPath, outputFile] = process.argv.slice(2);

let fileContent = ""
fs.readdirSync(inputPath).forEach(fileName => {
    if (fileName.search(".prisma") !== -1){
        fileContent += fs.readFileSync(path.join(inputPath, fileName), "utf-8") + "\n"

    }
});

let fragments = fileContent.matchAll(/fragment +(\S*?) *{([\s\S]*?)}\n?/g)

for (let fragment of fragments){
    fileContent = fileContent.replaceAll(fragment[0], "")
    fileContent = fileContent.replaceAll("..." + fragment[1], fragment[2])
}

fs.writeFileSync(outputFile, fileContent)