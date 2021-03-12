const express = require('express');
const router = express.Router();

const {
    check,
    validationResult
} = require('express-validator');

const auth = require('../../../middleware/adminAuth');
const FoodMenu = require('../../../models/FoodMenu');

// @route GET api/menu/list/:pageNo
// @description Get all the menus
// @access Private
router.get('/list', [auth], async (req, res) => {
    try {
        let condition = {}

        let menu = await FoodMenu.find(condition).sort({
            "_id": -1
        })

        let totalMenuNumber = await FoodMenu.find(condition).countDocuments();

        res.status(200).json({
            data: menu,
            count: totalMenuNumber
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// @route GET api/menu/list/active
// @description Get all the menus
// @access Private
router.get('/list/active', async (req, res) => {
    try {
        let condition = {
            status: true
        }

        let menu = await FoodMenu.find(condition).sort({
            "_id": -1
        })

        let totalMenuNumber = await FoodMenu.find(condition).countDocuments();

        res.status(200).json({
            data: menu,
            count: totalMenuNumber
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// @route GET api/menu/:productID
// @description Get single menu
// @access Private
router.get('/single/:productID', async (req, res) => {

    try {
        let menu = await FoodMenu.findById(req.params.productID)

        res.status(200).json({
            data: menu
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