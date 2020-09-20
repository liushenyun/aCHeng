<template>
  <div class="General-outer">
    <div class="g-top">
      <div class="get-same gt-left">
        <p class="gs-title">Get Started by Exploring</p>
        <div class="router-wrap">
          <div class="router-same">
            <div class="btn" @click="routerA('metagenome')">
              <img src="../../image/ic_selected_Metagenome.png" alt="">
              <span>Metagenome</span>
            </div>
            <p>See project and its metadata</p>
          </div>
          <div class="router-same">
            <div class="btn" @click="routerA('project')">
              <img src="../../image/ic_selected_Project.png" alt="">
              <span>Project</span>
            </div>
            <p>Search project to show it's metadata summary</p>
          </div>
        </div>
        <div class="router-wrap">
          <div class="router-same">
            <div class="btn" @click="routerA('metaData')">
              <img src="../../image/ic_selected_MetaData.png" alt="">
              <span>Metadata</span>
            </div>
            <p>Search and download metada</p>
          </div>
          <div class="router-same">
            <div class="btn" @click="routerA('globalSearch')">
              <img src="../../image/ic_selected_Search.png" alt="">
              <span>Search</span>
            </div>
            <p>Adwanced search for project</p>
          </div>
        </div>
      </div>
      <div class="get-same gt-right">
        <p class="gs-title">Sample by primary metadata</p>
        <div id="main" style="width: 100%;height: 300px;">暂无数据</div>
      </div>
    </div>
    <div class="g-bottom get-same">
      <p class="gs-title">Data Summary</p>
      <ul>
        <li>
          <div>
            <img src="../../image/ic_Projects.png" alt="">
            <p>Projects</p>
          </div>
          <span>{{ sumData.project || '--' }}</span>
        </li>
        <li>
          <div>
            <img src="../../image/ic_Metada.png" alt="">
            <p>Metada</p>
          </div>
          <span>{{ sumData.metadata || '--' }}</span>
        </li>
        <li>
          <div>
            <img src="../../image/ic_Samples.png" alt="">
            <p>Samples</p>
          </div>
          <span>{{ sumData.sample || '--' }}</span>
        </li>
        <li>
          <div>
            <img src="../../image/ic_Files.png" alt="">
            <p>Files</p>
          </div>
          <span>{{ sumData.file || '--' }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { beforeRouteLeave } from "@/common/js/mixin.js";
import { summaryApiF } from "@/service/requestFun.js";
// reportBugApiF,
// reportMetagenomeApiF
export default {
  name: "Concat",
  mixins: [beforeRouteLeave],
  data() {
    return {
      sumData: {}
    };
  },
  components: {},
  methods: {
    routerA(path) {
      this.$router.push({ path: `/${path}` });
    },
    summaryApiFA() {
      summaryApiF()
        .then(result => {
          let { data = {}, charts = [] } = result;
          this.initEchart(charts);
          this.sumData = data;
        })
        .catch(() => {});
    },
    initEchart(data) {
      let _xData = [];
      let _yData = [];
      data.forEach(v => {
        _xData.push(v.name);
        _yData.push(v.value);
      });
      let myChart = echarts.init(document.getElementById("main")); // eslint-disable-line
      // 指定图表的配置项和数据
      let option = {
        color: ["#473DFF"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: _xData,
            axisLabel: {
              interval: 0,
              rotate: 40
            },
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "数量",
            showBackground: true,
            type: "bar",
            barWidth: "60%",
            data: _yData,
            itemStyle: {
              normal: {
                color: function(params) {
                  var colorList = [
                    "#473DFF",
                    "#6C64FF",
                    "#918BFF",
                    "#B5B1FF",
                    "#E6550D",
                    "#FD8D3D",
                    "#FEAF6B",
                    "#FDD0A2",
                    "#31A354",
                    "#74C476",
                    "#A1D99B",
                    "#C7E9C1",
                    "#04B7F0",
                    "#4FCCF4",
                    "#81DBF7",
                    "#B3E9FA",
                    "#636363",
                    "#969696",
                    "#BDBDBD",
                    "#D9D9D9"
                  ];
                  return colorList[params.dataIndex];
                }
              }
            }
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  watch: {},
  mounted() {
    this.summaryApiFA();
  }
};
</script>

<style lang="scss" scoped>
@import "./index";
</style>
