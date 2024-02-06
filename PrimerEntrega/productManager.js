class ProductManager {
    constructor() {
      this.products = [];
      this.productIdCounter = 1;
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
  
      // Agrego el prodcuto con el id incrementable
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
  
  // Pruebas
  const productManager = new ProductManager();
  
  //Este codigo devuelve el arreglo vacio
  console.log("Productos al inicio:", productManager.getProducts());
  
  // Añade nuevo propdcuto
  productManager.addProduct("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
  
  //getProducts después de agregar un producto debe contener el producto agregado
  console.log("Productos después de agregar:", productManager.getProducts());
  
  // addProduct con los mismos campos, debe arrojar un error product manager con ejemplo repetido para que tire el error
  productManager.addProduct("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
  
  // Buscamos coin un id que no existe 
  productManager.getProductById(999);
  
  //getProductById con el ID del producto agregado, debe devolver el producto
  const productById = productManager.getProductById(1);
  console.log("Producto por ID:", productById);
