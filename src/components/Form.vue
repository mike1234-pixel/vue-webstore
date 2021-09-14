<template>
  <div class="checkout">
      <h3>Your Cart</h3>
      <ul>
          <li>Total: £{{ cartTotal }}</li>
          <li>Items: {{ cartItemCount }}</li>
          <li v-for="item in cartItemsSummary" :key="item.id">
              <ul>
                  <li>{{item.title}}</li>
                  <li>{{item.price}}</li>
                  <li>
                      <img v-bind:src='item.image' alt="{{item.title}}" class="checkout__product-img" />
                  </li>
                  <li>Quantity: {{item.quantity}}</li>
              </ul>
          </li>
      </ul>
      
      
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
          <option v-for='(state, key) in states' :value='state' :key='key'>{{ key }}</option>
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
</template>

<script>
import MyHeader from './Header.vue';
import store from '../store/index'

export default {
  name: 'Form',
  data() {
    return {
        states: {
          AL: 'Alabama',
          AR: 'Arizona',
          CA: 'California',
          NV: 'Nevada',
          NY: 'New York'
        },
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
    }
  },
  computed: {
    cartTotal() {
      return store.state.cartTotal;
    },
    cartItemsSummary() {
      return store.state.cartItemsSummary;
    },
    cartItemCount() {
        return store.state.cart.length || '';
    }
  },
  components: { MyHeader },
  methods: {
    submitForm() {
      alert('Submitted')
    }
  }
}
</script>
