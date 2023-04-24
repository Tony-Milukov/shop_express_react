const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const brandRouter = require('./brandRouter.ts');
const productRouter = require('./productRouter.ts');
const categoryRouter = require('./categoryRouter.ts');
const userRouter = require('./userRouter.ts');
const cartRouter = require('./cartRouter.ts');
const RoleRouter = require('./roleRouter.ts');
const checkRole = require('../middelwares/checkRole.ts');
const isLoggedIn = require('../middelwares/isLoggedIn.ts');

router.use(fileUpload({}));
router.use(bodyParser.json());

// allow static
router.use(express.static('static/avatars'));

router.use('/user', userRouter);
router.use('/brand', isLoggedIn, checkRole(3), brandRouter);
router.use('/products', productRouter);
router.use('/category', isLoggedIn, checkRole(3), categoryRouter);
router.use('/cart', isLoggedIn, cartRouter);
router.use('/role', isLoggedIn, checkRole(3), RoleRouter);

module.exports = router;
export {};
