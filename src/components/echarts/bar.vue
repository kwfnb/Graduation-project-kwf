<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2021-11-04 14:49:45
 * @LastEditors: kongwf
 * @LastEditTime: 2022-02-24 06:36:24
-->
<template>
  <div class="bar" id="bar"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      myChart: null,
      initData: {
        grid: {
          left: "3%",
          right: "4%",
          bottom: "12%",
          containLabel: true,
        },
      },
    };
  },
  props: ["opData", "title", "grid"],
  watch: {
    opData: {
      handler: function (newValue, oldValue) {
        this.$nextTick(() => {
          this.setChartOption();
        });
      },
      deep: true,
    },
  },
  mounted() {
    console.log(111);
    this.$nextTick(() => {
      this.setChartOption();
    });
  },
  methods: {
    setChartOption() {
      // 基于准备好的dom，初始化echarts实例
      if (this.myChart == null) {
        this.myChart = echarts.init(document.getElementById("bar"));
      }
      console.log(this.grid);
      // 绘制图表
      this.myChart.setOption({
        title: {
          text: this.title,
        },
        tooltip: {},
        legend: {
          data: this.opData.legend,
          bottom: 0,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: this.grid ? this.grid : this.initData.grid,
        xAxis: {
          data: this.opData.xAxis,
        },
        yAxis: {},
        series: this.opData.series,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.bar {
  width: 100%;
  height: 100%;
}
</style>
