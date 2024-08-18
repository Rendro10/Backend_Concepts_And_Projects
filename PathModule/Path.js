const path = require("path");

console.log(path.dirname("E:/nodejsYoutube/PathModule/path.js"));
console.log(path.extname("E:/nodejsYoutube/PathModule/path.js"));
console.log(path.basename("E:/nodejsYoutube/PathModule/path.js"));

// below line give all info in a single line which is giving avobe 3 lines
const myPath = path.parse("E:/nodejsYoutube/PathModule/path.js");
console.log(myPath.root);