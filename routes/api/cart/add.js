const express = require('express');
const router = express.Router();

const {
    check,
    validationResult
} = require('express-validator/check');

const auth = require('../../../middleware/auth');
const FoodMenu = require('../../../models/FoodMenu');


// @route POST api/cart
// @description Add new cart
// @access Private
router.post('/', [auth,
    [
        check('dishes', 'dishes is required').not().isEmpty(),
        check('price', 'price is required').not().isEmpty()
    ]
], async (req, res) => {
    try {

        const error = validationResult(req)

        if (!error.isEmpty()) {
            return res.status(400).json({
                errors: error.array()
            })
        }

        if (dishes.length > 0) {
            return res.status(400).send({
              errors: [
                {
                  msg: 'User already exists'
                }
              ]
            })
        }

        const {
            name,
            price
        } = req.body

        const addFoodMenu = new FoodMenu({
            name,
            price
        })

        await addFoodMenu.save()
        res.status(200).json({
            msg: 'New food dish added successfully',
            data: addFoodMenu
        })
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router