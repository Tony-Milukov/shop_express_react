require('dotenv').config();

const validateBody = require('../validations/bodyValidations.ts');
const apiError = require('../utilits/apiError.ts');
const checkIsObject = require('../validations/checkIsObject.ts');
const checkIsArray = require('../validations/checkIsArray.ts');
const { getProductByIdService } = require('../service/productService.ts');
const { getUserByToken, isRoleGiven, getUserByIdService } = require('../service/userService.ts');
const {
  createCustomStatusService, deleteCustomStatusService,
  getCustomStatusService, updateCustomStatusService,
  createOrderService, getOrderByIdService, addDeliveryInfoService,
  updateDeliveryInfoService,
  getDeliveryInfoService,
} = require('../service/orderService.ts');

const createOrder = async (req:any, res:any) => {
  try {
    const user = await getUserByToken(req, res);
    const adress = validateBody(req, res, 'adress');
    const products = validateBody(req, res, 'products');
    checkIsArray(products, 'products');
    checkIsObject(adress, 'adress');

    // env is possibly be undefined, we need to prove it
    const MAX_PRODUCTS_PER_ORDER = process.env.MAX_PRODUCTS_PER_ORDER || '15';
    const DEFAULT_ORDER_STATUS = process.env.DEFAULT_ORDER_STATUS || '1';
    if (products.length > Number(MAX_PRODUCTS_PER_ORDER)) {
      return res.status(400).json({ message: `Sorry, but you can only order ${process.env.MAX_PRODUCTS_PER_ORDER} products at a time, but you can do another order then` });
    }
    // check do all the product exist
    for (const product of products) {
      await getProductByIdService(product);
    }
    const order = await createOrderService(user.id, adress);
    for (const productId of products) {
      const product = await getProductByIdService(productId);
      await order.addProduct(product);
    }

    const status = await getCustomStatusService(Number(DEFAULT_ORDER_STATUS));
    await order.addStatus(status);

    return res.status(200).json({ message: 'Order was created', orderId: order.id });
  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};

const updateOrderStatus = async (req:any, res:any) => {
  try {
    const orderId = parseFloat(validateBody(req, res, 'orderId'));
    const order = await getOrderByIdService(orderId);

    const statusId = parseFloat(validateBody(req, res, 'statusId'));
    const status = await getCustomStatusService(statusId);

    // we add status
    const result = await order.addStatus(status);
    if (!result) {
      return res.status(200).json({ message: `This status was already added to order #${orderId}` });
    }
    res.status(200).json({ message: `order #${orderId} was updated succesfully` });
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
const getOrderById = async (req:any, res:any) => {
  try {
    const user = await getUserByToken(req, res);
    const orderId = validateBody(req, res, 'orderId');
    const order = await getOrderByIdService(orderId);

    // if admin, don't check if the order belongs to this user,
    // admins are allowed to see all orders
    if (await isRoleGiven(user.id, process.env.ADMIN_ROLE)) {
      return res.status(200).json(order);
    } if (user.id !== order.userId) {
      return res.status(404).json({ message: 'this order was not defined' });
    } res.status(200).json(order);
  } catch (e:any) {
    console.log(e);
    apiError(res, e.errorMSG, e.status);
  }
};
const getAllOrders = async (req:any, res:any) => {
  try {
    const userByToken = await getUserByToken(req, res);
    const { userId } = req.body;
    const ordersByToken = await userByToken.getOrders();

    // if admin, don't check if the orders belongs to this user,
    // admins are allowed to see all orders
    if (await isRoleGiven(userByToken.id, process.env.ADMIN_ROLE) && userId) {
      const user = await getUserByIdService(userId);
      const orders = await user.getOrders();
      return res.status(200).json(orders);
    } res.status(200).json(ordersByToken);
  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};
const updateDeliveryInfo = async (req:any, res:any) => {
  try {
    const orderId = validateBody(req, res, 'orderId');
    const info = validateBody(req, res, 'deliveryInfo');

    // checking if deliveryInfo is Object
    checkIsObject(info, 'deliveryInfo');

    // if delivery info exists, it will be updated
    if (await getDeliveryInfoService(orderId)) {
      // update given DeliveryInfo fields
      await updateDeliveryInfoService(info, orderId);
      return res.status(200).json({
        message: `${Object.keys(info).join(', ')} fields in Delivery Info were updated`,
      });
    } if (!info.link || !info.company || !info.code) {
      return res.status(400).json({ message: 'info have to  include: link, company, code, and can also include some extraInfo' });
    }
    // check do the order exist
    await getOrderByIdService(orderId);

    // add new Delivery Info
    await addDeliveryInfoService(info, orderId);
    res.status(200).json({ message: `Delivery info for order ${orderId} was added succesfully` });
  } catch (e:any) {
    apiError(res, e.errorMSG, e.status);
  }
};
module.exports = {
  createOrder,
  updateCustomStatus,
  deleteCustomStatus,
  updateOrderStatus,
  getOrderById,
  getAllOrders,
  updateDeliveryInfo,
};
export {};
