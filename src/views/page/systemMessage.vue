<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-03-14 07:53:49
 * @LastEditors: kongwf
 * @LastEditTime: 2022-03-15 12:37:00
-->
<template>
  <van-sticky>
    <van-nav-bar
      title="系统消息"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  /></van-sticky>
  <div class="content" v-if="articleList.length == 0">暂时无数据</div>
  <div class="content">
    <div class="article" v-for="item in articleList" :key="item">
      <div class="title">{{ item.title }}</div>
      <div class="text">&nbsp;&nbsp;&nbsp;&nbsp;{{ item.content }}</div>
      <div class="footer">
        <b>{{ item.footer }}</b>
      </div>
    </div>
  </div>
</template>

<script>
import { selectSystemMessage } from "../../api/login";
export default {
  data() {
    return {
      articleList: [
        {
          title: "尊贵的，您好：",
          content:
            "感谢注册本app，您已经成为正式用户，感谢你对足球云的大力支持！！",
          footer: "足球云管理员",
        },
      ],
    };
  },
  mounted() {
    console.log({ username: localStorage.getItem("userName") });
    selectSystemMessage({ username: localStorage.getItem("userName") }).then(
      (res) => {
        this.articleList = res.data.data;
      }
    );
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  .article {
    border: 2px #eee solid;
    border-radius: 5px;
    height: 200px;
    width: 95%;
    margin-top: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .title {
      width: 92%;
    }
    .text {
      margin-top: 10px;
      width: 92%;
    }
    .footer {
      margin-top: 10px;
      width: 92%;
    }
  }
}
</style>
