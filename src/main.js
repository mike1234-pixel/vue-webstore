import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import './assets/app.scss'

createApp(App).use(store).use(router).mount("#app");
// access vuex store globally using this.$store...
// plugins run before the root Vue.js instance is instantiated




