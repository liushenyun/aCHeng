<template>
  <div class="General-outer">
    <div class="g-top">
      <div class="get-same gt-left">
        <p>gg</p>
      </div>
      <div class="get-same gt-right">
        <p>gg</p>
        <div id="main" style="width: 600px;height:400px;"></div>
      </div>
    </div>
    <div class="g-bottom get-same">
      <p>gg</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { beforeRouteLeave } from "@/common/js/mixin.js";
import { reportBugApiF, reportMetagenomeApiF } from "@/service/requestFun.js";
// reportBugApiF,
// reportMetagenomeApiF
export default {
  name: "Concat",
  mixins: [beforeRouteLeave],
  data() {
    return {
    };
  },
  components: {},
  methods: {

  },
  watch: {},
  mounted() {
    let myChart = echarts.init(document.getElementById('main')); // eslint-disable-line

        // 指定图表的配置项和数据
        let option = {
              color: ['#3398DB'],
              tooltip: {
                  trigger: 'axis',
                  axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                      type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                  }
              },
              grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
              },
              xAxis: [
                  {
                      type: 'category',
                      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                      axisTick: {
                          alignWithLabel: true
                      }
                  }
              ],
              yAxis: [
                  {
                      type: 'value'
                  }
              ],
              series: [
                  {
                      name: '直接访问',
                      type: 'bar',
                      barWidth: '60%',
                      data: [10, 52, 200, 334, 390, 330, 220]
                  }
              ]
          };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
  }
};
</script>

<style lang="scss" scoped>
@import "./index";
</style>
