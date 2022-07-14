<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-04-06 10:32:03
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-06 11:59:37
-->
<template>
  <van-sticky>
    <van-nav-bar
      title="绑定邮箱"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  /></van-sticky>
  <div class="main">
    <div class="content">
      <van-cell-group>
        <van-field
          v-model="emli"
          label="QQ邮箱"
          @blur="blur()"
          :disabled="disabled"
        />
      </van-cell-group>
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
        @click="btn()"
        type="danger"
        style="width: 90%; margin-top: 15px"
        >完成</van-button
      >
    </div>
  </div>
</template>

<script>
import { mailSend } from "../../api/mine.js";
import { generationCode } from "../../util/index.js";
import { updateUser } from "../../api/mine.js";
export default {
  data() {
    return {
      loading: false,
      disabled: false,
      emli: "",
      duisms: "",
      sms: "",
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    SMSon() {
      if (this.emli.substring(this.emli.indexOf("@") + 1) == "qq.com") {
      } else {
        this.$toast("请输入正确的邮箱格式");
        return;
      }
      this.duisms = generationCode();
      mailSend({
        userEmail: "1648026562@qq.com",
        to: this.emli,
        subject: "体育云平台验证码",
        text: `您的邮箱绑定验证码是：${this.duisms}，有效时间为1分钟`,
      }).then((res) => {
        this.loading = true;
        this.disabled = true;
        this.$toast("发送成功");
      });
      setTimeout(() => {
        this.duisms = "";
        this.loading = false;
        this.disabled = false;
        this.$toast("验证码失效，请重新发送");
      }, 60000);
    },
    blur() {
      if (this.emli.substring(this.emli.indexOf("@") + 1) == "qq.com") {
      } else {
        this.$toast("请输入正确的邮箱格式");
      }
    },
    btn() {
      console.log(localStorage.getItem("userId"));
      if (this.duisms == this.sms) {
        updateUser({
          userId: localStorage.getItem("userId"),
          userEmil: this.emli,
        }).then((res) => {
          this.$router.go(-1);
        });
      } else {
        this.$toast("验证码错误，请重新输入");
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
