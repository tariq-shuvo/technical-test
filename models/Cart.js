const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    total:{
        type: Number,
        required: true
    },
    dishes:[
        {
            orderDish: {
                type: Schema.Types.ObjectId,
                ref: 'food_menu'
            },
            quantity:{
                type: Number,
                default: 1
            }  
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Cart = mongoose.model('cart', CartSchema)