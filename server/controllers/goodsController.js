const asyncHandler = require('express-async-handler')

const Goods = require('../models/goodsModel')
const User = require('../models/userModel')

const getGoods = asyncHandler( async (req, res) => {
    const goods = await Goods.find({user: req.user.id})

    res.status(200).json(goods)
})

const postGood = asyncHandler( async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add Name!')
    }

    const goods = await Goods.create({
        text: req.body.text,
        user: req.user.id,
    })

    res.status(200).json(goods)
})

const putGood = asyncHandler( async (req, res) => {

    const goods = await Goods.findById(req.params.id)

    if(!goods) {
        res.status(400)
        throw new Error('Goods not fuond')
    }

    if(!req.user) {
        res.status(401)
        throw new Error("User not found")
    }

    if(global.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User not auth")
    }

    const updateGoods = await Goods.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    }) 

    res.status(200).json(updateGoods)
})

const deleteGood = asyncHandler( async (req, res) => {

    const goods = await Goods.findById(req.params.id)

    if(!goods) {
        throw new Error('Nem található')
    }

    if(!req.user) {
        res.status(401)
        throw new Error("User not found")
    }

    if(goods.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User not auth")
    }

    await goods.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getGoods,
    postGood,
    putGood,
    deleteGood
}