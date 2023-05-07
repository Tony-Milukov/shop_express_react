const express = require('express');
const isLoggedIn = require('../middelwares/isLoggedIn.ts');

const checkRole = require('../middelwares/checkRole.ts');

const router = express.Router();
const {
  createUser,
  getRole,
  getUser,
  deleteUser,
  addRole,
  getUserJWT,
  updateUserImage,
  removeRole,
  getProfile,
  getAllUsers,
} = require('../controllers/userController.ts');

// users
router.put('/register', createUser);
router.post('/login', getUserJWT);
router.post('/account', getProfile);
router.put('/img', isLoggedIn, updateUserImage);
router.delete('/:userId?', isLoggedIn, deleteUser);
router.get('/:username', getUser);

// admins
router.post('/role', isLoggedIn, checkRole(process.env.ADMIN_ROLE), getRole);
router.put('/role', isLoggedIn, checkRole(process.env.ADMIN_ROLE), addRole);
router.delete('/role', isLoggedIn, checkRole(process.env.ADMIN_ROLE), removeRole);
router.post('/all', isLoggedIn, checkRole(process.env.ADMIN_ROLE), getAllUsers);

module.exports = router;
export {};
