<template>
  <div class="General-outer">
    <div class="g-top">
      <div class="get-same gt-left">
        <p class="gs-title">Get Started by Exploring</p>
        <div class="router-wrap">
          <div class="router-same">
            <div class="btn">
              <img src="../../image/ic_selected_Metagenome.png" alt="">
              <span>Metagenome</span>
            </div>
            <p>See project and its metadata</p>
          </div>
          <div class="router-same">
            <div class="btn">
              <img src="../../image/ic_selected_Project.png" alt="">
              <span>Project</span>
            </div>
            <p>Search project to show it's metadata summary</p>
          </div>
        </div>
        <div class="router-wrap">
          <div class="router-same">
            <div class="btn">
              <img src="../../image/ic_selected_MetaData.png" alt="">
              <span>Metadata</span>
            </div>
            <p>Search and download metada</p>
          </div>
          <div class="router-same">
            <div class="btn">
              <img src="../../image/ic_selected_Search.png" alt="">
              <span>Search</span>
            </div>
            <p>Adwanced search for project</p>
          </div>
        </div>
      </div>
      <div class="get-same gt-right">
        <p class="gs-title">Sample by primary metadata </p>
        <div id="main" style="width: 100%;height: 300px;"></div>
      </div>
    </div>
    <div class="g-bottom get-same">
      <p class="gs-title">Data Summary</p>
      <ul>
        <li>
          <div><img src="../../image/ic_Projects.png" alt=""><p>Projects</p></div>
          <span>44</span>
        </li>
        <li>
          <div><img src="../../image/ic_Metada.png" alt=""><p>Projects</p></div>
          <span>44</span>
        </li>
        <li>
          <div><img src="../../image/ic_Samples.png" alt=""><p>Projects</p></div>
          <span>44</span>
        </li>
        <li>
          <div><img src="../../image/ic_Files.png" alt=""><p>Projects</p></div>
          <span>44</span>
        </li>
      </ul>
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
