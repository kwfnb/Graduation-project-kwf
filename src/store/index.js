/*
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2021-11-22 11:42:20
 * @LastEditors: kongwf
 * @LastEditTime: 2022-02-27 04:08:13
 */
/* import Vue from 'vue' */
import { createStore } from 'vuex'

/* Vue.use(createStore) */
export default createStore({
  state: {
      loginUser:
      {userName:"",port:""}
    ,
  },
  mutations: {
      isLoginUser(userName,port){
          state.loginUser={
              userName:userName,port:port
          }
      }
  },
  actions: {
  },
  modules: {
  }
})
