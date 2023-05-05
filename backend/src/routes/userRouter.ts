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
} = require('../controllers/userController.ts');

// users
router.put('/register', createUser);
router.post('/login', getUserJWT);
router.post('/account', getProfile);
router.get('/:username', getUser);
router.put('/img', isLoggedIn, updateUserImage);
router.delete('/', isLoggedIn, deleteUser);

// admins
router.post('/role', isLoggedIn, checkRole(process.env.ADMIN_ROLE), getRole);
router.put('/role', isLoggedIn, checkRole(process.env.ADMIN_ROLE), addRole);
router.delete('/role', isLoggedIn, checkRole(process.env.ADMIN_ROLE), removeRole);

module.exports = router;
export {};
