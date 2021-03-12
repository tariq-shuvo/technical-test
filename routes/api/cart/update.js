const express = require('express');
const router = express.Router();

const {
    check,
    validationResult
} = require('express-validator/check');

const auth = require('../../../middleware/adminAuth');
const FoodMenu = require('../../../models/FoodMenu');


// @route PUT api/menu
// @description Update menu
// @access Private
router.put('/', [auth,
    [
        check('menuID', 'menu id is required').not().isEmpty(),
        check('name', 'name is required').not().isEmpty(),
        check('price', 'price is required').not().isEmpty(),
        check('status', 'active status is required').not().isEmpty()
    ]
], async (req, res) => {
    const error = validationResult(req)

    if (!error.isEmpty()) {
        return res.status(400).json({
            errors: error.array()
        })
    }

    try {
        const {
            menuID,
            name,
            price,
            status
        } = req.body
        
        let foodMenu = await FoodMenu.findById(menuID)

        foodMenu.name = name
        foodMenu.price = price
        foodMenu.status = status

        foodMenu.update = Date.now()

        await foodMenu.save()

        res.status(200).json({
            msg: 'menu information updated successfully',
            data: foodMenu
        });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).send({
                errors: [{
                    msg: 'Invalid menu'
                }]
            })
        }
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router