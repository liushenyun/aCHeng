<template>
  <div class="GlobalSearch-outer">
    <el-container>
      <el-aside width="300px">
        <el-card class="aside-card" shadow="always" style="height: 100%">
          <h4>projects</h4>
          <div class="mm-trees-wrap">
            <el-collapse>
              <el-collapse-item  v-for="(item, k) in projectsData" :key="k" :title="item.category" :name="k">
                <ul class="mm-ul">
                  <li @click="checkedA(subItem)" v-for="(subItem, j) in item.projects" :key="j"><span>{{subItem.name}}({{subItem.sample_num}})</span><img v-if="subItem.checked" src="../../image/btn_selected_check.png" alt=""><img v-else src="../../image/btn_normal_check.png" alt=""></li>
                </ul>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-card>
      </el-aside>
      <el-container>
        <el-main>
          <el-card class="box-card" style="height: 100%">
            <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
              <el-tab-pane
                v-for="(item, index) in editableTabs"
                :key="item.name"
                :label="item.title"
                :name="item.name"
              >
                <rule-com :project='item' @changeRuler='changeRuler' @allRuler="allRuler"></rule-com>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-main>
        <el-footer>
            <el-button type="primary" @click="searchA">search</el-button>
        </el-footer>
      </el-container>
    </el-container>
    <!-- <el-row>
      <label class="h3-title">Project： </label>
      <el-select style="width: 310px" multiple v-model="projectValue" size="small" @change="projectChange" filterable placeholder="Please select project first">
        <el-option
          v-for="item in projectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-row>
    <div class="c-meta-outer">
      <h3 class="h3-title" v-if="ruleList.length">Please select metadata: </h3>
      <el-row style="margin-bottom: 20px;" v-for="(item, index) in ruleList" :key="index">
        <label class="cmeta-title">{{item.name}}:</label>
        <el-checkbox-group class="enum-outer" v-if="item.type == 'enum'" v-model="item.checked">
          <el-checkbox v-for="(sub, k) in item.values" :key="k" :label="sub"></el-checkbox>
        </el-checkbox-group>
        <div class="range-outer" v-if="item.type == 'range'">
          <el-input class="rang-input" type='number' size="mini" placeholder="min" v-model="item.min"></el-input>
          <label class="rang-label">-</label>
          <el-input class="rang-input" type='number' size="mini" placeholder="max" v-model="item.max"></el-input>
        </div>
      </el-row>
      <el-row style="margin-top: 60px; text-algign: right">
        <el-button type="primary" @click="searchA">search</el-button>
      </el-row>
    </div> -->
    <el-drawer title="Sample" size="80%" :visible.sync="drawer" :with-header="true">
      <div class="search-table"  style="margin-bottom: 10px">
        <el-table :data="activeSamples" border="" height="100%" style="width: 100%">
          <el-table-column prop="sample_id" label="Sample" width=""></el-table-column>
          <el-table-column prop="tags" label="Tags" width=""></el-table-column>
          <el-table-column prop="project" label="Project"></el-table-column>
          <!-- <el-table-column
            v-for="(item, index) in projectActiveMeta"
            :key="index"
            :prop="item"
            :label="item"
          ></el-table-column> -->
          <el-table-column fixed="right" align='center' label="操作" width="120">
            <template slot="header" slot-scope="scope">
              <el-button
                icon="el-icon-plus"
                @click.native.prevent="addAllA(scope.$index, activeSamples)"
                type="primary"
                size="small"
              >Add all</el-button>
            </template>
            <template slot-scope="scope">
              <!-- <i class="el-icon-plus"></i> -->
              <el-button
                class="add-samll"
                @click.native.prevent="addCat(scope.$index, activeSamples[scope.$index])"
                type="primary"
                size="small"
              >
                <img src="../../image/btn_add_to.png" alt="">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-drawer>
  </div>
</template>

<script>
// @ is an alias to /src
import RuleCom from './RuleCom.vue'
import { beforeRouteLeave } from "@/common/js/mixin.js";
import { setCat } from '@/common/js/ut'
import {
  projectsApiF,
  newprojectsApiF,
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
      projectOptions: [],
      projectValue: "",
      ruleList: [],
      projectsData: [],
      editableTabsValue: '2',
      editableTabs: [],
      tabIndex: 2
    };
  },
  components: {
    RuleCom: RuleCom
  },
  methods: {
    changeRuler({ id, checkedRule }) {
      console.log(139, id, checkedRule)
      this.editableTabs.forEach(v => {
        if (v.id == id) {
          v.ruleList = checkedRule
        }
      })
    },
    allRuler({ id, allRuler }) {
      this.editableTabs.forEach(v => {
        if (v.id == id) {
          v.allRuler = allRuler
        }
      })
      console.log(147, id, allRuler)
    },
    checkedA(item) {
      item.checked = !item.checked
      if (item.checked) {
        this.addTab(item.label, item.id);
      } else {
        this.removeTab(item.label);
      }
    },
    addTab(targetName, id) {
      if (this.editableTabs.some(v => v.name == targetName)) {
        this.editableTabsValue = targetName;
        return;
      }
      this.editableTabs.push({
        id: id,
        ruleList: [],
        title: targetName,
        name: targetName,
        content: "New Tab content"
      });
      this.editableTabsValue = targetName;
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      this.projectsData.forEach(v => {
        v.projects.forEach(k => {
          if (k.label == targetName) {
            k.checked = false
          }
        })
      })
      if (!this.editableTabs.length) {
        this.tabsActiveItem = {};
      }
    },
    projectsApiFA() {
      newprojectsApiF()
        .then(result => {
          let _data = result;
          _data.forEach(v => {
            v.projects.forEach(k => {
              k.checked = false
              k.label = k.name
            })
          })
          this.projectsData = _data;
        })
        .catch(() => {});
    },
    projectChange(id) {
      this.searchRulerApiFA({
        pids: id
      });
    },
    searchRulerApiFA(id) {
      searchRulerApiF(id)
        .then(res => {
          let _rule = res.ruler || [];
          _rule.forEach(v => {
            if (v.type == "enum") {
              v.checked = [];
            } else if (v.type == "range") {
              v.min = "";
              v.max = "";
            }
          });
          this.ruleList = _rule;
        })
        .catch(() => {});
    },
    globalSearchApiFA(data) {
      globalSearchApiF(data)
        .then((result) => {
          this.projectActiveMeta = result.meta;
          this.activeSamples = result.samples
        })
        .catch(() => {});
    },
    searchA() {
      if (!this.editableTabs.length) {
        this.$message.warning('Please select project first')
        return
      }
      let _tabs = JSON.parse(JSON.stringify(this.editableTabs))
      let _subList = []
      _tabs.forEach(k => {
        let _obj = {
          project_id: k.id,
          filter: {}
        }
        _obj.project_id = k.id
        k.ruleList.forEach(v => {
          if (v.type == "enum") {
            if (v.checked.length) {
              _obj.filter[v.name] = v.checked;
            }
          } else if (v.type == "range") {
            if (!v.min) {
              _obj.filter[v.name] = {}
            } else {
              _obj.filter[v.name] = {
                min: v.min ? +v.min : "",
                max: v.max ? +v.max : ""
              };
            }
          }
        })
        _subList.push(_obj)
      })
      this.drawer = true;
      this.globalSearchApiFA(_subList);
    },
    addCat(p1, p2) {
      setCat({
        Project: p2.Project,
        SampleID: p2.SampleID
      })
    },
    addAllA(p1, p2) {
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
