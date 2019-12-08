import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/components/Home";
import Add from "@/components/Ads/Add";
import AddList from "@/components/Ads/AddList";
import NewAd from "@/components/Ads/NewAd";
import Registration from "@/components/Auth/Registration";
import Login from "@/components/Auth/Login";
import Orders from "@/components/User/Orders";
import {AuthGuard, } from './auth-guard';
Vue.use(VueRouter);

const routes = [
  {
    path:'/',
    name:'home',
    component:Home
  },
  {
    path:'/ad/:id',
    props:true,
    name:'add',
    component:Add
  },
  {
    path:'/list',
    name:'addList',
    component:AddList,
    beforeEnter:AuthGuard
  },
  {
    path:'/new',
    name:'newAd',
    component:NewAd,
    beforeEnter:AuthGuard
  },
  {
    path:'/registration',
    name:'registration',
    component:Registration,



  },
  {
    path:'/login',
    name:'login',
    component:Login,

  },
  {
    path:'/orders',
    name:'orders',
    component:Orders,
    beforeEnter:AuthGuard
  },

]


const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
