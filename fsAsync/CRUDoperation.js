// Challenge Time

//  1: Create a folder named it Arka
//  2: Create a file in it named bio.txt and data into it.
//  3: Add more data into the file at the end of the existing data.
//  4: Read the data without getting the buffer data at first.
//  file encoding
//  5: Rename the file name to mybio.txt
//  6: now delete both the file and the folder

const fs = require('fs');


// 1:

// fs.mkdir('Arka',()=>{
//     console.log("Folder Created Sucessfully!");
// });

// 2:

// fs.writeFile('Arka/bio.txt',"Hello I'm Arka Mukherjee and it was Created using Asynchronous file system",(err)=>{
//     console.log("Done Creattion of bio.txt");
// });

// 3:

// fs.appendFile('Arka/bio.txt',". Adding More data here with the help of append",(err)=>{
//     console.log("Adding more data");
// });


// 4:

// fs.readFile('./Arka/bio.txt','utf-8',(err,data)=>{
//     console.log("Your data is:->");
//     console.log(data);
// });

// 5:

// fs.rename('./Arka/bio.txt','./Arka/MyBio.txt',(err)=>{
//     console.log("File name Chamged");
// });

// 6:
fs.unlink("./Arka/MyBio.txt",(err)=>{
    console.log("File Deleted");
});