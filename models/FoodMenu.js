const mongoose = require('mongoose');
const FoodMenuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        require: true
    },
    status:{
        type: Boolean,
        default: false
    },
    create: {
        type: Date,
        default: Date.now
    },
    update:{
        type: Date,
        default: Date.now
    }
});

module.exports = FoodMenu = mongoose.model('food_menu', FoodMenuSchema)