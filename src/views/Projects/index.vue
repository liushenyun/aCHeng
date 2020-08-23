<template>
  <div class="PROJECT-outer">
    <div class="search-outer" style="margin-bottom: 10px">
      <el-input style="margin-right: 20px" placeholder="请输入内容" v-model="projectInput" size='small' class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="searchA"></el-button>
      </el-input>
      <el-button style="padding: 7px 10px" type="primary" size='mini' icon="" class="Meta-input-2">
        <el-link href="http://hethelp.com:8001/MetadataList.xlsx" style="color: #FFF" target="_blank">下载全部</el-link>
      </el-button>
    </div>
    <div class="pr-table">
      <el-table :data="tableData4" size='mini' :span-method="objectSpanMethod1" border="">
        <el-table-column class-name='one-column' prop="id" label="Projects" width="180">
          <template slot-scope="scope">
            <span @click="cellClick(scope.$index, tableData4[scope.$index])" style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="tags" label="Tags"></el-table-column>
        <el-table-column prop="sampleNumber" label="Sample Number"></el-table-column>
        <el-table-column prop="publishedYear" label="published Year"></el-table-column>
        <el-table-column prop="url" label="Download Meta">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-download"
              @click.native.prevent="downloadA(scope.$index, tableData4[scope.$index])"
              type="text"
              size="small"
            >
              <p></p>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false">
      <div>
        <h3 style="padding-bottom: 6px">project详情</h3>
        <span>{{projectDetail}}</span>
      </div>
    </el-drawer>
  </div>
</template>

<script>
// @ is an alias to /src
import { beforeRouteLeave } from "@/common/js/mixin.js";
import { projectsApiF, oneProjectSearchApiF } from "@/service/requestFun.js";
export default {
  name: "home",
  mixins: [beforeRouteLeave],
  data() {
    return {
      drawer: false,
      projectDetail: '',
      projectInput: "",
      spanArr: [],
      tableData4: []
    };
  },
  components: {},
  methods: {
    cellClick(p1, p2) {
      this.drawer = true
      this.projectDetail = p2.projects
    },
    downloadA (index, row) {
      console.log(index, row);
    },
    projectsApiFA() {
      projectsApiF()
        .then(result => {
          this.dealProjects(result)
          console.log(121, this.tableData4);
        })
        .catch(() => {});
    },
    dealProjects(result) {
      this.tableData4 = []
      let _result = result;
      let _list = [];
      _result.forEach(v => {
        v.samples.forEach(k => {
          let _obj = {
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
      console.log(79, this.tableData4)
    },
    objectSpanMethod1({ row, column, rowIndex, columnIndex }) {
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
        console.log(256, result)
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
