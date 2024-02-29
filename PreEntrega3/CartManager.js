const fs = require('fs');

class CartManager {
    constructor(filePath) {
        this.path = filePath;
        this.carts = [];
        this.cartIdCounter = 1;
        this.loadCarts();
    }

    loadCarts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.carts = JSON.parse(data);
            this.cartIdCounter = this.carts.length > 0 ? Math.max(...this.carts.map(c => c.id)) + 1 : 1;
        } catch (error) {
            console.error('Error al cargar los carritos:', error);
        }
    }

    saveCarts() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2));
        } catch (error) {
            console.error('Error al guardar los carritos:', error);
        }
    }

    createCart() {
        const newCart = {
            id: this.cartIdCounter++,
            products: []
        };
        this.carts.push(newCart);
        this.saveCarts();
        return newCart.id;
    }

    getCart(cartId) {
        return this.carts.find(cart => cart.id === cartId);
    }

    addProductToCart(cartId, productId, quantity) {
    }


}

module.exports = CartManager;
