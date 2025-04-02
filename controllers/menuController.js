const MenuItem = require('../models/MenuItem');

// Add New Menu Item (Owner Only)
const addMenuItem = async (req, res) => {
    try {
        // if (req.user.role !== 'owner') {
        //     return res.status(403).json({ message: 'Access denied. Only owners can add menu items.' });
        // }

        const { name, description, price } = req.body;

        if (!name || !description || !price) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newItem = new MenuItem({
            
            name,
            description,
            price
        });

        await newItem.save();
        res.status(201).json({ message: 'Menu item added successfully!' });
    } catch (error) {
        console.error("Error adding menu item:", error)
        res.status(500).json({ message: 'Server error.' });
    }
};

// Edit Menu Item
 const editMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, status } = req.body;

        const menuItem = await MenuItem.findOne({ _id: id, ownerId: req.user.userId });

        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found.' });
        }

        if (name) menuItem.name = name;
        if (description) menuItem.description = description;
        if (price) menuItem.price = price;
        if (status) menuItem.status = status;

        await menuItem.save();
        res.status(200).json({ message: 'Menu item updated successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};

// Delete Menu Item
const deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;

        const menuItem = await MenuItem.findOneAndDelete({ _id: id, ownerId: req.user.userId });

        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found or you are not authorized to delete it.' });
        }

        res.status(200).json({ message: 'Menu item deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};

// Public: Get Published Menu Items (for Customers)
const getPublishedMenuItems = async (req, res) => {
    try {
      const items = await MenuItem.find({ status: 'published' });
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: 'Server error.' });
    }
};
  
module.exports = {
    addMenuItem,
    editMenuItem,
    deleteMenuItem,
    getPublishedMenuItems, 
  };
  