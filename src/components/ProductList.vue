<template>
  <div>
    <main>
        <div class="container">
                <div v-for='product in sortedProducts' :key="product.id" class="product">
                    <div class="row">
                        <div class="col-sm-6">
                            <figure>
                                <img v-bind:src='product.image' style='width: 100%;'>
                            </figure>
                            <router-link
                                tag="button"
                                class="webstore-btn"
                                :to="{ name: 'Id', params: { id: product.id }}"
                            >
                                See More <i class="bi bi-eye"></i>
                            </router-link>
                        </div>
                        <div class="col-sm-6">
                                    <h1 v-text='product.title' class="product__title"></h1>
                                    <p class='product__price'>
                                        £{{ product.price }}
                                    </p>
                                    <p v-html='product.description' class="product__description"></p>
                                
                                        <h4>Product Description</h4>
                       
                                    
                                    <div v-html='product.productInformation' class="product__information"></div>
                                    <button class='default webstore-btn product__add-to-cart' @click='addToCart(product); calculateCartTotal(product); addItemToCart(product); addToCartItemsSummary(product);' v-if='canAddToCart(product)'>Add to Cart <i class="bi bi-bag-plus-fill"></i></button>
                                    <button class='disabled webstore-btn product__add-to-cart' v-else>Out Of Stock <i class="bi bi-bag-x-fill"></i></button>

                                    <transition name="bounce" mode="out-in">
                                        <span class="product__inventory-message"
                                            v-if='(product.availableInventory - cartCount(product.id)) === 0'
                                            key="inventoryMessageFinal"    
                                        >
                                            All Out!
                                        </span>
                                        <span class="product__inventory-message"
                                            v-else-if='(product.availableInventory - cartCount(product.id)) < 5'
                                            key="inventoryMessageMid"
                                        >Only {{ product.availableInventory - cartCount(product.id)}} left!</span>
                                        <span class="product__inventory-message"
                                            v-else
                                            key="inventoryMessageInitial"
                                        >
                                            Buy Now!
                                        </span>
                                    </transition>
                                    <div class="rating">
                                        <span v-for='n in product.rating' :key='n'> 
                                            <i class="bi bi-star-fill"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </main>
  </div>
</template>

<script>
import store from '../store/index';

export default {
  name: 'Products',
  data() {
    return {
      sitename: 'Tech Pad',
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
      },
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
      },
  }
}
</script>

<style scoped lang="scss">


.bounce-enter-active {
    animation: shake 0.72s cubic-bezier(.37,.07,.19,.97) both;
    transform: translate3d(0,0,0);
    backface-visibility: hidden;
}

@keyframes shake {
    10%, 90% {
        color: red;
        transform: translate3d(-1px,0,0);
    }
    20%, 80% {
        transform: translate3d(2px,0,0);
    }
    30%, 50%, 70% {
        color: red;
        transform: translate3d(-4px,0,0);
    }
    40%, 60% {
        transform: translate3d(4px,0,0)
    }
}
</style>
