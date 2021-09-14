<template>
  <div>
    <main>
        <div class="container">
            <div class="product">
                <div v-for='product in sortedProducts' :key="product.id">
                    <div class="row">
                        <div class="col-sm-6">
                            <figure>
                                <img v-bind:src='product.image' style='width: 100%;'>
                            </figure>
                        </div>
                        <div class="col-sm-6">
                                    <h1 v-text='product.title'></h1>
                                    <p v-html='product.description'></p>
                                    <h4>Product Description</h4>
                                        <div v-html='product.productInformation'></div>
                                        <p class='price'>
                                            £{{ product.price | formatPrice }}
                                        </p>
                                    <button class='default webstore-btn' @click='addToCart(product); calculateCartTotal(product); addItemToCart(product); addToCartItemsSummary(product);' v-if='canAddToCart(product)'>Add to Cart <i class="bi bi-bag-plus-fill"></i></button>
                                    <button class='disabled webstore-btn' v-else>Out Of Stock <i class="bi bi-bag-x-fill"></i></button>
        
                                    <span class="inventory-message"
                                        v-if='(product.availableInventory - cartCount(product.id)) === 0'    
                                    >
                                        All Out!
                                    </span>
                                    <span class="inventory-message"
                                        v-else-if='(product.availableInventory - cartCount(product.id)) < 5'
                                    >Only {{ product.availableInventory - cartCount(product.id)}} left!</span>
                                    <span class="inventory-message"
                                        v-else
                                    >
                                        Buy Now!
                                    </span>
                                    <div class="rating">
                                        <span v-for='n in product.rating'> 
                                            <i class="bi bi-star-fill"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
  </div>
</template>

<script>
import axios from 'axios'
import store from '../store/index'


export default {
  name: 'Laptop Shop',
  data() {
    return {
      sitename: 'Laptop Shop',
    }
  },
  computed: {
      cartItemCount() {
          return store.state.cart.length || '';
      },
      sortedProducts() { 
          if (store.state.products.length > 0) {
              let productsArray = store.state.products.slice(0);
              function compare(a, b) {
                  if (a.title.toLowerCase() < b.title.toLowerCase())
                  return - 1;
                  if (a.title.toLowerCase() > b.title.toLowerCase())
                  return 1;
              return 0;
              }
              return productsArray.sort(compare);
          }
      }
  },
  filters: {
      formatPrice: function (price) {
          if (!parseInt(price)) { return ''; }
          if (price > 999999) {
              const priceString = (price / 100).toFixed(2);
              const priceArray = priceString.split('').reverse('');
              let index = 3;
              while (priceArray.length > index + 3) {
                  priceArray.splice(index + 3, 0, ',');
                  index += 4;
              }
              return '$' + priceArray.reverse().join('');
          } else {
              return '$' + (price / 100).toFixed(2);
          }
      }
  },
  created: function() {
      axios.get('./products.json')
          .then((response) => {
              const products = response.data.products;
              store.commit('loadProductsToStore', products);
          })
  },
  methods: {
      checkRating(n, myProduct) {
          return (myProduct.rating - n) >= 0
      },
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
      }
  }
}
</script>

<style scoped lang="scss">
</style>
