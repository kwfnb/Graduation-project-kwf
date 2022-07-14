<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-02-21 23:06:36
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-06 21:56:54
-->
<template>
  <div class="top">
    <div style="margin-top: 5px">
      <i class="iconfont" v-if="index === 0">&#xe62a;</i
      ><i class="iconfont" v-if="index === 1">&#xe65d;</i
      ><i class="iconfont" v-if="index === 2">&#xe657;</i
      ><i class="iconfont" v-if="index === 3">&#xe86f;</i
      ><i class="iconfont" v-if="index === 4">&#xe608;</i>{{ page.text }}
    </div>
    <div>
      <van-image
        class="headPortrait"
        round
        fit="cover"
        width="2rem"
        height="2rem"
        :src="userPort"
        rel="external nofollow"
        @click.stop="inPort()"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["page", "index", "userPort"],
  methods: {
    inPort() {
      this.$router.push({ path: "/portPage" });
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-between;
  width: 90%;
  padding: 8px 10px;
  border: 1px rgb(203, 203, 203) solid;
  border-radius: 10px;
  .headPortrait {
  }
}
</style>
