<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-03-13 15:21:29
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-16 01:06:02
-->
<template>
  <van-sticky>
    <van-nav-bar
      title="详情页"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  /></van-sticky>
  <div class="dynamicPage">
    <div class="article2">
      <b
        ><div class="title">
          <van-image
            class="headPortrait"
            round
            fit="cover"
            width="2rem"
            height="2rem"
            :src="dataView.port"
            rel="external nofollow"
          />{{ dataView.username }}
        </div></b
      >
      <div style="margin-top: 6px; width: 98%; margin-left: 5px">
        {{ dataView.content }}
      </div>
      <img v-if="dataView.types == 1" :src="dataView.url" />
      <videoMould v-if="dataView.types == 0" ref="videoM" :url="dataView.url" />
    </div>
    <div class="comment">
      <van-field
        v-model="message"
        rows="2"
        autosize
        label="评论"
        type="textarea"
        maxlength="50"
        placeholder="请输入评论"
        show-word-limit
        style="width: 90%"
      />
      <div class="footer" style="width: 100%">
        <van-button round @click="btn(0)" type="default" style="width: 65px"
          >清空</van-button
        >
        <van-button round @click="btn(1)" type="primary" style="width: 65px"
          >发布</van-button
        >
      </div>
      <div class="head">评论</div>
      <div class="content" v-for="(item, index) in commentList" :key="index">
        <b
          ><div class="title commentTop">
            <van-image
              class="headPortrait"
              round
              fit="cover"
              width="2rem"
              height="2rem"
              :src="item.port"
              rel="external nofollow"
            />{{ item.username }}
          </div></b
        >
        <div
          style="
            margin-top: 8px;
            width: 98%;
            margin-left: 5px;
            margin-bottom: 5px;
          "
        >
          {{ item.content }}
        </div>
        <div
          style="
            margin-top: 5px;
            width: 98%;
            margin-left: 5px;
            margin-bottom: 5px;
            color: #aaa;
          "
        >
          {{ item.time }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  selectCommentById,
  insertComment,
  updateDynamicComment,
} from "../../api/dynamic";
import videoMould from "../../components/videoMould.vue";
export default {
  components: {
    videoMould,
  },
  mounted() {
    var time = new Date();
    this.dataView = this.$route.query;
    console.log("5555", this.dataView);
    this.selectComment(this.dataView.id);
  },
  data() {
    return {
      message: "",
      dataView: {},
      commentList: [
        {
          username: "用户1",
          content: "内容内容",
          port: "https://img1.baidu.com/it/u=1368564221,2782574698&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500",
        },
        {
          username: "用户1",
          content: "内容内容",
          port: "https://img1.baidu.com/it/u=1368564221,2782574698&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500",
        },
        {
          username: "用户1",
          content: "内容内容",
          port: "https://img1.baidu.com/it/u=1368564221,2782574698&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500",
        },
      ],
    };
  },
  methods: {
    selectComment(id) {
      console.log(id);
      this.commentList = [];
      selectCommentById({ id: id }).then((res) => {
        console.log(res.data.data);
        let list = res.data.data;
        for (let i = 0; i < list.length; i++) {
          this.commentList.push({
            id: list[i].commentId,
            username: list[i].userName,
            content: list[i].text,
            port: list[i].userPort,
            time: list[i].time,
          });
        }
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    btn(e) {
      if (e) {
        insertComment({
          dynamicId: this.dataView.id,
          userName: localStorage.getItem("userName"),
          userPort: localStorage.getItem("userPort"),
          text: this.message,
        }).then((res) => {
          updateDynamicComment({
            id: this.dataView.id,
            comment: parseInt(this.dataView.comment) + 1,
          });
          this.selectComment(this.dataView.id);
          this.message = "";
          this.$Toast("评论成功");
        });
      } else {
        this.message = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dynamicPage {
  margin: 2px;
  border: 2px #eee solid;
  width: 100%;
  height: 100%;
}
.comment {
  border: 1px #eee solid;
  width: 100%;
  padding: 5px;
  margin-top: 10px;
  .content {
    margin-top: 4px;
    border-bottom: 1px #eee solid;
    display: flex;
    flex-direction: column;
    width: 98%;
    padding-top: 1px;
    padding-bottom: 15px;
    padding: 1px;
    margin-top: 8px;
    .title {
      display: flex;
      align-items: center;
    }
  }
}
.article2 {
  display: flex;
  flex-direction: column;
  width: 98%;
  padding-top: 1px;
  padding-bottom: 15px;
  padding: 1px;
  margin-top: 8px;
  .title {
    display: flex;
    align-items: center;
    margin-top: 8px;
    margin-left: 5px;
    text-overflow: ellipsis;
  }
}
.footer {
  width: 100%;
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
