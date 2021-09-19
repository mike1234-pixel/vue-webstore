import axios from 'axios';

const state = {
    products: [],
}

const getters = {
    products(state) {
        return state.products;
    },
}

const actions = {
    initStore({commit}) {
        axios.get('./products.json')
        .then((response) => {
            commit('loadProductsToStore', response.data.products);
      })
    }
}

const mutations = {
    loadProductsToStore(state, products) {
        state.products = products;
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}