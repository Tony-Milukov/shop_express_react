const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const brandRouter = require('./brandRouter.ts');
const productRouter = require('./productRouter.ts');
const categoryRouter = require('./categoryRouter.ts');
const userRouter = require('./userRouter.ts');
const basketRouter = require('./basketRouter.ts');
const roleRouter = require('./roleRouter.ts');
const ratingRouter = require('./ratingRouter.ts');
const orderRouter = require('./orderRouter.ts');

const checkRole = require('../middelwares/checkRole.ts');
const isLoggedIn = require('../middelwares/isLoggedIn.ts');

router.use(fileUpload({}));
router.use(bodyParser.json());

router.use('/user', userRouter);
router.use('/brand', brandRouter);
router.use('/products', productRouter);
router.use('/category', categoryRouter);
router.use('/basket', isLoggedIn, basketRouter);
router.use('/rating', isLoggedIn, ratingRouter);
router.use('/order', isLoggedIn, orderRouter);

// admin
router.use('/role', isLoggedIn, checkRole(process.env.ADMIN_ROLE), roleRouter);

module.exports = router;
export {};
