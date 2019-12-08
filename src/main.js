import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import BuyModal from "@/components/Shared/BuyModal";

import * as fb from 'firebase'

Vue.config.productionTip = false;
Vue.component('add-buy-modal', BuyModal);


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created(){
    // Your web app's Firebase configuration

    // Initialize Firebase
    fb.initializeApp({
      apiKey: "AIzaSyClxb03sHmu1TSvt-y3EpkmA4Ynxw89fCU",
      authDomain: "vue-ads-project-7cf8f.firebaseapp.com",
      databaseURL: "https://vue-ads-project-7cf8f.firebaseio.com",
      projectId: "vue-ads-project-7cf8f",
      storageBucket: "vue-ads-project-7cf8f.appspot.com",
      messagingSenderId: "570396779435",
      appId: "1:570396779435:web:36d0dc4ea391866163a8ee",
      measurementId: "G-DE1FQDBEHC"
    });
    fb.analytics();
    fb.auth().onAuthStateChanged(user =>{
      if (user){
        this.$store.dispatch('autoLoginUser',user);
      }
    })
    this.$store.dispatch('fetchAds');
  }
}).$mount('#app')
