const fs = require('fs').promises;
const filePath = './database.json';
const {readData, writeData} = require('../utils/file');

//function to create user
async function createUser(req, res){
    try {
       
      //read file contents  
      const data = await readData();
      //check length on users object and minus 1 
      const lastUser = data.users[data.users.length - 1];
      //check if lastUser exists.  If not, default to 1
      const nextId = lastUser ? lastUser.id + 1 : 1;

      //create a new user object to save in database.json
      const newUser = {
        id: nextId,
        username: req.body.username,
        first_name: req.body.first_name,
        email: req.body.email,
      }

      //push adds to users object
      data.users.push(newUser);

      //writes the changes to the file
      await writeData(data);

      res.status(200).json('User added successfully!');

    } catch (error) {

      res.status(500).json('Internal Server Error.');
      console.log(error);
    }
} 

//function to edit user
async function updateUser(req, res){
    try {
         console.log(req.params.id);
        //fetch the data from database.json
        const data = await readData();
        //function to find user by id
        const user = data.users.find(user => user.id === parseInt(req.params.id));

        //check if user exists.  Then, update fields accordingly.
        if(user){

          //update fields from the form
          user.username = req.body.new_username || user.username;
          user.first_name = req.body.new_first_name || user.first_name;
          user.email = req.body.new_email || user.email;

          //writing the changes to database.json
          await writeData(data);

          //refresh the page
          res.redirect('/home');
        } else {
          res.status(404).json('User not found.  Please try again');
        }

    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
} 

//function to delete user
async function deleteUser(req, res){
    try {
         //fetch the data from database.json
         const data = await readData();
         //function to find user by id
         const user = data.users.find(user => user.id === parseInt(req.params.id));

         if(user){
          //splice (start, itemCount to delete)
           data.users.splice(user, 1);
           await writeData(data);

           res.status(200).json("User successfully deleted");

         } else {
          res.status(404).json('User not found.');
         }
         
    } catch (error) {
      res.status(500).json('Internal Server Error');
    }
} 


module.exports = {
    createUser,
    updateUser,
    deleteUser,
}