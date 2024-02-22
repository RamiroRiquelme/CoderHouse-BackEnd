  // class ProductManager {
  //     constructor() {
  //       this.products = [];
  //       this.productIdCounter = 1;
  //     }
  //     addProduct(title, description, price, thumbnail, code, stock) {
  //       // Valido que se completen los campos obligatorios
  //       if (!title || !description || !price || !thumbnail || !code || !stock) {
  //         console.error("Todos los campos son obligatorios");
  //         return;
  //       }
  //       // Valido que el código no se repita
  //       if (this.products.some(product => product.code === code)) {
  //         console.error("Ya existe un producto con ese código");
  //         return;
  //       }
  //       // Agrego el prodcuto con el id incrementable
  //       const newProduct = {
  //         id: this.productIdCounter++,
  //         title,
  //         description,
  //         price,
  //         thumbnail,
  //         code,
  //         stock
  //       };
  //       this.products.push(newProduct);
  //       console.log("Producto agregado:", newProduct);
  //     }
  //     getProducts() {
  //       return this.products;
  //     }
  //     getProductById(id) {
  //       const product = this.products.find(product => product.id === id);
  //       if (product) {
  //         return product;
  //       } else {
  //         console.error("Producto no encontrado");
  //       }
  //     }
    //  }
    //  // Pruebas
    //  const productManager = new ProductManager();
    //  // getProducts al inicio, debe devolver un arreglo vacío Este codigo devuelve el arreglo vacio
    //  console.log("Productos al inicio:", productManager.getProducts());
    //  // addProduct con nuevos campos Añade nuevo propdcuto
    //  productManager.addProduct("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
    //  // getProducts después de agregar un producto debe contener el producto agregado
    //  console.log("Productos después de agregar:", productManager.getProducts());
    //  // addProduct con los mismos campos, debe arrojar un error product manager con ejemplo repetido para que tire el error
    //  productManager.addProduct("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
    //  // getProductById con un ID que no existe, debe arrojar un error Buscamos coin un id que no existe 
    //  productManager.getProductById(999);
    //  //getProductById con el ID del producto agregado, debe devolver el producto
    //  const productById = productManager.getProductById(1);
    //  console.log("Producto por ID:", productById);

// productManager.js


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

  addProduct(title, description, price, thumbnail, code, stock) {
    // Valido que se completen los campos obligatorios
    if (!title || !description || !price || !thumbnail || !code || !stock) {
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
      stock
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
}

module.exports = ProductManager;