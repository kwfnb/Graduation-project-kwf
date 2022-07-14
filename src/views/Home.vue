<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2021-11-22 11:42:20
 * @LastEditors: kongwf
 * @LastEditTime: 2022-02-27 04:35:52
-->
<template>
  <div class="home">
    <homeTop v-if="show" :page="newPage" :index="pageIndex" :userPort="port" />
    <div class="main"><router-view /></div>
    <homeFooter :currentIndex="pageIndex" @getTab="getTab" />
  </div>
</template>

<script>
import store from "../store";
import homeTop from "../components/homeTop.vue";
import homeFooter from "../components/homeFooter.vue";
export default {
  name: "Home",
  components: {
    homeTop,
    homeFooter,
  },
  data() {
    return {
      newPage: { icon: "&#xe62a;", text: "首页", to: { name: "/homePage" } },
      pageIndex: 0,
      show: true,
      port: "https://img.yzcdn.cn/vant/cat.jpeg",
      userName: "",
    };
  },
  mounted() {
    this.port = localStorage.getItem("userPort");
    this.userName = localStorage.getItem("userName");
  },
  methods: {
    getTab(e, i) {
      console.log(i);
      /* if (i === 2) {
        this.show = false;
      } else {
        this.show = true;
      } */

      this.$router.push({ path: e.to.name });
      this.newPage = e;
      this.pageIndex = i;
    },
  },
};
</script>

<style lang="scss" scoped>
template {
  display: flex;
  flex-direction: column;
}
* {
  margin: 0;
  padding: 0;
}
.home {
  flex-grow: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.main {
  display: flex;
  flex-grow: 1;
  margin-top: 1%;
  width: 95%;
  height: 100%;
}
</style>
