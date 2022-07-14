<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-04-06 09:46:05
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-16 01:04:00
-->
<template>
  <van-sticky>
    <van-nav-bar
      title="我的动态"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  /></van-sticky>
  <van-pull-refresh
    v-model="isLoading"
    success-text="刷新成功"
    @refresh="onRefresh"
  >
    <div
      class="article2"
      v-for="(item, index) in dynamicTable"
      :key="index"
      :title="item"
    >
      <b @click="dynamic(item)"
        ><div class="title">
          <van-image
            class="headPortrait"
            round
            fit="cover"
            width="2rem"
            height="2rem"
            :src="item.port"
            rel="external nofollow"
          />{{ item.username }}
          <van-button
            @click.stop="delete1(item.id)"
            style="margin-left: 58%; border: 0px"
            >X</van-button
          >
        </div>
      </b>
      <div style="margin-top: 6px; width: 98%; margin-left: 5px">
        {{ item.content }}
      </div>
      <img v-if="item.types == 1" :src="item.url" />
      <videoMould v-if="item.types == 0" ref="videoM" :url="item.url" />
      <div class="bottom">
        <div>
          <i
            :class="{
              iconfont: true,
              dianzan: item.userdianzan === 1,
            }"
            @click="dianzan(index)"
            >&#xec7f;</i
          >{{ item.dianzan }}
        </div>
        <div>
          <i class="iconfont" @click="dynamic(item)">&#xe86f;</i
          >{{ item.comment }}
        </div>
      </div>
    </div></van-pull-refresh
  >
</template>

<script>
import videoMould from "../../components/videoMould.vue";
import {
  selectDynamic,
  selectGive,
  insertGive,
  updateDianzan,
} from "../../api/homePage.js";
import { selectDynamicByName, deleteDynamic } from "../../api/dynamic.js";
export default {
  components: { videoMould },
  data() {
    return {
      isLoading: true,
      dynamicTable: [],
    };
  },
  mounted() {
    this.selectDynamic();
  },
  methods: {
    dynamic(item) {
      this.$router.push({
        name: "dynamicPage",
        query: {
          id: item.id,
          username: item.username,
          url: item.url,
          content: item.content,
          port: item.port,
          comment: item.comment,
          types: item.types,
        },
      });
    },
    selectDynamic() {
      selectDynamicByName({ username: localStorage.getItem("userName") }).then(
        (res) => {
          let list = res.data.data;
          this.dynamicTable = [];
          for (let i = 0; i < list.length; i++) {
            selectGive({
              giveUsername: localStorage.getItem("userName"),
              dynamicId: list[i].dynamicId,
            }).then((r) => {
              this.dynamicTable.push({
                id: list[i].dynamicId,
                port: list[i].dynamicPort,
                username: list[i].userName,
                content: list[i].dynamicContent,
                types: list[i].dynamicType,
                url: list[i].dynamicUrl,
                dianzan: list[i].dynamicDianzan,
                comment: list[i].dynamicComment,
                userdianzan: r.data.data.length == 0 ? 0 : 1,
              });
            });
          }
        }
      );
    },
    delete1(id) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认删除该动态吗？",
        })
        .then(() => {
          deleteDynamic({
            dynamicId: id,
          }).then((res) => {
            this.$toast("删除成功");
            this.onRefresh();
          });
        });
    },
    dianzan(index) {
      if (this.dynamicTable[index].userdianzan == 0) {
        this.dynamicTable[index].dianzan =
          parseInt(this.dynamicTable[index].dianzan) + 1;
        this.dynamicTable[index].userdianzan = 1;
        insertGive({
          giveUsername: localStorage.getItem("userName"),
          dynamicId: this.dynamicTable[index].id,
          portUrl: localStorage.getItem("userPort"),
        });
        updateDianzan({
          id: this.dynamicTable[index].id + "",
          dianzan: this.dynamicTable[index].dianzan + "",
        });
      } else {
        this.$toast("您已点过赞");
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.selectDynamic();
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.article2 {
  display: flex;
  flex-direction: column;
  width: 98%;
  padding-top: 1px;
  padding-bottom: 15px;
  padding: 1px;
  border: 2px #eee solid;
  border-radius: 15px;
  margin-top: 8px;
  .title {
    display: flex;
    align-items: center;
    margin-top: 8px;
    margin-left: 5px;
    text-overflow: ellipsis;
  }
  .bottom {
    width: 100%;
    height: 30px;
    margin-top: 8px;
    display: flex;
    justify-content: space-around;
  }
}
.dianzan {
  color: #5566ee;
}
</style>
