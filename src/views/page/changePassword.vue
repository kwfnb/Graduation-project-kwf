<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-03-15 13:20:37
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-06 01:03:34
-->
<template>
  <van-sticky>
    <van-nav-bar
      title="修改密码"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  /></van-sticky>
  <div class="main">
    <div class="content">
      <van-cell-group>
        <van-field v-model="text1" type="password" label="新密码" />
      </van-cell-group>

      <van-field v-model="text2" type="password" label="确认密码" />
      <van-field v-model="tel" type="tel" label="手机号" />
      <van-field
        v-model="sms"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
      >
        <template #button>
          <van-button
            size="small"
            type="primary"
            :loading="loading"
            @click="SMSon()"
            >发送验证码</van-button
          >
        </template>
      </van-field>
    </div>
    <div class="footer" style="width: 100%">
      <van-button
        round
        @click="btn(1)"
        type="danger"
        style="width: 90%; margin-top: 15px"
        >完成</van-button
      >
    </div>
  </div>
</template>

<script>
import { SMSverification } from "../../api/login.js";
import { updateUser } from "../../api/mine.js";
export default {
  data() {
    return {
      text1: "",
      loading: false,
      tel: "",
      sms: "",
      text2: "",
      emil: "",
      radio: "",
      DuiMa: "",
    };
  },
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    btn(e) {
      if (this.text1 != "" && this.text1 != "") {
        if (this.text1 == this.text2) {
          if (this.DuiMa == this.sms) {
            updateUser({
              userId: localStorage.getItem("userId"),
              userPassword: this.text2,
            }).then((res) => {
              this.$toast("修改成功请重新登录");
              localStorage.setItem("isLogin", 0);
              localStorage.setItem("userId", 0);
              localStorage.setItem("userPort", 0);
              localStorage.setItem("userName", 0);
              this.$router.push({ path: "/login" });
            });
          } else {
            this.$toast("密码确认不一致");
          }
        } else {
          this.$toast("密码确认不一致");
        }
      } else {
        this.$toast("请输入新密码");
      }
    },
    SMSon() {
      if (this.tel == "" && this.tel != 11) {
        this.$toast("请输入正确手机号码");
      } else {
        this.DuiMa = "";
        for (let i = 0; i < 4; i++) {
          this.DuiMa += Math.floor(Math.random() * 10);
        }
        SMSverification({
          content: `【体育云平台】你的验证码是：${this.DuiMa}，3分钟内有效！`,
          mobile: this.tel,
        }).then((res) => {
          this.SMSMAshow = true;
          this.loading = true;
          this.$toast("验证码已发送");
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  align-items: center;
  flex-direction: column;
  .content {
    display: felx;
    justify-content: center;
    width: 92%;
    margin-top: 5px;
    border: 2px #eee solid;
  }
}
.footer {
  width: 100%;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
}
</style>
