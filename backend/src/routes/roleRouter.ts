const express = require('express');
const {
  addRole, getAllRoles, deleteRole, getRole,
} = require('../controllers/roleController.ts');

const router = express.Router();
router.put('/', addRole);
router.post('/all', getAllRoles);
router.delete('/:roleId', deleteRole);
router.post('/', getRole);
module.exports = router;
export {};
