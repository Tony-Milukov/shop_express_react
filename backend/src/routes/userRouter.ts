const express = require('express');
const checkRole = require('../middelwares/checkRole.ts');

const router = express.Router();
const {
  createUser, getRole, getUser, deleteUser, addRole, getUserJWT,
} = require('../controllers/userController.ts');

router.put('/register', createUser);
router.post('/login', getUserJWT);
router.get('/:username', getUser);
router.post('/role', checkRole(3), getRole);
router.put('/role', checkRole(3), addRole);
router.delete('/', checkRole(3), deleteUser);

module.exports = router;
export {};
