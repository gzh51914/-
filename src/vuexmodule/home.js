
import { instance } from "@/utils/axios.js";
const homeVuex = {
    namespaced: true,
    state: {
        bannerImages: [],
        homeData: [],
        homeData2: [],
    },
    mutations: {
        changeBannerImages(state, newArr) {
            state.bannerImages = newArr
        },
        setHomeData(state, goodsArr) {
            state.homeData = state.homeData.concat(goodsArr);
        },
        setHomeData2(state, goodsArr) {
            state.homeData2 = state.homeData2.concat(goodsArr);
        },

        leaveRouter(state) {
            state.homeData = [];
            state.homeData2 = [];
        }

    },
    actions: {
        homeAjax(store) {

            instance.get("/api/getIndexFirstPaintInfo", {
                params: {
                    zy_ids: "p8_c4_l4",
                    app_name: "zhe",
                    catname: "newest_zhe"
                }
            }).then(res => {

                let slideData = res.data.adsInfo.slide_ads.config.slide;
                let slideArr = slideData.map(item => {
                    return item.pic;
                });
                store.commit("changeBannerImages", slideArr)

            });
        },
        homeGoodsData(store, pageNum) {
            instance.get("/api/getGoods", {
                params: {
                    page: pageNum,
                    zy_ids: "p8_c4_l4",
                    app_name: "zhe",
                    catname: "tab_hpzc",
                    flag: "tab_hpzc"
                }
            }).then(res => {
                let goodsArr = res.data.data.goods;
                store.commit("setHomeData", goodsArr)
                // console.log(res.data.data.goods)
            });
        },
        homeGoodsData2(store, pageNum) {
            instance.get("/api/getGoods", {
                params: {
                    page: pageNum,
                    zy_ids: "p8_c4_l4",
                    app_name: "zhe",
                    catname: "tab_hpdp",
                    flag: "tab_hpdp"
                }
            }).then(res => {
                let goodsArr = res.data.data.goods;
                store.commit("setHomeData2", goodsArr)
                // console.log(res.data.data.goods)
            });
        },


    },
    getters: {

    },
}

export default homeVuex;