const state = {
    cart: [],
    cartItems: [],
    cartItemCount: 0,
    cartTotal: 0,
    cartItemsSummary: [],
}

const getters = {
    cart(state) {
        return state.cart;
    },
    cartItems(state) {
        return state.cartItems;
    },
    cartItemCount(state) {
        return state.cart.length || '';
    },
    cartTotal(state) {
        return state.cartTotal;
    },
    cartItemsSummary(state) {
        return state.cartItemsSummary;
    },
}

const mutations = {
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
}

export default {
    state,
    getters,
    mutations
}