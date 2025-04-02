const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Owner Reference
    name: { type: String, required:true},
    description: { type: String, required:true},
    price: { type: Number, required: true},
    status: { type: String, enum: ['draft','published'],default:'draft'},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MenuItem',MenuItemSchema);
