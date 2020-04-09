<template>
  <div id="app">
    <router-view></router-view>
    <bottom-nav></bottom-nav>
  </div>
</template>


<script>
import bottomNav from "@/components/bottomNav.vue";
export default {
  components: {
    bottomNav
  }
};
</script>


<style lang="scss">
@import "@/stylesheets/main.scss";
</style>
