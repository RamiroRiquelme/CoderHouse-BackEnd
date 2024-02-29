// const fs = require('fs');

// class ProductManager {
//   constructor(filePath) {
//     this.path = filePath;
//     this.products = [];
//     this.productIdCounter = 1;
//     this.loadProducts();
//   }

//   loadProducts() {
//     try {
//       const data = fs.readFileSync(this.path, 'utf8');
//       this.products = JSON.parse(data);
//       this.productIdCounter = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
//     } catch (error) {
//       console.error('Error al cargar los productos:', error);
//     }
//   }

//   saveProducts() {
//     try {
//       fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
//     } catch (error) {
//       console.error('Error al guardar los productos:', error);
//     }
//   }

//   addProduct(title, description, price, thumbnail, code, stock) {
//     // Valido que se completen los campos obligatorios
//     if (!title || !description || !price || !thumbnail || !code || !stock) {
//       console.error("Todos los campos son obligatorios");
//       return;
//     }

//     // Valido que el código no se repita
//     if (this.products.some(product => product.code === code)) {
//       console.error("Ya existe un producto con ese código");
//       return;
//     }

//     // Agrego el producto con el id incrementable
//     const newProduct = {
//       id: this.productIdCounter++,
//       title,
//       description,
//       price,
//       thumbnail,
//       code,
//       stock
//     };

//     this.products.push(newProduct);
//     this.saveProducts();
//     console.log("Producto agregado:", newProduct);
//   }

//   getProducts() {
//     return this.products;
//   }

//   getProductById(id) {
//     const product = this.products.find(product => product.id === id);

//     if (product) {
//       return product;
//     } else {
//       console.error("Producto no encontrado");
//     }
//   }
// }

// module.exports = ProductManager;

const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = [];
        this.productIdCounter = 1;
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
            this.productIdCounter = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
        } catch (error) {
            console.error('Error al cargar los productos:', error);
        }
    }

    saveProducts() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
        } catch (error) {
            console.error('Error al guardar los productos:', error);
        }
    }

    addProduct(title, description, price, thumbnail, code, stock, category, thumbnails) {
        // Valido que se completen los campos obligatorios
        if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
            console.error("Todos los campos son obligatorios");
            return;
        }

        // Valido que el código no se repita
        if (this.products.some(product => product.code === code)) {
            console.error("Ya existe un producto con ese código");
            return;
        }

        // Agrego el producto con el id incrementable
        const newProduct = {
            id: this.productIdCounter++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            category,
            thumbnails,
            status: true // Definido como true por defecto
        };

        this.products.push(newProduct);
        this.saveProducts();
        console.log("Producto agregado:", newProduct);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);

        if (product) {
            return product;
        } else {
            console.error("Producto no encontrado");
        }
    }

    updateProduct(id, updatedFields) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedFields };
            this.saveProducts();
            return true;
        }
        return false;
    }

    deleteProduct(id) {
        this.products = this.products.filter(product => product.id !== id);
        this.saveProducts();
    }

    deleteProductById(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProducts();
            console.log(`Producto con ID ${id} eliminado correctamente.`);
        } else {
            console.error(`No se encontró ningún producto con ID ${id}.`);
        }
    }
}

module.exports = ProductManager;
