const express = require('express');
const { addRole, getAllRoles, deleteRole } = require('../controllers/roleController.ts');

const router = express.Router();
router.put('/', addRole);
router.post('/', getAllRoles);
router.delete('/', deleteRole);

module.exports = router;
export {};
