<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-02-22 21:28:40
 * @LastEditors: kongwf
 * @LastEditTime: 2022-03-30 06:29:57
-->
<template>
  <div style="width: 100%; margin-bottom: 60px">
    <listMould
      @listOpen="listOpen"
      :table="table"
      :header="headers"
      :title="title"
    ></listMould>
    <van-popup
      v-model:show="show"
      round
      position="bottom"
      :style="{ height: '30%' }"
      ><van-picker
        show-toolbar
        ref="picker"
        title="选择联赛"
        :columns="columns"
        @cancel="cancel()"
        @confirm="confirm()"
    /></van-popup>
    <div class="bar">
      <bar
        ref="bar1"
        style="width: 350px; height: 350px"
        :opData="barTable"
        title="前五球队进球/失球分布图"
      ></bar>
    </div>
  </div>
</template>

<script>
import { selectByMatch } from "../../api/data.js";
import listMould from "../../components/listMould.vue";
import bar from "../../components/echarts/bar.vue";
export default {
  components: {
    listMould,
    bar,
  },
  data() {
    return {
      show: false,
      title: "2021/2022 英超",
      headers: ["名次", "球队", "赛", "胜", "平", "负", "进/失", "积分"],
      barTable: {
        legend: [],
        series: [
          {
            type: "bar",
            name: "进球数",
            data: ["34", "28", "24", "19", "11", "18", "18", "20"],
            color: "#ff5555",
          },
          {
            type: "bar",
            name: "失球数",
            data: ["20", "15", "17", "24", "29", "23", "15", "29"],
          },
        ],
        xAxis: ["西汉", "中鲁", "许泪", "武仁", "汉古", "南成", "西陵", "三岭"],
      },
      table: [],
      columns: [
        {
          values: ["英超", "西甲", "意甲", "德甲", "法甲"],
          defaultIndex: 2,
        },
        // 第二列
        {
          values: ["2021/2022", "2020/2021", "2019/2020"],
          defaultIndex: 1,
        },
      ],
    };
  },
  mounted() {
    this.selectByMatch();
  },
  methods: {
    selectByMatch() {
      this.barTable = {
        legend: [],
        series: [
          {
            type: "bar",
            name: "进球数",
            data: [],
            color: "#ff5555",
          },
          {
            type: "bar",
            name: "失球数",
            data: [],
          },
        ],
        xAxis: [],
      };
      this.table = [];
      let temp = [];
      let leagueId =
        this.columns[0].values.indexOf(this.title.split(" ")[1]) + 1;
      console.log({
        leagueId: leagueId + "",
        matchTime: this.title.split(" ")[0],
      });
      selectByMatch({
        leagueId: leagueId,
        matchTime: this.title.split(" ")[0],
      }).then((res) => {
        let list = res.data.data;
        for (let i = 0; i < list.length; i++) {
          temp = [];
          temp.push(i + 1);
          temp.push(list[i].teamName);
          temp.push(list[i].matchNumber);
          temp.push(list[i].win);
          temp.push(list[i].draw);
          temp.push(list[i].lose);
          temp.push(`${list[i].goal}/${list[i].fumble}`);
          temp.push(list[i].integral);
          this.table.push(temp);
          if (i < 5) {
            this.barTable.xAxis.push(list[i].teamName);
            this.barTable.series[0].data.push(list[i].goal);
            this.barTable.series[1].data.push(list[i].fumble);
          }
        }
        console.log("this.barTable", this.barTable);
      });
    },
    listOpen() {
      this.show = true;
    },
    cancel() {
      this.show = false;
    },
    confirm(value) {
      this.title = `${this.$refs["picker"].getValues()[1]} ${
        this.$refs["picker"].getValues()[0]
      }`;
      this.selectByMatch();
      this.show = false;
    },
  },
};
</script>

<style>
.bar {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
