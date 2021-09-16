<script>
import store from '../store/index'

export default {
    methods: {
        addToCart(aProduct) {
            store.commit('addToCart', aProduct)
        },
        canAddToCart(aProduct) {
            return aProduct.availableInventory > this.cartCount(aProduct.id);
        },
        cartCount(id) {
            let count = 0;
            const cart = store.state.cart;
            for (var i = 0; i < cart.length; i++) {
                if (cart[i] === id) {
                    count++;
                }
            }
            return count;
        },
        addItemToCart(aProduct) {
            store.commit('addItemToCart', aProduct)
        },
        calculateCartTotal(aProduct) {
            store.commit('calculateCartTotal', aProduct)
        },
        addToCartItemsSummary(aProduct) {
            const cartItems = store.state.cartItems;
            const cartItemsSummary = store.state.cartItemsSummary;
            cartItems.forEach((item) => {
                // add item to cartItemsSummary array
                if (!cartItemsSummary.includes(item)) {
                    //this.cartItemsSummary.push(item)
                    store.commit('addProductToCartItemsSummary', item);
                }
            })
            // find item added in cartItemsSummary array and increment quantity
            store.commit('incrementProductQuantity', aProduct);
        },
    }
}
</script>
