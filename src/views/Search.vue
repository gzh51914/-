<template>
  <div id="search">
    <!-- <van-nav-bar title="搜索商品" left-text="返回" left-arrow @click-left="onClickLeft" /> -->

    <div id="topSearch">
      <div class="returnUp" @click="revet()">
        <i class="iconfont icon-sidebar_back_hov"></i>
      </div>
      <div class="inputBox">
        <div class="iconBox">
          <i class="iconfont icon-search"></i>
        </div>
        <input type="text" v-model="inpKeyword" @keyup.13="search()" placeholder="搜索商品" />
      </div>
      <div class="textBox" @>搜索</div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar } from "vant";
import { instance2 } from "@/utils/axios.js";
Vue.use(NavBar);

export default {
  data() {
    return {
      inpKeyword: ""
    };
  },
  methods: {
    revet() {
      this.$router.go(-1);
    },
    search() {
      instance2
        .get("/search", {
          params: {
            keyword: "女",
            user_groupids: "p8_c4_l4_222",
            page: 1,
            is_ajax: 1
          }
        })
        .then(res => {
          console.log(res);
        });
      console.log(1234);
    }
  }
};
</script>

<style lang="scss">
#topSearch {
  height: 0.88rem;
  display: flex;
  justify-content: space-between;
  .returnUp {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 0.7rem;
    height: 0.88rem;
    i {
      font-size: 0.28rem;
      color: blue;
    }
  }
  .inputBox {
    padding-left: 0.1rem;
    box-sizing: border-box;
    // width: 6rem;
    display: flex;
    align-items: center;
    flex: 1;

    .iconBox {
      width: 0.56rem;
      height: 0.56rem;
      background: #f2f2f2;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        font-size: 0.38rem;
      }
    }

    input {
      font-size: 0.26rem;
      height: 0.56rem;
      width: 100%;
      background: #f2f2f2;
    }
  }
  .textBox {
    width: 1.2rem;
    font-size: 0.3rem;
    text-align: center;
    line-height: 0.88rem;
  }
}

// .van-nav-bar {
//   height: 0.88rem;
//   font-size: 0.4rem;
//   line-height: 0.88rem;
//   .van-nav-bar__text {
//     vertical-align: baseline;
//   }
//   .van-nav-bar__title,
//   .van-nav-bar__left {
//     height: 0.88rem;
//     font-size: 0.4rem;
//     line-height: 0.88rem;
//   }
// }
</style>