<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-02-23 19:08:58
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-07 10:16:18
-->
<template>
  <div class="news">
    <div class="newsItem" @click="onclick(0)">
      <i class="iconfont">&#xec7f;</i>
      <div class="text">点赞</div>
      <!-- <div class="mes">
        <span class="mes-num"> {{ giveNum }} </span>
      </div> -->
    </div>
    <div class="newsItem" @click="onclick(1)">
      <i class="iconfont">&#xe891;</i>
      <div class="text">评论回复</div>
      <!-- <div class="mes">
        <span class="mes-num"> {{ commentNum }} </span>
      </div> -->
    </div>
    <div class="newsItem" @click="onclick(2)">
      <i class="iconfont">&#xe86f;</i>
      <div class="text">系统消息</div>
      <!-- <div class="mes">
        <span class="mes-num"> {{ systemNum }} </span>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      giveNum: 0,
      commentNum: 0,
      systemNum: 0,
    };
  },
  methods: {
    onclick(e) {
      switch (e) {
        case 0:
          this.$router.push({ path: "/giveTable" });
          break;
        case 1:
          this.$router.push({ path: "/commentTable" });
          break;
        case 2:
          this.$router.push({ path: "/systemMessage" });
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.news {
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
  .mes {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  }
  .mes-num {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 50px;
    width: 35px;
    height: 35px;
    box-shadow: 0 0 5px black;
    border-radius: 50%;
    background-color: orangered;
    color: #fff;
  }
}
</style>
