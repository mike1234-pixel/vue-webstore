<script>

import { mapMutations } from 'vuex'

export default {
    methods: {
        ...mapMutations([
            'addToCart',
            'addItemToCart',
            'calculateCartTotal',
            'addProductToCartItemsSummary',
            'incrementProductQuantity'
        ]),
        // map vuex mutations to methods object
        // call them using this.mutation(arg) rather than this.$store.commit('mutation', arg)
        canAddToCart(aProduct) {
            return aProduct.availableInventory > this.cartCount(aProduct.id);
        },
        cartCount(id) {
            let count = 0;
            const cart = this.$store.getters.cart;
            for (var i = 0; i < cart.length; i++) {
                if (cart[i] === id) {
                    count++;
                }
            }
            return count;
        },
        addToCartItemsSummary(aProduct) {
            const cartItems = this.$store.getters.cartItems;
            const cartItemsSummary = this.$store.getters.cartItemsSummary;
            cartItems.forEach((item) => {
                // add item to cartItemsSummary array
                if (!cartItemsSummary.includes(item)) {
                    //this.cartItemsSummary.push(item)
                    this.addProductToCartItemsSummary(item);
                }
            })
            // find item added in cartItemsSummary array and increment quantity
            this.incrementProductQuantity(aProduct);
        },
    }
}
</script>
