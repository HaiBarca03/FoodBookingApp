const foodModel = require('../models/foodModels')
const fs = require('fs')

const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try {
        await food.save()
        res.json({ success: true, massage: 'Food Added' })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Food add error' })
    }
}
// all list food
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Get list food error' })
    }
}

// remove item food
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        fs.unlink(`uploads/${food.image}`, () => { })

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

module.exports = {
    addFood,
    listFood,
    removeFood
}