const express = require('express');

const router = express.Router();
const {
  createUser, getRole, getUser, deleteUser, addRole,
} = require('../controllers/userController.ts');

router.put('/register', createUser);
router.get('/:username', getUser);
router.post('/role', getRole);
router.put('/role', addRole);
router.delete('/', deleteUser);
module.exports = router;
export {};
