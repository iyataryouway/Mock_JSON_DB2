const express = require('express');
const userController = require('../controllers/userController');
const {readData} = require('../utils/file');
const router = express.Router();

//parse incoming json to native js object
router.use(express.json());

//takes url-encoded strings and decodes them for use
router.use(express.urlencoded({extended: true}));

//define a home route
router.get('/home', (req, res) =>{
    res.render('home');
});

//define a route that adds a user
router.post("/users", userController.createUser);

//define a route that updates a user
router.post("/users/:id/update", userController.updateUser);

//define a route to delete user
router.post("/users/:id/delete", userController.deleteUser);

//define a endpoint route exposing the data
router.get('/api/v1/users', async (req, res) =>{
    try{       
        const data = await readData();
        res.json(data);
    } catch(error){
        res.status(500).json(`Internal Server Error: ${error}`);
    }
});

//exports the router object 
module.exports = router;