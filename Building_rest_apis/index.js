const express = require("express");
const users = require("./userData.json");
const fs = require("fs");

const app = express();

//section of middlewares
// middleware of url encoded
app.use(express.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   console.log("Hello");
//   next();
// });

// make apis here

// first api :- GET all users list
app.get("/api/users", (req, res) => {
  res.json(users);
  // console.log("Length of the userData is -> ",users.length)
  
});

// we can do get user,patch user and delete user with id differently also i can do together...so here is how can i do together
app
  .route("/api/users/:userId")
  .get((req, res) => {
    const userId = Number(req.params.userId);
    const user = users.find((user) => user.id === userId);
    if(user){
      return res.json(user);
    }
    else{
      console.log("User not found!");
      return res.status(404).end("<h1>404</h1>\n"+"<h1>User not found!! &#128546</h1>");
    }
  })
  .patch((req, res) => {
    // TODO
    return res.json({ status: "Pending the patch operation" });
  })
  .delete((req, res) => {
    // Fetch the user id to delete from the request parameters
    const userId = Number(req.params.userId);

    // Read the existing user data from the file
    fs.readFile('./userData.json', (err, data) => {
        if (err) {
            console.log("Something went wrong while reading the file!!", err);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }

        try {
            // Parse the JSON data
            const userData = JSON.parse(data);

            // Find the index of the user with the given ID
            const indexToDelete = userData.findIndex(user => user.id === userId);

            if (indexToDelete !== -1) {
                // Remove the user from the array
                userData.splice(indexToDelete, 1);

                // Write the updated data back to the file
                fs.writeFile('./userData.json', JSON.stringify(userData, null, 2), 'utf8', (err) => {
                    if (err) {
                        console.log("Error writing file", err);
                        res.status(500).json({ error: "Internal Server Error" });
                    } else {
                        console.log("User deleted Successfully!!");
                        res.json({ status: "User deleted Successfully!!" });
                    }
                });
            } else {
                console.log("User not found");
                res.status(404).json({ error: "User not found" });
            }
        } catch (error) {
            console.log("Error parsing the JSON data", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  // console.log(body);
  const lastUserId = users[users.length-1].id;
  // console.log("last user id is: ",lastUserId);
  users.push({ ...body, id: lastUserId + 1 });

  fs.writeFile("./userData.json", JSON.stringify(users), (err, data) => {
    return res.json({
      status: "user succesfully registered!",
      id: lastUserId + 1,
    });
  });
});

// server listening
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`server is running on PORT: ${PORT}`);
});
















// app.get('/users', (req, res) => {
//     const html = `
//         <ul>
//             ${users.map((user) => {
//                 return `<li>${user.first_name}</li>`;
//             }).join('')}
//         </ul>
//     `;
//     res.send(html);
// });

// if we want to make different apis for different operation then will make like this...

// 2nd api:- GET user with id number(dynamic path parameter)

// app.get('/api/users/:userId',(req,res)=>{
//     const userId = Number(req.params.userId);
//     const user = users.find((user)=>user.id===userId);
//     return res.json(user);
// })

// POST request to create new user

// app.post("/api/users",(req,res)=>{
//     // create user :-> TODO
//     return res.json({status:"Pending"})
// })

// PATCH request to edit user with id 1 (PATCH/api/user/id)

// app.patch("/api/users/:userId",(req,res)=>{
//     // TODO:-> edit user with ID
// })

// DELETE request to delete the user with id 1 (DELETE/api/user/id)

// app.delete("/api/users/:userId",(req,res)=>{
//     //TODO:-> Delete the user of the given ID
// })
