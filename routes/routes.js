const express = require('express');
const Model = require('../models/model');
const router = express.Router()

module.exports = router;

// Used this source to create the basis of the web
// application: 
// https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/

//Post Method
router.post('/post', async (req, res) => {
    const data = new Model({
        // name and age are the fields in the model
        name: req.body.name,
        age: req.body.age
    })

    try {
        // Save the data to the database
        const dataToSave = await data.save();
        // Send the data to the client in JSON format
        res.status(200).json(dataToSave)
    }
    catch (error) {
        // Send the error message to the client
        res.status(400).json({ message: error.message })
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try {
        // Find all the data in the database
        const data = await Model.find();
        // Send the data to the client in JSON format
        res.json(data)
    }
    catch (error) {
        // Send the error message to the client
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try {
        // Find the data by ID in the database
        const data = await Model.findById(req.params.id);
        // Send the data to the client in JSON format
        res.json(data)
    }
    catch (error) {
        // Send the error message to the client
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        // Find the data by ID in the database
        const id = req.params.id;
        // Update the data in the database
        const updatedData = req.body;
        const options = { new: true };
        // Send the updated data to the client in JSON format
        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})