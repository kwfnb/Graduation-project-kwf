<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-02-21 23:55:39
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-16 01:03:25
-->
<template>
  <div class="homePage">
    <van-swipe class="my-swipe" :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
    <van-notice-bar style="margin: 8px 0px" :text="text" left-icon="volume-o" />
    <van-tabs v-model="active">
      <van-tab title="简讯"
        ><van-pull-refresh
          v-model="isLoading"
          success-text="刷新成功"
          @refresh="onRefresh"
        >
          <div>
            <div
              class="article1"
              v-for="item in articleTable"
              :key="item"
              :title="item"
            >
              <b
                ><div class="title">{{ item.title }}</div></b
              >
              <div style="margin-top: 6px; color: #aaa">{{ item.content }}</div>
              <div><van-image :src="`https:${item.picUrl}`"></van-image></div>
              <a :href="item.url">去往详情页</a>
            </div>
          </div>

          <div></div> </van-pull-refresh
      ></van-tab>
      <van-tab title="动态">
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
              </div></b
            >
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
              <div>
                <i class="iconfont" @click="report(item)">&#xe601;</i>
              </div>
            </div>
          </div></van-pull-refresh
        ></van-tab
      >
    </van-tabs>
  </div>
</template>

<script>
import axios from "axios";
import {
  selectArticle,
  selectDynamic,
  updateDianzan,
  selectGive,
  insertGive,
} from "../../api/homePage.js";
import videoMould from "../../components/videoMould.vue";
export default {
  components: {
    videoMould,
  },
  data() {
    return {
      active: 0,
      text: "2022年02月24，在西班牙马德里进行的2021-2022赛季欧洲足球冠军联赛八分之一决赛首回合比赛中，西甲马德里竞技队以1比1战平英超曼联队。",
      images: [
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.zhimg.com%2Fv2-f752efa9ef35bc5c93721d80d12f6d85_r.jpg&refer=http%3A%2F%2Fpic2.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648211940&t=3d5d4cbafe594c448d639ae81883fa44",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc1.hoopchina.com.cn%2Fuploads%2Fstar%2Fevent%2Fimages%2F190922%2Faa43668f353a205b13e5de3d1cd366316feb6aca.jpg&refer=http%3A%2F%2Fc1.hoopchina.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648212014&t=c64d630d1cd6f469e8a8b915fbbf2e35",
        "https://img1.baidu.com/it/u=1368564221,2782574698&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500",
      ],
      isLoading: false,
      articleTable: [],
      dynamicTable: [],
    };
  },
  mounted() {
    this.selectArticle();
    this.selectDynamic();
  },
  methods: {
    selectArticle() {
      /* selectArticle().then((res) => {
        let list = res.data.data;
        this.articleTable = [];
        for (let i = 0; i < list.length; i++) {
          this.articleTable.push({
            title: list[i].newsletterTitle,
            content: list[i].newsletterContent,
          });
        }
      }); */
      axios
        .post(
          "http://api.tianapi.com/football/index?key=1533d584a3a5b858b366c0535ea70a38&num=50"
        )
        .then((res) => {
          let list = res.data.newslist;
          this.articleTable = [];
          for (let i = 0; i < list.length; i++) {
            this.articleTable.push({
              title: list[i].title,
              content: list[i].ctime,
              url: list[i].url,
              picUrl: list[i].picUrl,
            });
          }
        });
    },
    selectDynamic() {
      selectDynamic({ size: 11 }).then((res) => {
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
      });
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.selectArticle();
        this.selectDynamic();
      }, 1000);
    },
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
    report(item) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "是否举报该动态",
        })
        .then(() => {
          this.$router.push({
            name: "reportPage",
            query: {
              id: item.id,
            },
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
  },
};
</script>

<style lang="scss" scoped>
* {
}
.video-js .vjs-icon-placeholder {
  width: 100%;
  height: 100%;
  display: block;
}
.my-swipe {
  height: 230px;
}
img {
  width: 100%;
}
.homePage {
  width: 100%;
  height: 100%;
  padding-bottom: 50px;
}
.biaoti {
  width: 100%;
}
.article1 {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  width: 98%;
  padding-top: 1px;
  padding-bottom: 15px;
  padding: 1px;
  border: 2px #eee solid;
  border-radius: 15px;
  margin-top: 8px;
  .title {
    margin-top: 8px;
    text-overflow: ellipsis;
  }
  a {
    color: #ff293e;
    text-decoration: none;
  }
  a:visited {
    color: #ff293e;
    text-decoration: none;
  }
  a:hover {
    color: #ff293e;
    text-decoration: underline;
  }
  a:active {
    color: #ff293e;
  }
}
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
