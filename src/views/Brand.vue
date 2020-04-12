<template>
  <div id="brand">
    <!-- navBarBox -->
    <div id="navBarBox">
      <van-nav-bar
        :title="brandInfo.shop_name"
        left-text="返回"
        right-text="按钮"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>
    <!-- navBarBox -->

    <!-- branInfoBox -->
    <div id="branInfoBox">
      <div class="section">
        <div class="contextBox">
          <div class="imgBox">
            <img :src="brandInfo.logo_url" alt />
          </div>
          <div class="titleBox">
            <div class="topTitle">{{brandInfo.shop_name}}</div>
            <div class="bottomTitle">{{brandInfo.store_info}}</div>
          </div>
          <div class="iconBox">
            <i class="iconfont icon-collection-fill"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- branInfoBox -->
    <!-- countDown -->
    <div id="countDown">
      <div class="ct">距离结束还剩</div>
      <van-count-down :time="time" format="DD 天 HH 时 mm 分 ss 秒" />
    </div>
    <!-- countDown -->
    <!-- tarbas -->
    <div id="tarbas">
      <div v-if="floorBar">
        <van-tabs v-model="tarbasActive" @click="changeTab" sticky>
          <van-tab v-for="item in floorBar" :key="item.title" :title="item.title">
            <div class="toggleBox" v-if="floorData">
              <router-link
                v-for="items in floorData"
                tag="div"
                :key="items.goods_id"
                class="shopBox"
                :to="{name:'detail',params:{shopid:items.goods_id}}"
              >
                <div class="imgBox">
                  <img :src="items.pic_url" alt />
                </div>

                <div class="textBox">
                  <div class="price" style="display:flex; align-items:center;">
                    <div class="cprice" style="font-size:0.38rem;color:red;">￥{{items.cprice}}</div>
                    <div
                      class="oprice"
                      style="margin-left:0.3rem;color:#ccc;text-decoration:line-through;"
                    >{{items.oprice}}</div>
                  </div>
                  <div class="content">
                    <div class="title">{{items.title}}</div>
                    <div class="timer">{{items.time_left}}</div>
                  </div>
                </div>
              </router-link>
            </div>
          </van-tab>
        </van-tabs>
      </div>
      <div v-else>
        <van-tabs v-model="tarbasActive" @click="changeTab2" sticky>
          <van-tab v-for="item in floorBar2" :key="item" :title="item">
            <div class="toggleBox" v-if="floorData">
              <router-link
                v-for="items in floorData"
                tag="div"
                :key="items.goods_id"
                class="shopBox"
                :to="{name:'detail',params:{shopid:items.goods_id}}"
              >
                <div class="imgBox">
                  <img :src="items.pic_url" alt />
                </div>

                <div class="textBox">
                  <div class="price" style="display:flex; align-items:center;">
                    <div class="cprice" style="font-size:0.38rem;color:red;">￥{{items.cprice}}</div>
                    <div
                      class="oprice"
                      style="margin-left:0.3rem;color:#ccc;text-decoration:line-through;"
                    >{{items.oprice}}</div>
                  </div>
                  <div class="content">
                    <div class="title">{{items.title}}</div>
                    <div class="timer">{{items.time_left}}</div>
                  </div>
                </div>
              </router-link>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <div v-show=" floorData.length">
      <van-divider
        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' ,fontSize:'0.3rem'}"
      >没有更多了</van-divider>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { instance } from "@/utils/axios.js";
import { NavBar, Toast, Tab, Tabs, Divider, CountDown } from "vant";

Vue.use(Tab);
Vue.use(Tabs);
Vue.use(NavBar).use(Toast);
Vue.use(Divider);
Vue.use(CountDown);
export default {
  data() {
    return {
      brandInfo: [],
      floorBar: [],
      floorBar2: ["推荐", "销量", "价格"],
      floorData: [],
      toggleData: [],
      startTime: 0,
      endTime: 0,
      viewNum: 0,
      tarbasActive: 0,
      urlID: "",
      time: 30 * 60 * 60 * 1000
    };
  },
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
      this.floorData = [];
      this.brandInfo = [];
      this.toggleData = [];
      this.floorBar = [];
    },
    onClickRight() {
      Toast("按钮");
    },
    changeTab(index, title) {
      this.tarbasActive = index;
      this.floorData = this.toggleData[index].slice(1);
    },
    changeTab2() {}
  },
  created() {
    if (this.$route.params.urlid) {
      //截取请求的ID
      this.urlID = this.$route.params.urlid
        .replace(/[^0-9]/gi, " ")
        .trim()
        .split(" ");
      this.urlID = this.urlID[0] + "_" + this.urlID[this.urlID.length - 1];
    } else {
      this.urlID = sessionStorage.getItem("brand_id");
    }

    instance
      .get("api/getBrandGoods", {
        params: {
          page: 1,
          brand_id: this.urlID,
          msort: 1,
          goods_utype: "C4"
        }
      })
      .then(res => {
        this.brandInfo = res.data.brandInfo;
        this.floorBar = res.data.floor_bar;
        this.toggleData = res.data.floor_data;
        if (res.data.goods) {
          this.floorData = res.data.goods;
        } else {
          this.floorData = res.data.floor_data[this.tarbasActive].slice(1);
        }
        // console.log(this.floorData);
      });
  },

  mounted() {
    sessionStorage.setItem("brand_id", this.urlID);
  },
  updated() {
    //时间戳
    let endTime = this.brandInfo.gs_end_time;
    let startTime = this.brandInfo.gs_start_time;
    this.startTime = startTime * 1;
    this.endTime = endTime * 1;
    let currentTime = new Date().getTime();
    // this.time = this.endTime - currentTime;
  }
};
</script>

<style lang="scss">
#countDown {
  .ct {
    font-size: 0.24rem;
    margin-bottom: 0.05rem;
  }
  .van-count-down {
    font-size: 0.3rem;
  }
}

#navBarBox {
  .van-nav-bar {
    height: 0.88rem;
  }
  .van-nav-bar__title,
  .van-nav-bar__left,
  .van-nav-bar__right {
    height: 0.88rem;
    font-size: 0.36rem;
    line-height: 0.88rem;
  }
  .van-nav-bar__left {
    .van-nav-bar__arrow {
      font-size: 0.28rem;
    }
    .van-icon {
      vertical-align: baseline;
    }
  }
  .van-nav-bar__text {
    vertical-align: baseline;
  }
}

#tarbas {
  .van-tabs__wrap,
  .van-hairline--top-bottom {
    height: 0.88rem !important;

    .van-tab__text {
      font-size: 0.26rem !important;
      color: black;
      font-weight: bold;
      line-height: 0.88rem;
    }
  }
}
</style>



<style lang="scss" scoped>
#brand {
  #branInfoBox {
    padding: 0.24rem 0.2rem;
    box-sizing: border-box;
    background: rgb(244, 244, 248);
    height: 1.9rem;
    .section {
      display: flex;
      align-items: center;
      height: 1.4rem;
      background: white;
      .contextBox {
        padding: 0 0.2rem;
        box-sizing: border-box;
        width: 100%;
        height: 1.1rem;
        display: flex;
        align-items: center;
        .imgBox {
          width: 0.92rem;
          height: 0.92rem;
          display: flex;
          align-items: center;
          img {
            display: block;
            width: 100%;
          }
        }
        .titleBox {
          padding: 0 0.2rem;
          box-sizing: border-box;
          flex-grow: 4;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          .topTitle {
            font-size: 0.34rem;
          }
          .bottomTitle {
            font-size: 0.3rem;
            color: #ccc;
          }
        }
        .iconBox {
          height: 0.8rem;
          flex-grow: 1;
          i {
            font-size: 0.5rem;
          }
        }
      }
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

  #countDown {
    height: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgb(228, 228, 228);
  }
}
</style>