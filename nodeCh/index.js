// Challenge Time

//  1: Create a folder named it Thapa
//  2: Create a file in it named bio.txt and data into it.
//  3: Add more data into the file at the end of the existing data.
//  4: Read the data without getting the buffer data at first.
//  file encoding
//  5: Rename the file name to mybio.txt
//  6: now delete both the file and the folder

const fs = require('fs');


// to make folder :->
// fs.mkdirSync('Arka');



// write new data in a file if file exist already then all data will be replaced to this text
// fs.writeFileSync('Arka/bio.txt',"My name is Arka Mukherjee");



//if file exist so it will not replace data it will also add the data with the existing data.
// fs.appendFileSync('Arka/bio.txt',". My name is Arka Mukherjee and i am a CSE student");



// it will print buffer data basically it is decoded

// const data = fs.readFileSync('Arka/bio.txt');
// console.log(data);

//but if we add utf-8 then it will encode the data for me and print original string which has.
// const data = fs.readFileSync('Arka/bio.txt',"utf-8");
// console.log(data);



// rename the file
// fs.renameSync("Arka/bio.txt","Arka/MyBio.txt");


//Delete the text file using fs
// fs.unlinkSync("Arka/MyBio.txt");


// Deleting the folder:->
// fs.rmdirSync("Arka");

