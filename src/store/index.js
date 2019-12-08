import Vue from 'vue'
import Vuex from 'vuex'
import ads from './ads'
import user from "@/store/user";
import shared from "@/store/shared";
import orders from "@/store/orders";

Vue.use(Vuex)

export default new Vuex.Store({

  state: {

  },

  mutations: {
  },
  actions: {
  },
  modules: {
    ads,
    user,
    shared,
    orders
  }
})
