import { createStore } from "vuex";
import products from './products/products'
import cart from './cart/cart'

export default createStore({
  modules: {
    products,
    cart
  },
});
