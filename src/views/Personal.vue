<template>
  <div id="personal">
    <van-nav-bar title="个人中心" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    <div class="content_top">
      <span>登录</span>
      <span>|</span>
      <span>注册</span>
    </div>
    <van-nav-bar left-text="我的订单" right-text="订单详情"></van-nav-bar>
    <van-grid>
      <van-grid-item icon="paid" text="待付款" icon-size="40px" />
      <van-grid-item icon="friends-o" text="待成团" />
      <van-grid-item icon="refund-o" text="待收货" />
      <van-grid-item icon="logistics" text="退款/售后" />
    </van-grid>
    <div class="content_s"></div>
    <div class="content_lfer">
      <span>我的优惠券</span>
      <br />
      <span>我的收藏</span>
      <br />
      <span>我的拼团</span>
      <br />
      <span>我的免单劵</span>
      <br />
      <span>借钱</span>
    </div>
    <div class="content_s"></div>
    <div class="content_margin">
      <span>客服中心</span>
      <br />
      <span>关于卷皮</span>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar } from "vant";
import { Toast } from "vant";
import { Panel } from "vant";
import { Grid, GridItem } from "vant";
import { Divider } from "vant";

Vue.use(Divider);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Panel);
Vue.use(NavBar);
export default {
  //路由守卫判断去登录页
  // beforeRouteEnter(to, from, next) {
  //   console.log(to);
  //   next();
  // }
  methods: {
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    }
  }
};
</script>

<style lang="scss" scoped>
.content_s {
  width: 100%;

  margin: 0.3rem;
}
.content_top {
  width: 100%;
  height: 3.125rem;
  background: red;
  line-height: 3.125rem;
  text-align: center;
  color: #fff;
  span {
    font-size: 0.4rem;
    padding: 0.375rem;
  }
}
.content_lfer {
  background-color: #fff;
  color: #333;
  box-sizing: border-box;
  overflow: hidden;
  padding: 0 0.59733rem 0 0.768rem;
  height: 4.5rem;
  span {
    height: 0.96rem;
    font-size: 30px;
    line-height: 0.96rem;
  }
}
.content_margin {
  background-color: #fff;
  color: #333;
  box-sizing: border-box;
  overflow: hidden;
  padding: 0 0.59733rem 0 0.768rem;
  height: 2.92rem;
  span {
    height: 0.96rem;
    font-size: 30px;
    line-height: 0.96rem;
  }
}
.van-nav-bar {
  width: 100%;
  height: 0.88rem;
  line-height: 0.88rem;
  color: #000;
}
.van-grid {
  width: 100%;
  height: 1.58rem;
}
</style>