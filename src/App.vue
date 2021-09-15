<template>
<Header />
<!-- transition between router views -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in" >
        <component :is="Component" />
      </transition>
    </router-view>
</template>

<script>
  import Header from "@/components/Header.vue";

  export default {
    components: { Header } 
  }
</script>


