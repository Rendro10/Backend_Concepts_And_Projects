const fs = require("fs");

const data = fs.readFileSync("read.txt", "utf-8");
console.log(data);

// fs.readFile("read.txt", "utf-8", (err, data) => {
//   console.log(data);
// });
console.log("after the data");


// synchronous is besically line by line execute if preivious query not resolved then it will not go to the next line like if is went to a restaurant and i ordered food and someone came after me and he also ordered food so retaurent will provide mw food first then will take his order and in Asynchronous restaurent can take multiple order at a time and serve them.