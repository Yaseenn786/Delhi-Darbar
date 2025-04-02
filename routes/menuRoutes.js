const express = require('express'); 
const router = express.Router();
const { addMenuItem, editMenuItem, deleteMenuItem, getPublishedMenuItems } = require('../controllers/menuController');
//const verifyToken = require('../middleware/authMiddleware');

// Add Menu Item (Owner Only)
router.post('/add', addMenuItem);

// Edit Menu Item (Owner Only)
router.put('/edit/:id', editMenuItem);

// Delete Menu Item (Owner Only)
router.delete('/delete/:id', deleteMenuItem);

router.get('/published',  getPublishedMenuItems);


module.exports = router;
