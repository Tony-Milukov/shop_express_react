const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');
const brandRouter = require('./brandRouter.ts');
const productRouter = require('./productRouter.ts');
const typeRouter = require('./typeRouter.ts');
const userRouter = require('./userRouter.ts');
const cartRouter = require('./cartRouter.ts');
const RoleRouter = require('./roleRouter.ts');
const checkRole = require('../middelwares/checkRole.ts');
const isLoggedIn = require('../middelwares/isLoggedIn.ts');

router.use(bodyParser.json());

router.use('/user', isLoggedIn, userRouter);
router.use('/brand', isLoggedIn, checkRole(3), brandRouter);
router.use('/products', productRouter);
router.use('/type', isLoggedIn, checkRole(3), typeRouter);
router.use('/cart', isLoggedIn, cartRouter);
router.use('/role', isLoggedIn, checkRole(3), RoleRouter);

module.exports = router;
export {};
