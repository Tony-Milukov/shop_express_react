const {
  Order, Product, Status, OrderDeliveryInfo,
} = require('../models/index.ts');

const createCustomStatusService = async (name:string) => {
  const result = await Status.create({
    name,
  });
  if (!result) {
    /// throw
    throw { errorMSG: 'Something went wrong on status crating' };
  }
};
const deleteCustomStatusService = async (statusId:number) => {
  const result = await Status.destroy({
    where: {
      id: statusId,
    },
  });
  if (!result) {
    throw { errorMSG: 'Something went wrong on status deleting' };
  }
};
const updateCustomStatusService = async (name:string, statusId:number) => {
  const result = await Status.update({
    name,
  }, {
    where: {
      id: statusId,
    },
  });
  if (!result) {
    throw { errorMSG: 'Something went wrong on status updating' };
  }
};
const getCustomStatusService = async (statusId:number) => {
  const result = await Status.findByPk(statusId);
  if (!result) {
    throw { errorMSG: 'This custom status was not defined', status: 404 };
  }
  return result;
};
const createOrderService = async (userId:number, adress:any) => {
  if (!adress.fullname || !adress.number
    || !adress.street || !adress.city
    || !adress.zip || !adress.country) {
    throw { errorMSG: 'All fields (fullname, number, street, city, zip, country) are required', status: 400 };
  }
  const order = await Order.create({
    userId,
    adress,
  });
  if (!order) {
    throw { errorMSG: 'Something went wrong on creating an order' };
  }
  return order;
};
const getOrderByIdService = async (orderId:number) => {
  const order = await Order.findOne({
    where: {
      id: orderId,
    },
    include: [
      {
        model: Status,
        through: 'order_statuses',
      },
      {
        model: Product,
        through: 'order_product',
      },
      {
        model: OrderDeliveryInfo,
        foreignKey: 'orderId',
      },
    ],
  });
  if (!order) {
    throw { errorMSG: 'This order was not defined' };
  } return order;
};
const addDeliveryInfoService = async (info:any, orderId:number) => {
  const result = await OrderDeliveryInfo.create(
    {
      ...info,
      orderId,
    },
  );
  if (!result) {
    throw { errorMSG: 'something went wrong on creating order delivery info' };
  }
};
const updateDeliveryInfoService = async (info:any, orderId:number) => {
  const result = await OrderDeliveryInfo.update(
    {
      ...info,

    },
    {
      where: {
        orderId,
      },
    },
  );
  if (!result) {
    throw { errorMSG: 'something went wrong on updating order delivery info' };
  }
};
const getDeliveryInfoService = async (orderId:number) => {
  const info = await OrderDeliveryInfo.findOne(
    {
      where: {
        orderId,
      },
    },
  );
  if (!info) {
    return false;
  }
  return info;
};

module.exports = {
  createCustomStatusService,
  deleteCustomStatusService,
  getCustomStatusService,
  updateCustomStatusService,
  createOrderService,
  getOrderByIdService,
  addDeliveryInfoService,
  getDeliveryInfoService,
  updateDeliveryInfoService,
};
export {};
