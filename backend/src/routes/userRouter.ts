const express = require('express');
const isLoggedIn = require('../middelwares/isLoggedIn.ts');

const checkRole = require('../middelwares/checkRole.ts');

const router = express.Router();
const {
  createUser, getRole, getUser, deleteUser, addRole, getUserJWT, updateUserImage, removeRole,
} = require('../controllers/userController.ts');

// users
router.put('/register', createUser);
router.post('/login', getUserJWT);
router.get('/:username', getUser);
router.put('/img', isLoggedIn, updateUserImage);

// admins
router.post('/role', isLoggedIn, checkRole(process.env.ADMIN_ROLE), getRole);
router.put('/role', isLoggedIn, checkRole(process.env.ADMIN_ROLE), addRole);
router.delete('/role', isLoggedIn, checkRole(process.env.ADMIN_ROLE), removeRole);
router.delete('/', isLoggedIn, checkRole(process.env.ADMIN_ROLE), deleteUser);

module.exports = router;
export {};
