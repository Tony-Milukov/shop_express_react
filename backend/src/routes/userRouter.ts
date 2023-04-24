const express = require('express');
const isLoggedIn = require('../middelwares/isLoggedIn.ts');

const checkRole = require('../middelwares/checkRole.ts');

const router = express.Router();
const {
  createUser, getRole, getUser, deleteUser, addRole, getUserJWT, updateUserImage,
} = require('../controllers/userController.ts');

router.put('/register', createUser);
router.post('/login', getUserJWT);
router.get('/:username', getUser);
router.put('/img', isLoggedIn, updateUserImage);

// admin rights
router.post('/role', isLoggedIn, checkRole(3), getRole);
router.put('/role', isLoggedIn, checkRole(3), addRole);
router.delete('/', isLoggedIn, checkRole(3), deleteUser);

module.exports = router;
export {};
