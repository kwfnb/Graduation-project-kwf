<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2021-11-03 15:20:49
 * @LastEditors: kongwf
 * @LastEditTime: 2022-02-24 06:17:01
-->
<template>
  <div class="line" id="line"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "linew",
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
  props: ["opData", "title", "grid", "tooltip", "toolbox"],
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
    this.$nextTick(() => {
      this.setChartOption();
    });
  },
  methods: {
    setChartOption() {
      // 基于准备好的dom，初始化echarts实例
      if (this.myChart == null) {
        this.myChart = echarts.init(document.getElementById("line"));
      }
      let option = {
        title: {
          text: this.title,
        },
        //弹出框信息排序
        tooltip: this.tooltip
          ? {
              trigger: "axis",
              formatter: function (params) {
                let newParams = [];
                let tooltipString = [];
                newParams = [...params];
                newParams.sort((a, b) => {
                  return b.value - a.value;
                });
                newParams.forEach((p) => {
                  const cont =
                    p.marker + " " + p.seriesName + ": " + p.value + "<br/>";
                  tooltipString.push(cont);
                });
                return tooltipString.join("");
              },
              textStyle: {
                align: "left",
              },
            }
          : {},
        toolbox: this.toolbox
          ? {
              feature: {
                saveAsImage: {},
              },
            }
          : {},
        legend: {
          data: this.opData.legend,
          bottom: 0,
          formatter: function (name) {
            let data = option.series[0].data;
            let total = 0;
            let value;
            let bfb;
            for (let i = 0; i < data.length; i++) {
              total += data[i].value;
              if (data[i].name == name) {
                value = data[i].value;
              }
            }
            bfb = ((value / total) * 100).toFixed(1);
            return `${name} ${bfb}%`;
          },
        },
        grid: this.grid ? this.grid : this.initData.grid,
        xAxis: {
          boundaryGap: false,
          type: "category",
          data: this.opData.xAxis,
        },
        yAxis: {
          type: "value",
        },
        series: this.opData.series,
      };
      // 绘制图表
      this.myChart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.line {
  width: 100%;
  height: 100%;
}
</style>
