const express = require('express');
const router = express.Router();

const {
    check,
    validationResult
} = require('express-validator/check');

const auth = require('../../../middleware/auth');
const Order = require('../../../models/Order');
const FoodMenu = require('../../../models/FoodMenu');


// @route POST api/order
// @description Add new order
// @access Private
router.post('/', [auth,
    [
        check('dishes', 'dishes is required').not().isEmpty()
    ]
], async (req, res) => {
    try {

        const error = validationResult(req)

        if (!error.isEmpty()) {
            return res.status(400).json({
                errors: error.array()
            })
        }

        const {
            dishes
        } = req.body
        
        if (dishes.length == 0) {
            return res.status(400).send({
              errors: [
                {
                  msg: 'dishes should more than one'
                }
              ]
            })
        }

        let total = 0

        let dishTotalPrice = dishes.map(async dishInfo=>{
            let MenuInfo = await FoodMenu.findById(dishInfo.orderDish)
            total += dishInfo.quantity* MenuInfo.price
        })

        await Promise.all(dishTotalPrice)


        const addOrder = new Order({
            user: req.user.id,
            dishes,
            total
        })

        await addOrder.save()

        res.status(200).json({
            msg: 'New food dish added successfully',
            data: addOrder
        })
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router