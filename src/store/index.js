import { createStore } from "vuex";

export default createStore({
  state: {
    // counter: 0
    products: [],
    cart: [],
    cartItems: [],
    cartTotal: 0,
    cartItemsSummary: [],
  },
  mutations: {
    // increment(state) {
    //   state.counter++;
    // }
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
  // actions: {},
  // modules: {},
});
