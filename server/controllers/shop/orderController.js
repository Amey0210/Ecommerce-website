const paypal = require("../../helpers/paypal");
const Order = require("../../models/order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    // STEP 1: Re-calculate the total on the backend to ensure zero mismatch
    // We use USD here to bypass the India-to-India INR restriction
    const itemsForPaypal = cartItems.map((item) => {
      // Use salePrice if available, otherwise regular price
      const itemPrice = item.salePrice > 0 ? item.salePrice : item.price;
      return {
        name: item.title,
        sku: item.productId,
        price: itemPrice.toFixed(2),
        currency: "USD",
        quantity: item.quantity,
      };
    });

    const calculatedTotal = itemsForPaypal.reduce((sum, item) => {
      return sum + parseFloat(item.price) * item.quantity;
    }, 0);

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-cancel",
      },
      transactions: [
        {
          item_list: {
            items: itemsForPaypal,
          },
          amount: {
            currency: "USD",
            total: calculatedTotal.toFixed(2),
          },
          description: "Rabbit Store Purchase",
        },
      ],
    };

    

    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.error("PayPal API Error Details:", JSON.stringify(error.response.details));
        return res.status(500).json({
          success: false,
          message: "PayPal rejected the payment. Ensure your Sandbox account supports USD.",
        });
      } else {
        const newlyCreatedOrder = new Order({
          userId,
          cartId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount: calculatedTotal,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
        });

        await newlyCreatedOrder.save();

        const approvalURL = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        ).href;

        res.status(201).json({
          success: true,
          approvalURL,
          orderId: newlyCreatedOrder._id,
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "An internal error occurred!",
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    let order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    // Stock deduction logic
    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);
      if (product) {
        product.totalStock -= item.quantity;
        await product.save();
      }
    }

    // Cart cleanup
    await Cart.findByIdAndDelete(order.cartId);
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error during payment capture!",
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });
    res.status(200).json({ success: true, data: orders });
  } catch (e) {
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    res.status(200).json({ success: true, data: order });
  } catch (e) {
    res.status(500).json({ success: false, message: "Error fetching details" });
  }
};

module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
};