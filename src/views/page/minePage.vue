<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-03-16 23:48:02
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-06 11:44:35
-->
<template>
  <van-sticky>
    <van-nav-bar
      title="个人信息"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  /></van-sticky>
  <div class="main">
    <div style="min-width: 100%">
      <van-cell-group>
        <van-cell title="用户名" :value="dataTable.username" />
        <van-cell title="userId" :value="dataTable.userId" />
        <van-cell title="手机号" :value="dataTable.phone" />
        <van-cell title="邮箱" :value="dataTable.emli" />
        <van-cell title="创建时间" :value="dataTable.ctreaTime" />
        <van-cell title="登录天数" :value="dataTable.loginTime" />
        <van-cell title="用户等级" :value="dataTable.grade" />
      </van-cell-group>
    </div>
    <van-button class="btn" type="primary" @click="emliIn()">
      {{ dataTable.emli ? "改绑邮箱" : "绑定邮箱" }}
    </van-button>
    <van-button class="btn" type="danger" @click="LogOut()"
      >修改密码</van-button
    >
  </div>
</template>

<script>
import { selectUserByName } from "../../api/login.js";
export default {
  data() {
    return {
      dataTable: {
        username: "",
        userId: "",
        phone: "",
        emli: "",
        ctreaTime: "",
        loginTime: "",
        grade: "",
      },
    };
  },
  mounted() {
    let endTime = new Date(); // 结束时间
    selectUserByName({
      userName: localStorage.getItem("userName"),
    }).then((res) => {
      let list = res.data.data;
      let time = new Date(list.userCreateTime.split(" ")[0]);
      this.dataTable = {
        username: list.userName,
        userId: list.userId,
        phone: list.userPhone,
        emli: list.userEmil,
        ctreaTime: list.userCreateTime,
        loginTime: Math.floor((endTime - time) / 1000 / 60 / 60 / 24) + 1,
        grade: list.userLevel,
      };
    });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    LogOut() {
      this.$router.push({
        name: "changePassword",
        params: {
          id: this.dataTable.userId,
        },
      });
    },
    emliIn() {
      this.$router.push({
        path: "/emliPage",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 92%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.btn {
  width: 100%;
  height: 60px;
  margin-top: 6px;
  font-size: 20px;
  border-radius: 8px;
  margin-left: 28px;
}
</style>
