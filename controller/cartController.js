const Cart = require('../Model/Cart');

module.exports = {
    addProductToCart: async (req, res) => {
        const userId = req.user.id;
        const { productId, quantity, totalprice } = req.body;
        let count;
        try {
            const existingProduct = await Cart.findOne({ userId: userId, productId: productId });
            count = await Cart.countDocuments({ userId: userId });
         
            if (existingProduct) {
                existingProduct.totalprice += (totalprice) * quantity; // Ensure totalprice is parsed as a float
                existingProduct.quantity += quantity;
                await existingProduct.save();
                res.status(201).json({ message: 'Product added to cart successfully', count: count });
            } else {
                const newProduct = new Cart({
                    userId: userId,
                    productId: productId,
                    quantity: quantity,
                    totalprice: totalprice // Ensure totalprice is parsed as a float
                });
                await newProduct.save();
                count = await Cart.countDocuments({ userId: userId });
                res.status(201).json({ message: 'Product added to cart successfully', count: count });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    removeCartItems: async (req, res) => {
        const cartItemsIds = req.params.id;
        const userId = req.user.id;
        try {
            await Cart.findByIdAndDelete(cartItemsIds);
            const count = await Cart.countDocuments({ userId: userId });
            res.status(200).json({ message: 'Cart item deleted successfully', count: count });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getCart: async (req, res) => {
        const userId = req.user.id;
        try {
            const cart = await Cart.find({ userId: userId })
                .populate({
                    path: 'productId',
                    select: 'title price description imageUrl rating ratingCount',
                    populate: {
                        path: 'store',
                        select: 'time coords'
                    }
                });
            res.status(200).json(cart);
        } catch (err) {
            res.status(500).json(err.message);
        }
    },
    getCartCount: async (req, res) => {
        const userId = req.user.id;
        try {
            const count = await Cart.countDocuments({ userId: userId });
            res.status(200).json(count);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    decreamentProductQTY: async (req, res) => {
        const id = req.body.productId;
        const userId = req.body.userId;
        try {
            const cartItem = await Cart.findOne({ userId: userId, productId: id });
            console.log(id);
            if (cartItem) {
                const Productprice = cartItem.totalprice / cartItem.quantity;
                if (cartItem.quantity > 1) {
                    cartItem.quantity -= 1;
                    cartItem.totalprice -= Productprice;
                    await cartItem.save();
                    res.status(200).json({ message: 'Product quantity decremented successfully' });
                } else {
                    await Cart.findByIdAndDelete(id);
                  
                    res.status(200).json({ message: 'Product removed from cart successfully', count: count });
                }
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (err) {
            res.status(500).json({message:'iinternal server error',err});
        }
    },
    incrementProductQty: async (req, res) => {
        const productId = req.params.id;
        const userId = req.user.id;
    
        try {
          const cartItem = await Cart.findOne({ userId: userId, productId: productId });
    
          if (cartItem) {
            const productPrice = cartItem.totalprice / cartItem.quantity;
            cartItem.quantity += 1;
            cartItem.totalprice += productPrice;
            await cartItem.save();
            res.status(200).json({ message: 'Product quantity incremented successfully' });
          } else {
            res.status(404).json({ message: 'Product not found in cart' });
          }
        } catch (err) {
          res.status(500).json(err);
        }
      },

};