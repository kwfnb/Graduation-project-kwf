<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-02-24 03:47:26
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-07 09:59:34
-->
<template>
  <div style="width: 100%">
    <div class="title">
      <span @click="push()">{{ title }}</span>
    </div>
    <div class="header">
      <div class="font th" v-for="(item, index) in header" :key="index">
        {{ item }}
      </div>
    </div>
    <div>
      <div class="text" v-for="(item1, index) in table" :key="index">
        <div class="td font" v-for="item2 in item1" :key="item2">
          {{ item2 }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    table: {
      type: Array,
      default: () => [
        [1, "曼联", "38", "30", "6", "2", "80/27", "96"],
        [2, "曼联", "38", "30", "6", "2", "80/27", "96"],
      ],
    },
    header: {
      type: Array,
      default: () => ["名次", "球队", "赛", "胜", "平", "负", "进/失", "积分"],
    },
    title: {
      type: String,
      default: "联赛名称",
    },
  },
  methods: {
    push() {
      this.$emit("listOpen");
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.font {
  /* white-space: nowrap; */
}
.title {
  width: 100%;
  height: 45px;
  background: #ee1a32;
  border: 1px #ee1a32 solid;
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 45px;
  border-radius: 12px 12px 0px 0px;
}
.header {
  width: 100%;
  height: 45px;
  background: #ee1a32;
  border: 1px #ee1a32 solid;
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 45px;
  display: flex;
  .th:not(:nth-child(2)) {
    flex: 1;
    white-space: nowrap;
  }
  .th:nth-child(2) {
    min-width: 25%;
    white-space: nowrap;
  }
}
.text {
  width: 100%;
  height: 45px;
  border: 1px #ee1a32 solid;
  color: #000;
  font-size: 16px;
  text-align: center;
  line-height: 45px;
  display: flex;
  justify-content: center;
  .td:not(:nth-child(2)) {
    flex: 1;
    white-space: nowrap;
  }
  .td:nth-child(2) {
    min-width: 23%;
    white-space: nowrap;
  }
}
</style>
