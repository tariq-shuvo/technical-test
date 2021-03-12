const express = require('express');
const router = express.Router();

const {
    check,
    validationResult
} = require('express-validator/check');

const auth = require('../../../middleware/adminAuth');
const FoodMenu = require('../../../models/FoodMenu');


// @route POST api/menu
// @description Add new menu
// @access Private
router.post('/', [auth,
    [
        check('name', 'name is required').not().isEmpty(),
        check('price', 'price is required').not().isEmpty(),
        check('status', 'status is required').not().isEmpty()
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
            name,
            price,
            status
        } = req.body

        const addFoodMenu = new FoodMenu({
            name,
            price,
            status
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