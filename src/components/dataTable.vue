<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-03-12 14:25:14
 * @LastEditors: kongwf
 * @LastEditTime: 2022-03-14 09:15:44
-->
<template>
  <div>
    <div
      v-if="types === 0"
      class="li"
      v-for="(item, index) in dataList"
      :key="index"
    >
      <van-image
        class="headPortrait"
        round
        fit="cover"
        width="2rem"
        height="2rem"
        :src="item.tport"
        rel="external nofollow"
      />
      {{ item.name }}评论了你的动态
      <div class="dynamic">
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
            />:{{ item.content }}
            <div v-if="item.type == 0">[视频]</div>
            <div v-if="item.type == 1">[图片]</div>
          </div></b
        >
      </div>
    </div>
    <div
      v-if="types === 1"
      class="li"
      v-for="(item, index) in dataList"
      :key="index"
    >
      <van-image
        class="headPortrait"
        round
        fit="cover"
        width="2rem"
        height="2rem"
        :src="item.tport"
        rel="external nofollow"
      />{{ item.name }}点赞了你的动态
      <div class="dynamic">
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
            />:{{ item.content }}
            <div v-if="item.type == 0">[视频]</div>
            <div v-if="item.type == 1">[图片]</div>
          </div></b
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataList: { default: () => [] },
    types: { default: () => 0 },
  },
  mounted() {},
  data() {
    return {};
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
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.li {
  width: 100%;
  height: 120px;
  border: 1px #eee solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 3%;
}

.dynamic {
  margin-top: 10px;
  width: 90%;
  height: 50%;
}
.text {
  padding: 10px;
}
.title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  margin-left: 5px;
  text-overflow: ellipsis;
}
</style>
