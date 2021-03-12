const express = require('express');
const router = express.Router();

const {
    check,
    validationResult
} = require('express-validator/check');

const auth = require('../../../middleware/adminAuth');
const Order = require('../../../models/Order');

// @route GET api/order/list
// @description Get all the menus
// @access Private
router.get('/list', [auth], async (req, res) => {
    try {
        let condition = {}

        let order = await Order.find(condition).populate('user', ['name', 'phone', 'email']).populate('dishes.orderDish', ['name', 'price', '_id']).sort({
            "_id": -1
        })

        let totalMenuNumber = await Order.find(condition).countDocuments();

        res.status(200).json({
            data: order,
            count: totalMenuNumber
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// @route GET api/order/:productID
// @description Get single order
// @access Private
router.get('/single/:productID', [auth], async (req, res) => {

    try {
        let order = await Order.findById(req.params.productID).populate('user', ['name', 'phone', 'email']).populate('dishes.orderDish', ['name', 'price', '_id'])

        res.status(200).json({
            data: order
        });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).send({
                errors: [{
                    msg: 'Invalid order'
                }]
            })
        }
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router