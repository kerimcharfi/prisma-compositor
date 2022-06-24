const fs = require('fs');
const path = require('path')

let fileContent = ""
fs.readdirSync("./test").forEach(fileName => {
    if (fileName.search(".prisma") !== -1){
        fileContent += fs.readFileSync(path.join("./test", fileName), "utf-8")
    }
});

let fragments = fileContent.matchAll(/fragment +(\S*?) *{([\s\S]*?)}\n?/g)

for (let fragment of fragments){
    fileContent = fileContent.replace(fragment[0], "")
    fileContent = fileContent.replace("..." + fragment[1], fragment[2])
}

fs.writeFileSync( "__generated/schema.prisma", fileContent)