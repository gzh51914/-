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
      <div class="textBox" @click="search()">搜索</div>
    </div>

    <div id="searchTabs">
      <van-tabs v-model="tabsActive" sticky @click="tabClick">
        <van-tab v-for="(item,index) in tabsArr" :key="index" :title="item.tabsTitle">
          <div class="toggleBox">
            <van-list v-model="loading" :finished="finished" @load="onLoad">
              <router-link
                v-for="item in searchData"
                tag="div"
                :key="item.id"
                class="shopBox"
                :to="{name:'detail',params:{shopid:item.id}}"
              >
                <div class="imgBox">
                  <img :src="item.picurl" alt />
                </div>

                <div class="textBox">
                  <div class="price" style="display:flex; align-items:center;">
                    <div class="cprice" style="font-size:0.38rem;color:red;">￥{{item.cprice}}</div>
                    <div
                      class="oprice"
                      style="margin-left:0.3rem;color:#ccc;text-decoration:line-through;"
                    >{{item.oprice}}</div>
                  </div>
                  <div class="content">
                    <div class="title">{{item.title}}</div>
                    <div class="timer">{{item.status}}</div>
                  </div>
                </div>
              </router-link>
            </van-list>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar, Tab, Tabs, List } from "vant";
import { instance2 } from "@/utils/axios.js";
Vue.use(NavBar);

Vue.use(List);

Vue.use(Tab);
Vue.use(Tabs);
export default {
  beforeRouteLeave(to, from, next) {
    this.searchData = []; //离开清除数据
    next();
  },
  data() {
    return {
      inpKeyword: "",
      tabsActive: 0,
      pageNum: 1,
      finished: true,
      loading: false,
      searchData: [],
      tabsArr: [
        { tabsTitle: "推荐", params: { order: "", sort: "" } },
        {
          tabsTitle: "价格",
          params: { order: "cprice", sort: "desc" }
        },
        { tabsTitle: "销量", params: { order: "sales", sort: "" } },
        { tabsTitle: "上新", params: { order: "addtime", sort: "" } }
      ]
    };
  },

  methods: {
    revet() {
      this.$router.go(-1);
    },
    tabClick(index, title) {
      this.pageNum = 1;
      let obj = this.tabsArr[index];
      this.searchData = [];
      this.finished = true;
      if (!this.inpKeyword) {
        return;
      }
      instance2
        .get("/search", {
          params: {
            keyword: this.inpKeyword,
            user_groupids: "p8_c4_l4_222",
            page: this.pageNum,
            is_ajax: 1,
            order: obj.params.order,
            sort: obj.params.sort
          }
        })
        .then(res => {
          this.finished = false;
          this.searchData = res.data.data.list;
        });
    },
    onLoad() {
      this.pageNum++;
      instance2
        .get("/search", {
          params: {
            keyword: this.inpKeyword,
            user_groupids: "p8_c4_l4_222",
            page: this.pageNum,
            is_ajax: 1
          }
        })
        .then(res => {
          this.searchData = this.searchData.concat(res.data.data.list);
        });
      setTimeout(() => {
        // 加载状态结束
        this.loading = false;
      }, 1000);
    },
    search() {
      this.searchData = [];
      this.finished = true;
      instance2
        .get("/search", {
          params: {
            keyword: this.inpKeyword,
            user_groupids: "p8_c4_l4_222",
            page: 1,
            is_ajax: 1
          }
        })
        .then(res => {
          this.finished = false;
          this.searchData = res.data.data.list;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
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
.toggleBox {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .shopBox {
    width: 3.72rem;
    height: 4.85rem;
    .imgBox {
      width: 3.72rem;
      height: 3.72rem;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .logoBox {
        position: absolute;
        bottom: 0rem;
        right: 0;
        width: 1.8rem;
        height: 0.9rem;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }

    .textBox {
      height: 1.12rem;
      padding: 0.1rem 0.2rem;
      box-sizing: border-box;
      .tips {
        font-size: 0.34rem;
        color: red;
      }
      .content {
        margin-top: 0.06rem;
        display: flex;
        .title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.26rem;
          flex: 5;
        }
        .timer {
          text-align: right;
          color: #ccc;
          font-size: 0.22rem;
          align-self: flex-end;
          flex: 2;
        }
      }
    }
  }
}
</style>

<style lang="scss" >
#searchTabs {
  .van-tabs__wrap,
  .van-hairline--top-bottom {
    height: 0.88rem !important;

    .van-tab__text {
      font-size: 0.34rem !important;
      color: black;
      font-weight: bold;
      line-height: 0.88rem;
    }
  }
}
</style>