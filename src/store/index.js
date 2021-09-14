import { createStore } from "vuex";

export default createStore({
  state: {
    products: [],
    cart: [],
    cartItems: [],
    cartItemCount: 0,
    cartTotal: 0,
    cartItemsSummary: [],
  },
  mutations: {
    loadProductsToStore(state, products) {
      state.products = products;
    },
    addToCart(state, product) {
      state.cart.push(product.id);
    },
    addItemToCart(state, product) {
      state.cartItems.push(product)
    }, 
    calculateCartTotal(state, product) {
      state.cartTotal += product.price;
    },
    addProductToCartItemsSummary(state, product) {
      state.cartItemsSummary.push(product)
    }, 
    incrementProductQuantity(state, product) {
      state.cartItemsSummary.forEach((item) => {
        if (item.id === product.id) {
            item.quantity++;
        }
    })
    }
  },
});
