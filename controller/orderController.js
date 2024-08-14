const Order = require('../Model/Order');

module.exports = {
    placeOrder: async (req, res) => {
        const newOrder = new Order({
            ...req.body,
            userId: req.user.id,

        });
        try {
            await newOrder.save();
            const orderId = newOrder._id;
            res.status(200).json({ message: 'Order placed successfully', orderId: orderId });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getUserOrder: async (req, res) => {
        const userId = req.user.id;
        const {paymentStatus,orderStatus} = req.query;

        let query;

        if(paymentStatus){
            query.paymentStatus = paymentStatus;

        }
        if(orderStatus === OrderStatus){
            query.orderStatus = orderStatus;
        }
        try {
           const order = await Order.find(query).populate({
                path: 'orderItems.productId',
                select: 'imageUrl title time',
              });
                res.status(200).json(order);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};