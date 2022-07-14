<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-02-23 19:09:23
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-06 09:56:20
-->
<template>
  <div class="mine">
    <div class="newsItem" @click="btn(0)">
      <i class="iconfont">&#xe600;</i>
      <div class="text">个人信息</div>
    </div>
    <div class="newsItem" @click="btn(1)">
      <i class="iconfont">&#xe605;</i>
      <div class="text">我的动态</div>
    </div>
    <van-button class="btn" type="danger" @click="LogOut()"
      >退出登录</van-button
    >
  </div>
</template>

<script>
export default {
  methods: {
    LogOut() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认退出登录吗？",
        })
        .then(() => {
          localStorage.setItem("isLogin", 0);
          localStorage.setItem("userId", 0);
          localStorage.setItem("userPort", 0);
          localStorage.setItem("userName", 0);
          this.$router.push({ path: "/login" });
        })
        .catch(() => {
          // on cancel
        });
    },
    btn(e) {
      switch (e) {
        case 0:
          this.$router.push({ path: "/minePage" });
          break;
        case 1:
          this.$router.push({ path: "/dynamicList" });
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.mine {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .newsItem {
    width: 100%;
    height: 80px;
    border: 1px #eee solid;
    display: flex;
    align-items: center;
    margin-top: 6px;
    i {
      margin-left: 15px;
      font-size: 58px;
    }
    .text {
      font-size: 20px;
    }
  }
  .btn {
    width: 100%;
    height: 60px;
    margin-top: 6px;
    font-size: 20px;
    border-radius: 8px;
  }
}
</style>
