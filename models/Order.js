const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
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
    status:{
        type: Boolean,
        default: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Order = mongoose.model('order', OrderSchema)