<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-03-14 07:18:26
 * @LastEditors: kongwf
 * @LastEditTime: 2022-03-15 12:43:25
-->
<template>
  <van-nav-bar
    title="你的评论"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <div class="template">
    <div
      style="display: flex; justify-content: center; align-items: center"
      v-if="dataList.length === 0"
    >
      暂无评论
    </div>
    <data-table class="giveList" :dataList="dataList" :types="0"> </data-table>
  </div>
</template>

<script>
import { selectDynamicByName, selectCommentById } from "../../api/dynamic.js";
import dataTable from "../../components/dataTable.vue";
export default {
  components: {
    dataTable,
  },
  data() {
    return {
      dataList: [],
    };
  },
  mounted() {
    this.dataList = [];
    selectDynamicByName({ username: localStorage.getItem("userName") }).then(
      (res) => {
        console.log(res.data.data);
        let list = res.data.data;
        for (let i = 0; i < list.length; i++) {
          selectCommentById({
            id: list[i].dynamicId,
          }).then((r) => {
            console.log(r.data.data);
            for (let j = 0; j < r.data.data.length; j++) {
              this.dataList.push({
                name: r.data.data[j].userName,
                content: list[i].dynamicContent,
                port: localStorage.getItem("userPort"),
                username: localStorage.getItem("userName"),
                type: list[i].dynamicType,
                url: list[i].dynamicUrl,
                id: list[i].dynamicId,
                tport: r.data.data[j].userPort,
              });
            }
            console.log(this.dataList);
          });
        }
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

<style lang="scss" scoped></style>
