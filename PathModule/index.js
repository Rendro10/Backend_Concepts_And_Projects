const path = require("path");

console.log(path.dirname("E:/nodejsYoutube/PathModule/index.js"));
console.log(path.extname("E:/nodejsYoutube/PathModule/index.js"));
console.log(path.basename("E:/nodejsYoutube/PathModule/index.js"));

const mypath = path.parse("E:/nodejsYoutube/PathModule/index.js");
// it will return the path
console.log(mypath.name);
//it will return root name
console.log(mypath.root);