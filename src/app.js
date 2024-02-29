//  const express = require('express')
//  const ProductManager = require('../PreEntrega3/productManager');
//  const path = require('path')
//  const app = express();
//  const PORT = 3000
//  const productManager = new ProductManager(path.join(__dirname, '..', 'PreEntrega3', 'productos.json'))
//  app.get('/products', (req, res) => {
//      try {
//          const products = productManager.getProducts();
//          res.json(products);
//      } catch (error) {
//          console.error('Error al obtener productos:', error);
//          res.status(500).json({ error: 'Error interno del servidor' });
//      }
//  })
//  app.get('/products/:pid', (req, res) => {
//      const productId = parseInt(req.params.pid);
//      try {
//          const product = productManager.getProductById(productId);
//          if (product) {
//              res.json(product);
//          } else {
//              res.status(404).json({ error: 'Producto no encontrado' });
//          }
//      } catch (error) {
//          console.error('Error al obtener el producto:', error);
//          res.status(500).json({ error: 'Error interno del servidor' });
//      }
//  })
//  app.listen(PORT, () => {
//      console.log(`Servidor Express escuchando en el puerto ${PORT}`);
//  })
//  const express = require('express');
//  const ProductManager = require('../PreEntrega3/productManager');
//  const path = require('path')
//  const app = express();
//  const PORT = 8000; // Cambiado a puerto 800
//  const productManager = new ProductManager(path.join(__dirname, '..', 'PreEntrega3', 'productos.json'))
//  app.get('/products', (req, res) => {
//      try {
//          const products = productManager.getProducts();
//          res.json(products);
//      } catch (error) {
//          console.error('Error al obtener productos:', error);
//          res.status(500).json({ error: 'Error interno del servidor' });
//      }
//  })
//  app.get('/products/:pid', (req, res) => {
//      const productId = parseInt(req.params.pid);
//      try {
//          const product = productManager.getProductById(productId);
//          if (product) {
//              res.json(product);
//          } else {
//              res.status(404).json({ error: 'Producto no encontrado' });
//          }
//      } catch (error) {
//          console.error('Error al obtener el producto:', error);
//          res.status(500).json({ error: 'Error interno del servidor' });
//      }
//  })
//  app.listen(PORT, () => {
//      console.log(`Servidor Express escuchando en el puerto ${PORT}`);
//  });
//  app.js

const express = require('express');
const ProductManager = require('../PreEntrega3/productManager');
const path = require('path');

const app = express();
const PORT = 8000;

const productManager = new ProductManager(path.join(__dirname, '..', 'PreEntrega3', 'productos.json'));

// Obtener todos los productos
app.get('/api/products', (req, res) => {
    try {
        const products = productManager.getProducts();
        res.json(products);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Obtener un producto por su ID
app.get('/api/products/:pid', (req, res) => {
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

// Agregar un nuevo producto
app.post('/api/products', (req, res) => {
    const { title, description, price, thumbnail, code, stock, category, thumbnails } = req.body;
    productManager.addProduct(title, description, price, thumbnail, code, stock, category, thumbnails);
    res.status(201).json({ message: 'Producto agregado correctamente' });
});

// Actualizar un producto existente
app.put('/api/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const updatedFields = req.body;
    const success = productManager.updateProduct(productId, updatedFields);
    if (success) {
        res.json({ message: 'Producto actualizado correctamente' });
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

// Eliminar un producto
app.delete('/api/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const success = productManager.deleteProduct(productId);
    if (success) {
        res.json({ message: 'Producto eliminado correctamente' });
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

