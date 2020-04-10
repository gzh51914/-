<template>
  <div id="home" ref="homeDom">
    <div id="wapper" ref="wapper">
      <!-- 这个div是下拉刷新用的 -->

      <!--van-overlay 是遮罩层  -->
      <van-overlay :show="overlayFlag" />

      <div class="topTip" v-show="topTipFlag" style="text-align:center">
        <van-loading size="0.8rem" text-size="0.6rem" type="spinner" color="#1989fa">加载中...</van-loading>
      </div>

      <div id="topSearch">
        <div class="inputBox" @click="toSearch()">
          <div class="iconBox">
            <i class="iconfont icon-search"></i>
          </div>
          <input type="text" placeholder="搜索商品" />
        </div>
        <div class="textBox">搜索</div>
      </div>

      <div id="banner">
        <van-swipe :autoplay="3000" class="van-swipe" :show-indicators="false">
          <van-swipe-item v-for="(image, index) in bannerImages" :key="index">
            <img v-lazy="image" class="bannerImg" />
          </van-swipe-item>
        </van-swipe>
      </div>

      <div id="middleNav">
        <ul>
          <li v-for="(item,index) in middleNav" :key="index">
            <img :src="item.imgsrc" alt />
          </li>
        </ul>
      </div>
      <!-- 第一个广告图 -->
      <div id="adImgBox">
        <img src="../../public/images/gif1.gif" alt />
      </div>

      <!-- 框格 -->
      <div id="hotBox">
        <div class="leftBox">
          <img src="../../public/images/gif2.gif" alt />
        </div>
        <div class="rightBox">
          <div class="imgBox">
            <img src="../../public/images/hotImg1.png" alt />
          </div>
          <div class="imgBox">
            <img src="../../public/images/hotImg2.png" alt />
          </div>
        </div>
      </div>

      <!-- 第二个广告图 -->
      <div id="adImgBox2">
        <img src="../../public/images/gif3.gif" alt />
      </div>

      <!-- 第三个广告图 -->
      <div id="adImgBox3">
        <img src="../../public/images/adImg1.png" alt />
      </div>

      <!-- tag标签 -->

      <div id="tagBox" ref="tagBox">
        <keep-alive>
          <van-tabs v-model="tagActive" animated swipeable class="van-tabs" @click="onClick">
            <van-tab v-for="iname in tabData" :title="iname" :key="iname" class="van-tabs">
              <div class="toggleBox" v-if="showFlag">
                <router-link
                  v-for="item in homeData"
                  tag="div"
                  :to="{name:'brand',params:{shopid:item.goods_id,urlid:item.goods_jump_url}}"
                  :key="item.goods_id"
                  class="shopBox"
                >
                  <div class="imgBox">
                    <img :src="item.pic_url" alt />

                    <div class="logoBox">
                      <img :src="item.logo_url" alt />
                    </div>
                  </div>

                  <div class="textBox">
                    <div class="tips">{{item.coupon_tips}}</div>
                    <div class="content">
                      <div class="title">{{item.title}}</div>
                      <div class="timer">{{item.time_left}}</div>
                    </div>
                  </div>
                </router-link>
              </div>

              <div class="toggleBox" v-else>
                <router-link
                  v-for="item in homeData2"
                  tag="div"
                  :key="item.goods_id"
                  class="shopBox"
                  :to="{name:'detail',params:{shopid:item.goods_id}}"
                >
                  <div class="imgBox">
                    <img :src="item.pic_url" alt />

                    <div class="logoBox">
                      <img :src="item.logo_url" alt />
                    </div>
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
                      <div class="timer">{{item.time_left}}</div>
                    </div>
                  </div>
                </router-link>
              </div>
            </van-tab>
          </van-tabs>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import {
  Swipe,
  SwipeItem,
  Lazyload,
  Search,
  Tab,
  Tabs,
  Loading,
  Overlay
} from "vant";
Vue.use(Search);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Loading);
Vue.use(Overlay);
// import { instance } from "@/utils/axios.js";
import { mapActions, mapState, mapMutations } from "vuex";
import betterScroll from "better-scroll";
export default {
  beforeRouteLeave(to, from, next) {
    this.leaveRouter(); //离开清除数据
    next();
  },
  data() {
    return {
      searchValue: "",
      tagActive: 0,
      topTipFlag: false,
      overlayFlag: false,
      homeGoodsDataPageNum: 1,
      ajaxHomeFlag: false,
      betterScrollFlag: true,
      showFlag: true,
      homeArr: [],
      middleNav: [
        { imgsrc: require("../../public/images/middleNav1.png") },
        { imgsrc: require("../../public/images/middleNav2.png") },
        { imgsrc: require("../../public/images/middleNav3.png") },
        { imgsrc: require("../../public/images/middleNav4.png") }
      ],
      tabData: ["精选专场", "精选单品"]
    };
  },
  watch: {},
  computed: {
    ...mapState("home", ["bannerImages", "homeData", "homeData2"])
  },
  methods: {
    ...mapActions("home", ["homeAjax", "homeGoodsData", "homeGoodsData2"]),
    ...mapMutations("home", ["leaveRouter"]),
    onClick(name, title) {
      this.showFlag = !this.showFlag;
      this.homeGoodsDataPageNum = 1;
      this.leaveRouter();
      this.homeGoodsData2(this.homeGoodsDataPageNum);
    },
    toSearch() {
      this.$router.push("/search");
    }
  },
  created() {
    this.homeAjax(); //调用homeVuex模块的 actions里的异步请求

    this.homeGoodsData(this.homeGoodsDataPageNum);
  },
  mounted() {
    this.scroll = new betterScroll("#home", {
      click: true,
      scrollY: this.betterScrollFlag,
      pullDownRefresh: {
        threshold: 30, // 下拉距离超过20px触发pullingDown事件
        stop: 0 // 回弹停留在距离顶部0px的位置
      },
      pullUpLoad: {
        // 当上拉距离超过30px时触发 pullingUp 事件
        threshold: -30
      }
    });

    this.scroll.on("pullingDown", () => {
      this.topTipFlag = true;
      this.overlayFlag = true;
      // console.log("处理下拉刷新操作");

      setTimeout(() => {
        this.topTipFlag = false;
        this.overlayFlag = false;
        // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则下拉事件只会执行一次
        this.scroll.finishPullDown();
      }, 500);
    });

    this.scroll.on("pullingUp", () => {
      this.overlayFlag = true;
      this.homeGoodsDataPageNum++;

      if (this.showFlag) {
        this.homeGoodsData(this.homeGoodsDataPageNum).then(() => {
          this.overlayFlag = false;

          this.scroll.finishPullUp();
        });
      } else {
        this.homeGoodsData2(this.homeGoodsDataPageNum).then(() => {
          this.overlayFlag = false;

          this.scroll.finishPullUp();
        });
      }

      // console.log(this.homeGoodsDataPageNum);
    });
  }
};
</script>


<style lang="scss">
#tagBox {
  .van-tabs__wrap,
  .van-hairline--top-bottom {
    height: 0.88rem !important;

    .van-tab__text {
      font-size: 0.4rem !important;
      line-height: 0.88rem;
    }
  }
}
</style>


<style lang="scss" scoped>
#home {
  height: calc(100vh - 1rem);
  overflow: auto;
  #wapper {
    height: auto;
    #tagBox {
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
    }
  }
}

#hotBox {
  display: flex;
  justify-content: space-around;

  .leftBox {
    width: 3.75rem;
    height: 4.55rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .rightBox {
    width: 3.75rem;
    height: 4.55rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .imgBox {
      height: 2.2rem;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}

#middleNav {
  ul {
    display: flex;
    justify-content: space-around;
    li {
      height: 1.68rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
#adImgBox {
  height: 2.08rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
#adImgBox2 {
  height: 2.52rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
#adImgBox3 {
  height: 0.95rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
#topSearch {
  height: 0.88rem;
  display: flex;
  justify-content: space-between;
  .inputBox {
    padding-left: 0.3rem;
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

#banner {
  .van-swipe {
    width: 7.5rem;
    height: 2.9rem;
    .bannerImg {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>