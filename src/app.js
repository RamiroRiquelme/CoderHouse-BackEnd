const express = require('express');
const ProductManager = require('../PreEntrega3/productManager');
const path = require('path');

const app = express();
const PORT = 3000;

const productManager = new ProductManager(path.join(__dirname, '..', 'PreEntrega3', 'productos.json'));

app.get('/products', (req, res) => {
    try {
        const products = productManager.getProducts();
        res.json(products);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.get('/products/:pid', (req, res) => {
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

app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});