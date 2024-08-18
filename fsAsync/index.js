const fs = require('fs');

// fs.writeFile('read.txt', "Today is awesome day",(err)=>{
//     console.log("Done");
// });


// fs.appendFile("read.txt",". Now i'm saying the day is awesome from fs.appendFile",(err)=>{
//     console.log(err);
// })


fs.readFile('read.txt','utf-8',(err,data)=>{
    console.log(data);
});


// we pass them a function as an argument – a callback –
// that gets called when that task completes.
// The callback has an argument that tells you whether
// the operation completed successfully.
// Now we need to say what to do when fs.writeFile
// has completed (even if it’s nothing), and start