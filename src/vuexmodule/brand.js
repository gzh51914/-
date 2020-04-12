import { instance } from "@/utils/axios.js";

const brandVuex = {
    namespaced: true,
    state: {
        brandInfo: [],
        floorBar: [],
        floorData: [],
    },
    mutations: {
        setBrandInfo(state, arr) {
            state.brandInfo = arr;
        },
        setFloorBar(state, arr) {
            state.floorBar = arr;
        },
        setFloorData(state, arr) {
            state.floorData = arr;
        },
    },
    actions: {
        brandAjax(store, resId) {
            instance.get("api/getBrandGoods", {
                params: {
                    page: 1,
                    brand_id: resId,
                    msort: 1,
                    goods_utype: "C4"
                }
            }).then(res => {
                store.commit("setBrandInfo", res.data.brandInfo)
                store.commit("setFloorBar", res.data.floor_bar)
                store.commit("setFloorData", res.data.floor_data)
            });
        },
    },
    getters: {

    },
}

export default brandVuex;