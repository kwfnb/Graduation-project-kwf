<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-02-21 23:18:01
 * @LastEditors: kongwf
 * @LastEditTime: 2022-02-24 21:37:16
-->
<template>
  <div class="docker">
    <div
      v-for="(item, index) in dockerList"
      :class="{
        docker__item: true,
        'docker__item--active': index === currentIndex,
      }"
      :key="item.icon"
      @click="onclick(index)"
    >
      <div class="iconfont" v-html="item.icon" />
      <div v-if="item.text != ''" class="docker__title">{{ item.text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homeFooter",
  props: {
    currentIndex: { default: () => 0 },
  },
  data() {
    return {
      currentIndex: 0,
      dockerList: [
        { icon: "&#xe62a;", text: "首页", to: { name: "/homePage" } },
        { icon: "&#xe65d;", text: "数据", to: { name: "/data" } },
        { icon: "&#xe657;", text: "发动态", to: { name: "/dynamic" } },
        { icon: "&#xe86f;", text: "消息", to: { name: "/news" } },
        { icon: "&#xe608;", text: "我的", to: { name: "/mine" } },
      ],
    };
  },
  methods: {
    onclick(e) {
      this.currentIndex = e;
      this.$emit("getTab", this.dockerList[e], e);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../style/viriables.scss";
.docker {
  display: flex;
  width: 100%;
  position: fixed;
  bottom: 0;
  background: #fff;
  &__item {
    flex: 1;
    text-align: center;
    a {
      color: $content-fontcolor;
      text-decoration: none;
    }
    &--active {
      color: #1fa4fc;
    }
  }
  &__title {
    transform-origin: center top;
  }
}
</style>
