<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <WebStore />
  </div>
</template>

<script>
// @ is an alias to /src
import WebStore from "@/components/WebStore.vue";

export default {
  name: "Home",
  components: {
    WebStore,
  },
};
</script>
