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

            // when on checkout and navigating back to home to add more of the same product
            // the same product is added again when it shouldn't be

            // the quantity changes when navigating away so the value changes
            // have to check against the product id, as the whole array for the product values does not match
            cartItems.forEach((item) => {
                // add item to cartItemsSummary array
                let pushToArray = true;

                cartItemsSummary.forEach((product) => {
                    if (product.id === item.id) {
                        pushToArray = false;
                    }
                })

                if (pushToArray) {
                    this.addProductToCartItemsSummary(item);
                }
            })
            // find item added in cartItemsSummary array and increment quantity
            this.incrementProductQuantity(aProduct);
        },
    }
}
</script>
