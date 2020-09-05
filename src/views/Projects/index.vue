<template>
  <div class="PROJECT-outer">
    <div class="search-outer" style="margin-bottom: 10px">
      <el-input style="margin-right: 20px" @keyup.enter.native="searchA" placeholder="请输入内容" v-model="projectInput" size='small' class="input-with-select">
        <el-button type="primary" slot="append" icon="el-icon-search" @click="searchA"></el-button>
      </el-input>
    </div>
    <div class="pr-table">
      <el-table :data="tableData4" :span-method="objectSpanMethod" border="">
        <el-table-column class-name='one-column' prop="id" label="Projects" width="180">
          <template slot-scope="scope">
            <span @click="cellClick(scope.$index, tableData4[scope.$index])" style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="tags" label="Tags"></el-table-column>
        <el-table-column prop="sampleNumber" label="Sample Number"></el-table-column>
        <el-table-column prop="publishedYear" label="published Year"></el-table-column>
        <el-table-column align="center" prop="url" label="Download Meta">
          <template slot-scope="scope" v-if="tableData4[scope.$index].url">
            <el-link :href='tableData4[scope.$index].url' target="_blank" type="primary">
              <img style="width: 24px; margin-right: 4px;" src="../../image/ic_Download.png" alt="">
              <span>download</span>
            </el-link>
            <!-- <el-button
              icon="el-icon-download"
              @click.native.prevent="downloadA(scope.$index, tableData4[scope.$index])"
              type="text"
              size="small"
            >
            </el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-drawer
      title="我是标题"
      size='80%'
      :visible.sync="drawer"
      :with-header="false">
      <div class="drawer-con-wrap">
        <el-container>
          <el-header style="height: auto; padding-top: 10px">
            <el-card shadow="always">
              <div class="drawer-con">
                <div class="tips">
                  <p class="mmc-link"><span>{{oneProjectDetail.name || '--'}}</span><el-link :href="oneProjectDetail.link"  type="primary">Literature Link</el-link><el-link type="primary" :href="oneProjectDetail.link">EMBL Database Link</el-link></p>
                  <p class="tip"><span>{{oneProjectDetail.description || '--'}}</span></p>
                </div>
              </div>
            </el-card>
            <h3 class="table-title">Metadata Statistics</h3>
          </el-header>
          <el-main>
            <div class="table" style="height: 100%">
              <el-table
                height="100%"
                :data="tableData"
                :span-method="objectSpanMethod1">
                <el-table-column
                  prop="levelA"
                  label="">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="">
                </el-table-column>
                <el-table-column label="Female" align='center'>
                  <el-table-column
                      v-for="(item, i) in dConig.female" :key="i"
                      :prop="item.prop"
                      :label="item.labe">
                    </el-table-column>
                </el-table-column>
                <el-table-column label="Male" align='center'>
                  <el-table-column
                    v-for="(item, i) in dConig.male" :key="i"
                    :prop="item.prop"
                    :label="item.labe">
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </el-main>
        </el-container>
      </div>
    </el-drawer>
  </div>
</template>

<script>
// @ is an alias to /src
import { beforeRouteLeave } from "@/common/js/mixin.js";
import { projectsApiF, oneProjectSearchApiF, metadataSummaryApiF, projectsOneSamplesApiF } from "@/service/requestFun.js";
export default {
  name: "home",
  mixins: [beforeRouteLeave],
  data() {
    return {
      drawer: false,
      // projectDetail: '',
      projectInput: "",
      spanArr: [],
      spanArr1: [],
      tableData4: [],
      oneProjectDetail: {},
      dConig: {
        male: [
            // {
            //     prop: 'MaleName',
            //     label: 'name'
            // }
        ],
        female: [
            // {
            //     prop: 'FemaleName',
            //     label: 'name'
            // }
        ]
      },
      tableData: [
        // {
        //   id: 1,
        //   date: 'DE',
        //   tag: 'AGE',
        //   MaleName: '女1',
        //   FemaleName: '男1',
        //   MaleControl: '女Control',
        //   FemaleControl: '男Control'
        // }
      ]
    };
  },
  components: {},
  methods: {
    cellClick(p1, p2) {
      this.metadataSummaryApiFA(p2.tId);
      this.projectsOneSamplesApiFA(p2.tId)
    },
    projectsOneSamplesApiFA(id) {
      projectsOneSamplesApiF(id).then((result) => {
        this.oneProjectDetail = (result && result[0]) || {}
      }).catch(() => { })
    },
    metadataSummaryApiFA(pid) {
      metadataSummaryApiF(pid).then(res => {
        this.drawer = true
        let { list = [], meta = {} } = res
        this.tableData = list
        this.dConig.male = meta.Male || {}
        this.dConig.female = meta.Female || {}
        this.initTableData1()
      })
    },
    projectsApiFA() {
      projectsApiF()
        .then(result => {
          this.dealProjects(result)
        })
        .catch(() => {});
    },
    dealProjects(result) {
      this.tableData4 = []
      this.spanArr = []
      let _result = result;
      let _list = [];
      _result.forEach(v => {
        v.samples.forEach(k => {
          let _obj = {
            tId: v.id,
            id: v.name,
            projects: v.name,
            tags: k.name,
            sampleNumber: k.number,
            publishedYear: v.published_year,
            url: k.url
          };
          _list.push(_obj);
        });
      });
      this.tableData4 = _list;
      this.initTableData();
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
      // if (columnIndex === 1) {
      //   const _row = this.spanArr[rowIndex];
      //   const _col = _row > 0 ? 1 : 0;
      //   return {
      //     rowspan: _row,
      //     colspan: _col
      //   };
      // }
    },
    objectSpanMethod1({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.spanArr1[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
      // if (columnIndex === 1) {
      //   const _row = this.spanArr[rowIndex];
      //   const _col = _row > 0 ? 1 : 0;
      //   return {
      //     rowspan: _row,
      //     colspan: _col
      //   };
      // }
    },
    initTableData() {
      let contactDot = 0;
      this.tableData4.forEach((item, index) => {
        item.index = index;
        if (index === 0) {
          this.spanArr.push(1);
        } else {
          if (item.id === this.tableData4[index - 1].id) {
            this.spanArr[contactDot] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            contactDot = index;
          }
        }
      });
    },
    initTableData1() {
      let contactDot = 0;
      this.spanArr1 = []
      this.tableData.forEach((item, index) => {
        item.index = index;
        if (index === 0) {
          this.spanArr1.push(1);
        } else {
          if (item.levelA === this.tableData[index - 1].levelA) {
            this.spanArr1[contactDot] += 1;
            this.spanArr1.push(0);
          } else {
            this.spanArr1.push(1);
            contactDot = index;
          }
        }
      });
    },
    searchA() {
      if (this.projectInput) {
        this.oneProjectSearchApiFA(this.projectInput);
      } else {
        this.projectsApiFA();
      }
    },
    oneProjectSearchApiFA(key) {
      oneProjectSearchApiF({
        key
      }).then((result) => {
        this.dealProjects(result)
      }).catch(() => {})
    },
    toDetailA(type, item) {
      this.$router.push({
        path: `/detailA/${type}/${item.id}`
      });
    }
  },
  watch: {},
  mounted() {
    this.projectsApiFA();
  }
};
</script>

<style lang="scss" scoped>
@import "./index";
</style>
