<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2021-11-25 10:30:12
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-16 15:24:05
-->
<template>
  <div class="register">
    <div style="margin-bottom: 15px; color: #fff; font-size: 28px">
      注册界面
    </div>
    <input
      type="text"
      class="loginUser"
      v-model="registerList.username"
      placeholder="请输入账号"
    />
    <input
      type="password"
      class="loginUser"
      v-model="registerList.password"
      placeholder="请输入密码"
      style="margin-top: 30px"
    />
    <input
      type="password"
      class="loginUser"
      v-model="registerList.passwordTo"
      placeholder="请确认密码"
      style="margin-top: 30px"
    />
    <input
      class="loginUser"
      v-model="registerList.phone"
      placeholder="请输入手机号"
      style="margin-top: 30px"
    />
    <van-button
      round
      @click="getSMS()"
      type="primary"
      style="width: 80%; margin-top: 30px"
      :loading="btnLoading"
      >获取验证码</van-button
    >
    <input
      class="loginUser"
      v-show="SMSMAshow"
      v-model="registerList.SMSMA"
      placeholder="请输入验证码"
      style="margin-top: 30px"
    />
    <div class="footer" style="width: 100%">
      <van-button round @click="btn(0)" type="default" style="width: 80px"
        >清空</van-button
      >
      <van-button round @click="btn(1)" type="primary" style="width: 80px"
        >注册</van-button
      >
    </div>
    <span
      @click="login()"
      style="margin-bottom: 15px; color: #fff; font-size: 20px"
      >已注册，前往登录</span
    >
  </div>
</template>

<script>
import {
  insertUser,
  insertSystemMessage,
  SMSverification,
} from "../../api/login.js";
export default {
  data() {
    return {
      btnLoading: false,
      SMSMAshow: 0,
      DuiMa: "",
      registerList: {
        username: "",
        password: "",
        passwordTo: "",
        SMSMA: "",
        phone: "",
      },
    };
  },
  methods: {
    login() {
      this.$router.push({ path: "/login" });
    },
    btn(e) {
      if (e) {
        if (this.registerList.password === this.registerList.passwordTo) {
          if (this.registerList.SMSMA != this.DuiMa) {
            this.$toast("验证码错误");
            return;
          }
          console.log({
            userName: this.registerList.username,
            userPassword: this.registerList.password,
            userPort:
              "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.616pic.com%2Fys_bnew_img%2F00%2F10%2F83%2F54xXAJVRIn.jpg&refer=http%3A%2F%2Fpic.616pic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1649907546&t=2f679a501757b90e10437b4e2583a44d",
            userPhone: this.registerList.phone,
            userLevel: 1,
          });
          insertUser({
            userName: this.registerList.username,
            userPassword: this.registerList.password,
            userPort:
              "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.616pic.com%2Fys_bnew_img%2F00%2F10%2F83%2F54xXAJVRIn.jpg&refer=http%3A%2F%2Fpic.616pic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1649907546&t=2f679a501757b90e10437b4e2583a44d",
            userPhone: this.registerList.phone,
            userLevel: "1",
          })
            .then(() => {
              this.$toast("注册成功");
              insertSystemMessage({
                userName: this.registerList.username,
                title: `尊贵的${this.registerList.username}，您好：`,
                content:
                  "感谢注册本app，您已经成为正式用户，感谢你对足球云的大力支持！！",
                footer: "足球云管理员",
              });
              this.$router.push({ path: "/login" });
            })
            .catch((e) => {
              this.$toast("用户名重复");
            });
        } else {
          this.$toast("密码和确认密码不一致");
        }
      } else {
        this.registerList = {
          username: "",
          password: "",
          passwordTo: "",
        };
      }
    },
    getSMS() {
      if (
        this.registerList.phone == "" ||
        this.registerList.phone.length < 11
      ) {
        this.$toast("请输入正确手机号");
        return 0;
      }
      this.DuiMa = "";
      for (let i = 0; i < 4; i++) {
        this.DuiMa += Math.floor(Math.random() * 10);
      }
      SMSverification({
        content: `【体育云平台】你的验证码是：${this.DuiMa}，3分钟内有效！`,
        mobile: this.registerList.phone,
      }).then((res) => {
        this.SMSMAshow = true;
        this.btnLoading = true;
        this.$toast("验证码已发送");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url(../../assets/images/loginAndStart/register.png);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 100%;
  .loginUser {
    background: none;
    outline: none;
    border: 1px solid #ccc;
    color: #fff;
    width: 80%;
    height: 40px;
    border-radius: 20px;
    background-color: rgba(185, 185, 185, 0.43);
    border-color: rgba(0, 0, 0, 0);
    line-height: 40px;
    text-align: center;
  }
  input::-webkit-input-placeholder {
    font-family: PingFangSC;
    font-weight: 400;
    font-size: 14px;
    color: #fff;
  }
  .footer {
    width: 100%;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
</style>
