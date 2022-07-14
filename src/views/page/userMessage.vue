<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-03-15 12:48:15
 * @LastEditors: kongwf
 * @LastEditTime: 2022-03-16 23:55:49
-->
<template>
  <van-sticky>
    <van-nav-bar
      title="个人信息"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  /></van-sticky>
  <div class="wai">
    <div class="table" @click="btn(0)">
      <i class="iconfont i">&#xe8b7;</i>
      <div class="li">修改个人信息</div>
    </div>
    <div class="table">
      <i class="iconfont i">&#xe8b2;</i>
      <div class="li">修改密码</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    btn(e) {
      switch (e) {
        case 0:
          this.$router.push({ path: "/minePage" });
          break;
        case 1:
          break;

        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wai {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.table {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
  border: 2px #eee solid;
  border-radius: 5px;
  width: 92%;
  height: 80px;
  i {
    margin-left: 15px;
    font-size: 58px;
  }
  .li {
    margin-left: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-size: 24px;
  }
}
</style>
