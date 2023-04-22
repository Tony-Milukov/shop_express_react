const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');
const brandRouter = require('./brandRouter');
const productRouter = require('./productRouter');
const typeRouter = require('./typeRouter');
const userRouter = require('./userRouter');
const cartRouter = require('./cartRouter');
const RoleRouter = require('./roleRouter');

router.use(bodyParser.json());

router.use('/user', userRouter);
router.use('/brand', brandRouter);
router.use('/product', productRouter);
router.use('/type', typeRouter);
router.use('/cart', cartRouter);
router.use('/role', RoleRouter);

module.exports = router;
export {};
