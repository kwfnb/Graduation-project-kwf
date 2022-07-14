<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-03-13 14:10:04
 * @LastEditors: kongwf
 * @LastEditTime: 2022-03-15 12:42:58
-->
<template>
  <van-nav-bar
    title="你的点赞"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />

  <div class="template">
    <div
      style="display: flex; justify-content: center; align-items: center"
      v-if="dataList.length === 0"
    >
      暂无点赞
    </div>
    <data-table class="giveList" :dataList="dataList" :types="1"> </data-table>
  </div>
</template>

<script>
import { selectDynamicByName } from "../../api/dynamic.js";
import { selectGive } from "../../api/homePage";
import dataTable from "../../components/dataTable.vue";
export default {
  components: { dataTable },
  mounted() {
    this.dataList = [];
    selectDynamicByName({ username: localStorage.getItem("userName") }).then(
      (res) => {
        console.log(res.data.data);
        let list = res.data.data;
        for (let i = 0; i < list.length; i++) {
          selectGive({
            dynamicId: list[i].dynamicId,
          }).then((r) => {
            console.log(r.data.data);
            for (let j = 0; j < r.data.data.length; j++) {
              this.dataList.push({
                name: r.data.data[j].giveUsername,
                content: list[i].dynamicContent,
                port: localStorage.getItem("userPort"),
                username: localStorage.getItem("userName"),
                type: list[i].dynamicType,
                url: list[i].dynamicUrl,
                id: list[i].dynamicId,
                tport: r.data.data[j].portUrl,
              });
            }
          });
        }
      }
    );
  },
  data() {
    return {
      dataList: [
        {
          name: "用户1",
          text: "内容内容内容内容内容",
        },
        {
          name: "用户2",
          text: "内容内容内容内容内容",
        },
        {
          name: "用户3",
          text: "内容内容内容内容内容",
        },
      ],
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.template {
  display: flex;
  margin-top: 5px;
  align-items: center;

  flex-direction: column;
}

.giveList {
  width: 90%;
}
</style>
