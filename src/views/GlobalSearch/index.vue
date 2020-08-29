<template>
  <div class="GlobalSearch-outer">
    <el-row>
      <label class="h3-title">Project： </label>
      <el-select style="width: 240px" v-model="projectValue" size="small" @change="projectChange" filterable placeholder="Please select project first">
        <el-option
          v-for="item in projectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-row>
    <div class="c-meta-outer">
      <h3 class="h3-title" v-if="ruleList.length">Please select metadata</h3>
      <el-row style="margin-bottom: 20px;" v-for="(item, index) in ruleList" :key="index">
        <label class="cmeta-title">{{item.name}}:</label>
        <el-checkbox-group class="enum-outer" v-if="item.type == 'enum'" v-model="item.checked">
          <el-checkbox v-for="(sub, k) in item.values" :key="k" :label="sub"></el-checkbox>
        </el-checkbox-group>
        <div class="range-outer" v-if="item.type == 'range'">
          <!-- <label class="rang-label">from</label> -->
          <el-input class="rang-input" type='number' size="mini" placeholder="min" v-model="item.min"></el-input>
          <label class="rang-label">-</label>
          <el-input class="rang-input" type='number' size="mini" placeholder="max" v-model="item.max"></el-input>
        </div>
      </el-row>
      <el-row style="margin-top: 60px">
        <el-button type="primary" @click="searchA">search</el-button>
      </el-row>
    </div>
    <el-drawer title="Sample" size="80%" :visible.sync="drawer" :with-header="true">
      <div class="search-table"  style="margin-bottom: 10px">
        <el-table :data="activeSamples" border="" height="100%" style="width: 100%">
          <el-table-column prop="SampleID" label="Sample" width=""></el-table-column>
          <el-table-column prop="Tags" label="Tags" width=""></el-table-column>
          <el-table-column prop="Project" label="Project"></el-table-column>
          <el-table-column
            v-for="(item, index) in projectActiveMeta"
            :key="index"
            :prop="item"
            :label="item"
          ></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot="header" slot-scope="scope">
              <el-button
                icon="el-icon-plus"
                @click.native.prevent="addAllA(scope.$index, activeSamples)"
                type="success"
                size="small"
              >add all</el-button>
            </template>
            <template slot-scope="scope">
              <!-- <i class="el-icon-plus"></i> -->
              
              <el-button
                icon="el-icon-plus"
                @click.native.prevent="addCat(scope.$index, activeSamples[scope.$index])"
                type="primary"
                size="small"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-drawer>
  </div>
</template>

<script>
// @ is an alias to /src
import { beforeRouteLeave } from "@/common/js/mixin.js";
import { setCat, getCat } from '@/common/js/ut'
import {
  projectsApiF,
  searchRulerApiF,
  globalSearchApiF
} from "@/service/requestFun.js";

export default {
  name: "home",
  mixins: [beforeRouteLeave],
  data() {
    return {
      drawer: false,
      projectActiveMeta: [],
      activeSamples: [],
      projectOptions: [
        {
          value: "选项1",
          label: "黄金糕"
        }
      ],
      projectValue: "",
      ruleList: []
    };
  },
  components: {},
  methods: {
    projectsApiFA() {
      projectsApiF()
        .then(result => {
          this.projectOptions = result.map(v => ({
            value: v.id,
            label: v.name
          }));
        })
        .catch(err => {});
    },
    projectChange(id) {
      this.searchRulerApiFA(id);
      console.log(153, id, this.ruleList);
    },
    searchRulerApiFA(id) {
      searchRulerApiF(id)
        .then(res => {
          let _rule = res.ruler.ruler;
          _rule.forEach(v => {
            if (v.type == "enum") {
              v.checked = [];
            } else if (v.type == "range") {
              v.min = "";
              v.max = "";
            }
          });
          this.ruleList = _rule;
          console.log(157, this.ruleList);
        })
        .catch(() => {});
    },
    globalSearchApiFA(data) {
      globalSearchApiF(data)
        .then((result) => {
          this.projectActiveMeta = result.meta;
          this.activeSamples = result.samples
          console.log(186, result)
        })
        .catch(() => {});
    },
    searchA() {
      if (!this.projectValue) {
        this.$message.warning('Please select project first')
        return
      }
      this.drawer = true;
      let _obj = {};
      let _ruleList = JSON.parse(JSON.stringify(this.ruleList));
      _ruleList.forEach(v => {
        if (v.type == "enum") {
          _obj[v.name] = v.checked;
        } else if (v.type == "range") {
          if (!v.min) {
            _obj[v.name] = {}
          } else {
            _obj[v.name] = {
              min: v.min ? +v.min : "",
              max: v.max ? +v.max : ""
            };
          }
        }
      });
      console.log(207, {
        project_id: this.projectValue,
        filter: _obj
      })
      this.globalSearchApiFA({
        project_id: this.projectValue,
        filter: _obj
      });
    },
    addCat(p1, p2) {
      setCat({
        Project: p2.Project,
        SampleID: p2.SampleID
      })
      console.log(getCat())
      console.log(p1, p2);
    },
    addAllA(p1, p2) {
      console.log(172, p1, p2)
      p2.forEach(v => {
        setCat({
          Project: v.Project,
          SampleID: v.SampleID
        })
      })
    }
  },
  watch: {},
  mounted() {
    this.projectsApiFA();
    // this.searchRulerApiFA(1);
  }
};
</script>

<style lang="scss" scoped>
@import "./index";
</style>
