import { or } from 'sequelize';

require('dotenv').config();

const validateBody = require('./Validations/BodyValidations.ts');
const apiError = require('../middelwares/apiError.ts');
const { checkIsObject, checkIsArray } = require('../Service/productService.ts');
const { getProductByIdService } = require('../Service/productService.ts');
const { getUserByToken } = require('../Service/userService.ts');

const { Order, Status } = require('../models/Order.ts');
const { Product } = require('../models/Product.ts');
const {
  createCustomStatusService, deleteCustomStatusService, getCustomStatusService, updateCustomStatusService, createOrderService,
} = require('../Service/orderService.ts');

const createOrder = async (req:any, res:any) => {
  try {
    const user = await getUserByToken(req, res);
    const adress = validateBody(req, res, 'adress');
    const products = validateBody(req, res, 'products');
    checkIsArray(products, 'products');
    checkIsObject(adress, 'adress');
    // check do all the product exist
    for (const product of products) {
      await getProductByIdService(product);
    }
    const order = await createOrderService(user.id, adress);

    for (const productId of products) {
      const product = await getProductByIdService(productId);
      await order.addProduct(product);
    }

    // just to remove TS Error TS2345: Argument of type 'string | undefined' is not assignable to parameter of type 'string'
    if (process.env.DEFAULT_ORDER_STATUS) {
      const status = await getCustomStatusService(parseFloat(process.env.DEFAULT_ORDER_STATUS));
      await order.addStatus(status);
    }

    return res.status(200).json({ message: 'Order was created', orderNo: order.id });
  } catch (e:any) {
    console.log(e);
    apiError(res, e.errorMSG, e.status);
  }
};
const getCustomStatus = async (req:any, res:any) => {
  try {

  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const updateCustomStatus = async (req:any, res:any) => {
  try {
    const name = validateBody(req, res, 'name');
    const { statusId } = req.body;
    if (statusId) {
      await updateCustomStatusService(name, statusId);
      return res.status(200).send({ message: `custom status ${statusId} was updated` });
    }
    await createCustomStatusService(name);
    res.status(200).send({ message: `New custom order status: ${name} was added succesfully and can be used ` });
  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const deleteCustomStatus = async (req:any, res:any) => {
  try {
    const statusId = validateBody(req, res, 'statusId');
    // check does custom status exist
    await getCustomStatusService(statusId);

    await deleteCustomStatusService(statusId);
    res.status(200).send({ message: `custom order status: ${statusId} was deleted succesfully` });
  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};

module.exports = {
  createOrder,
  updateCustomStatus,
  deleteCustomStatus,
};
export {};
