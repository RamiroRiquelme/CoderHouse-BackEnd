const express = require('express');
const CartManager = require('../PreEntrega3/cartManager'); 

const router = express.Router();
const cartManager = new CartManager();

router.post('/', (req, res) => {
    try {
        const cartId = cartManager.createCart();
        res.status(201).json({ cartId });
    } catch (error) {
        console.error('Error al crear un nuevo carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.get('/:cid', (req, res) => {
    const cartId = req.params.cid;
    try {
        const cart = cartManager.getCart(cartId);
        if (cart) {
            res.json(cart);
        } else {
            res.status(404).json({ error: 'Carrito no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        cartManager.addProductToCart(cid, pid, quantity);
        res.status(201).json({ message: 'Producto agregado al carrito correctamente' });
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
