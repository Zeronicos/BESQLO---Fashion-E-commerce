const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
    },
    size: {
        type: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        required: true,
    },
    available: {
        type: Boolean,
        default: true,
    },
});

productSchema.index({ name: 'text', description: 'text' });
//WildCard index
//productSchema.index({"$**":text});

module.exports = mongoose.model('Product', productSchema);