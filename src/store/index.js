import Vue from 'vue'
import Vuex from 'vuex'

import home from "@/vuexmodule/home.js"
import classify from "@/vuexmodule/classify.js"
import cart from "@/vuexmodule/cart.js"
import personal from "@/vuexmodule/personal.js"
import brand from "@/vuexmodule/brand.js"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home,
    classify,
    cart,
    personal,
    brand
  }
})
