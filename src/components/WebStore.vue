<template>
  <div>
    <header class='nav'>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1 v-text='sitename'></h1>
                <button class='nav__shopping-cart' @click='showCheckout'>
                    <span>{{ cartItemCount }}</span>
                    <i class="bi bi-bag"></i>
                </button>
            </div>
        </div>
    </div>
</header>
<main>
    <div class="container">
        <div class="product" v-if='showProduct'>
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
                                <p class='price'>
                                    {{ product.price | formatPrice }}
                                </p>
                                <button class='default' @click='addToCart(product)' v-if='canAddToCart(product)'>Add to Cart</button>
                                <button class='disabled' v-else>Add to Cart</button>
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
                                        <i class="bi bi-star"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- .trim modifier on v-model removes leading white space -->
                <div class="checkout" v-else>
                    <label for="fname">First Name</label> 
                    <input type="text" name="fname" id="fname" class='form-control' v-model.trim='order.firstName'>
                    <label for="lname">Last Name</label>
                    <input type="text" name="lname" id="lname" class='form-control' v-model.trim='order.lastName'>
                    <label for="address">Address</label>
                    <input type="text" name='address' id='address' v-model.trim='order.address' class='form-control'>
                    <label for="city">City</label>
                    <input type="text" name='city' id='city' v-model.trim='order.city' class='form-control'>
                    <label for="state">State</label>
                    <select name="state" id="state" v-model='order.state'>
                        <option value="" disabled>State</option>
                        <option v-for='(state, key) in states' v-bind:value='state'>{{ key }}</option>
                    </select>
                    <label for="postcode">Postcode</label>
                    <input type="text" name='postcode' id='postcode' v-model='order.postcode' class='form-control'>
                    <label for="gift">Ship as gift?</label>
                    <input type="checkbox" id='gift' value='true' 
                        v-bind:true-value='order.sendGift'
                        v-bind:false-value='order.dontSendGift'
                        v-model='order.gift'>
                    <label for="home">Home</label>
                    <input type="radio" id='home' v-bind:value='order.home' v-model='order.method'>
                    <label for="business">Business</label>
                    <input type="radio" id='business' v-bind:value='order.business' v-model='order.method'>
                    <button type='submit' class='btn btn-primary submit' @click='submitForm'>Place Order</button>
                    {{ order.gift }}
                </div>
            </div>
        </main>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'WebStore',
  data() {
    return {
      sitename: 'Vue.js Web Store',
      showProduct: true,
      order: {
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          postcode: '',
          state: '',
          gift: false,
          method: 'Home Address',
          business: 'Business Address',
          home: 'Home Address',
          sendGift: 'Send As A Gift',
          dontSendGift: 'Do Not Send As A Gift'
      },
      products: [],
      states: {
          AL: 'Alabama',
          AR: 'Arizona',
          CA: 'California',
          NV: 'Nevada',
          NY: 'New York'
      },
      cart: [],
    }
  },
  computed: {
      cartItemCount: function() {
          return this.cart.length || '';
      },
      sortedProducts() { 
          if (this.products.length > 0) {
              let productsArray = this.products.slice(0);
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
              this.products = response.data.products;
              console.log(this.products)
          })
  },
  methods: {
      checkRating(n, myProduct) {
          return (myProduct.rating - n) >= 0
      },
      addToCart(aProduct) {
          this.cart.push( aProduct.id )
      },
      canAddToCart(aProduct) {
          return aProduct.availableInventory > this.cartCount(aProduct.id);
      },
      cartCount(id) {
          let count = 0;
          for (var i = 0; i < this.cart.length; i++) {
              if (this.cart[i] === id) {
                  count++;
              }
          }
          return count;
      },
      showCheckout() {
          this.showProduct = this.showProduct ? false: true;
      },
      submitForm() {
          alert('submitted')
      }
  }
}
</script>

<style scoped lang="scss">
.nav {
    .col {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    h1 {
      color: blue !important;
    }
  }
</style>
