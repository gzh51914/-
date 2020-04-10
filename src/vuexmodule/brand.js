import { instance } from "@/utils/axios.js";

const brandVuex = {
    namespaced: true,
    state: {
    },
    mutations: {
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
                console.log(res)

            });
        },
    },
    getters: {

    },
}

export default brandVuex;