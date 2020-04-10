<template>
  <div id="personal">
    <div>个人中心</div>
    <van-tabs v-model="active">
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from "vue";
import { Tab, Tabs } from "vant";

Vue.use(Tab);
Vue.use(Tabs);
export default {
  //路由守卫判断去登录页
  beforeRouteEnter(to, from, next) {
    console.log(to);
    next();
  }
  data() {
    return {
      active: 2
    };
  }
};
</script>

<style lang="scss" scoped>

</style>