/*
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2021-11-22 11:42:20
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-07 09:32:09
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
{
    path: '/homePage',
    name: 'homePage',
    component: () => import('../views/page/homePage.vue')
  },{
    path: '/data',
    name: 'data',
    component: () => import('../views/page/data.vue')
  },{
    path: '/news',
    name: 'news',
    component: () => import('../views/page/news.vue')
  },{
    path: '/mine',
    name: 'mine',
    component: () => import('../views/page/mine.vue')
  }, {
    path: '/dynamic',
    name: 'dynamic',
    component: () => import('../views/page/dynamic.vue')
  },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/page/login.vue')
  },
  {
    path: '/startPage',
    name: 'startPage',
    component: () => import('../views/page/startPage.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/page/register.vue')
  },
  {
    path: '/giveTable',
    name: 'giveTable',
    component: () => import('../views/page/giveTable.vue')
  },
 {
    path: '/dynamicPage',
    name: 'dynamicPage',
    component: () => import('../views/page/dynamicPage.vue')
  },
  {
    path: '/commentTable',
    name: 'commentTable',
    component: () => import('../views/page/commentTable.vue')
  },
  {
    path: '/systemMessage',
    name: 'systemMessage',
    component: () => import('../views/page/systemMessage.vue')
  },
  {
    path: '/userMessage',
    name: 'userMessage',
    component: () => import('../views/page/userMessage.vue')
  },
  {
    path: '/changePassword',
    name: 'changePassword',
    component: () => import('../views/page/changePassword.vue')
  },
  {
    path: '/dynamicList',
    name: 'dynamicList',
    component: () => import('../views/page/dynamicList.vue')
  },
  {
    path: '/minePage',
    name: 'minePage',
    component: () => import('../views/page/minePage.vue')
  },
  {
    path: '/emliPage',
    name: 'emliPage',
    component: () => import('../views/page/emliPage.vue')
  },
  {
    path: '/portPage',
    name: 'portPage',
    component: () => import('../views/page/portPage.vue')
  },
  {
    path: '/reportPage',
    name: 'reportPage',
    component: () => import('../views/page/reportPage.vue')
  },
]

const router = createRouter({
    mode:'hash',
  history: createWebHashHistory(),
  routes,
})

 router.beforeEach((to,form,next)=>{
    let isLogin = localStorage.getItem("isLogin")
    
  if(isLogin || to.name == "login" || to.name == 'register' || to.name=='Home'){
      if(to.name == "/"){
        next({name:"/homePage"});
    }
    next();
  }else{
    next({name:"login"});
  }    
}) 

export default router
