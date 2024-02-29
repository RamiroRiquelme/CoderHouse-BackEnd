const express = require('express');
const ProductManager = require('../PreEntrega3/productManager'); 

const router = express.Router();
const productManager = new ProductManager('../PreEntrega3/productos.json');

router.get('/', (req, res) => {
    try {
        const products = productManager.getProducts();
        res.json(products);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.get('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    try {
        const product = productManager.getProductById(productId);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
