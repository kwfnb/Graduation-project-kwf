<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-04-07 09:18:14
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-10 01:58:43
-->
<template>
  <van-sticky>
    <van-nav-bar
      title="举报页面"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  /></van-sticky>
  <div class="report">
    <div class="main">
      <van-checkbox-group v-model="result" class="checkbox">
        <van-checkbox class="check" name="1">涉黄暴</van-checkbox>
        <van-checkbox class="check" name="2">引战</van-checkbox>
        <van-checkbox class="check" name="3">违法广告</van-checkbox>
        <van-checkbox class="check" name="4">垃圾内容</van-checkbox>
        <van-checkbox class="check" name="5">辱骂他人</van-checkbox>
        <van-checkbox class="check" name="6">其他</van-checkbox>
      </van-checkbox-group>
      <van-cell-group style="margin-top: 20px">
        <van-field
          v-model="message"
          rows="2"
          autosize
          label=""
          type="textarea"
          maxlength="50"
          placeholder="请输入举报描述"
          show-word-limit
        />
      </van-cell-group>
    </div>
    <van-button type="danger" class="tijiao" @click="reportUp()"
      >提交</van-button
    >
  </div>
</template>
insertSystemMessage
<script>
import { insertReport } from "../../api/dynamic.js";
import { insertSystemMessage } from "../../api/login.js";
export default {
  data() {
    return {
      id: "",
      message: "",
      result: [],
    };
  },
  mounted() {
    this.id = this.$route.query.id;
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    reportUp() {
      if (this.result.toString() == "") {
        this.$toast("请选择至少一个举报类型");
      } else if (this.message == "" || this.message.length < 5) {
        this.$toast("请输入至少五个字符的举报描述");
      } else {
        insertReport({
          dynamicId: this.id,
          reportType: this.result.toString(),
          reportContent: this.message,
          userName: localStorage.getItem("userName"),
        }).then((res) => {
          this.$toast("举报提交成功");
          insertSystemMessage({
            title: "举报信息",
            content: `您的举报的动态id:${this.id}信息已提交，后台将在两到三工作日进行处理，请耐心等待`,
            footer: "体育云平台管理员",
            userName: localStorage.getItem("userName"),
          }).then(() => {
            this.$router.push({
              path: "/homePage",
            });
          });
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.report {
  display: flex;
  align-items: center;
  flex-direction: column;
  .main {
    border: 1px #eee solid;
    width: 90%;
    margin-top: 30px;
    .checkbox {
      display: flex;
      flex-wrap: wrap;
      .check {
        margin-left: 20px;
        margin-top: 10px;
      }
    }
  }
  .tijiao {
    margin-top: 10px;
    width: 90%;
    border-radius: 5px;
  }
}
</style>
