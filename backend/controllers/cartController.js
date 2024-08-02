const userModel = require('../models/userModels')

// add item to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        if (!userData) {
            return res.json({ success: false, message: 'User not found' });
        }
        let cartData = await userData.cartData
        if (!cartData[req.body.itemID]) {
            cartData[req.body.itemID] = 1
        } else {
            cartData[req.body.itemID] += 1
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData })
        res.json({ success: true, message: 'Added To cart' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Error' })
    }
}

// remove to cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        if (!userData) {
            return res.json({ success: false, message: 'User not found' });
        }
        let cartData = await userData.cartData
        if (cartData[req.body.itemID] > 0) {
            cartData[req.body.itemID] -= 1
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData })
        res.json({ success: true, message: 'Removed To cart' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Error' })
    }
}

// fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        if (!userData) {
            return res.json({ success: false, message: 'User not found' });
        }
        let cartData = await userData.cartData
        res.json({
            success: true,
            cartData
        })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Error' })
    }
}

module.exports = {
    addToCart,
    removeFromCart,
    getCart
}