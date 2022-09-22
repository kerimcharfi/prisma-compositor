const {execSync} = require("child_process");

// dir
execSync('node ../index.js input .local/schema.prisma')
// single file
execSync('node ../index.js input/test2.prisma .local/schema.prisma')
// multiple files
execSync('node ../index.js input/test.prisma input/test1.prisma .local/schema.prisma')