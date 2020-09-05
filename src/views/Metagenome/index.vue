<template>
  <div class="Metagenome-outer">
    <el-container>
      <el-aside width="250px">
        <el-card class="aside-card" shadow="always" style="height: 100%">
          <h4>projects</h4>
          <div class="mm-trees-wrap">
            <el-tree
              :data="projectsData"
              @check-change="handleNodeClick"
              show-checkbox
              node-key="id"
              ref="tree"
              :default-checked-keys="projectsDataChecked"
              :props="defaultProps"
            ></el-tree>
          </div>
        </el-card>
      </el-aside>
      <el-container>
        <el-main>
          <el-card shadow="always" style="margin-bottom: 20px">
            <p class="mmc-link" v-if="tabsActiveItem.label">
              <span>{{tabsActiveItem.label}}</span>
              <el-link :href="tabsActiveItem.link"  target="_blank" type="primary">Literature Link</el-link>
              <el-link type="primary" target="_blank" :href="tabsActiveItem.link">EMBL Database Link</el-link>
            </p>
            <p v-else>
            </p>
            <p class="metahome-tip">
              <span>{{tabsActiveItem.description}}</span>
            </p>
          </el-card>
          <el-tabs v-model="editableTabsValue" type="card" @tab-remove="removeTab">
            <el-tab-pane
              v-for="(item, index) in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
            >
              <div class="mm-con-inner">
                <h6 class="mm-con-title">Tag</h6>
                <el-checkbox-group v-model="samplesChecklist">
                  <el-checkbox
                    v-for="(item, index) in tabsActiveItem.samples"
                    :key="index"
                    :label="item.name"
                  ></el-checkbox>
                </el-checkbox-group>
                <el-divider></el-divider>
                <h6 class="mm-con-title">Metadata</h6>
                <div>
                  <el-checkbox-group v-model="MetaChecklist">
                    <el-checkbox v-for="(item, index) in prjectMeta" :key="index" :label="item"></el-checkbox>
                  </el-checkbox-group>
                </div>
                <el-divider></el-divider>
                <h6 class="mm-con-title">Sample</h6>
                <div class="mm-table" style="margin-bottom: 10px">
                  <el-table :data="activeSamples" height="350" border="" style="width: 100%;">
                    <el-table-column prop="SampleID" label="Sample" width=""></el-table-column>
                    <el-table-column prop="Tags" label="Tags" width=""></el-table-column>
                    <el-table-column prop="Project" label="Project"></el-table-column>
                    <el-table-column
                      v-for="(item, index) in projectActiveMeta"
                      :key="index"
                      :prop="item"
                      :label="item"
                    ></el-table-column>
                    <el-table-column align="center" label="操作">
                      <template slot="header" slot-scope="scope">
                        <el-button type="primary" icon="el-icon-plus" @click.native.prevent="addAllA(scope.$index, activeSamples)">Add all</el-button>
                      </template>
                      <template slot-scope="scope">
                        <el-button class="add-samll" size="small" @click.native.prevent="addCat(scope.$index, scope.row)">
                          <img src="../../image/btn_add_to.png" alt="">
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <!-- <el-button type="primary" icon="el-icon-download">下载</el-button> -->
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { beforeRouteLeave } from "@/common/js/mixin.js";
import {
  projectsApiF,
  projectSamplesApiF,
  projectsOneSamplesApiF
} from "@/service/requestFun.js";
import { setCat } from "@/common/js/ut";

export default {
  name: "home",
  mixins: [beforeRouteLeave],
  data() {
    return {
      tableData: [],
      checkList: ["选中且禁用", "复选框 A"],
      samplesChecklist: [],
      MetaChecklist: [],
      editableTabsValue: "2",
      tabsActiveItem: {},
      editableTabs: [],
      tabIndex: 2,
      projectActiveMeta: [],
      prjectMeta: [],
      activeSamples: [],
      projectSamplesList: [],
      projectsDataChecked: [],
      projectsData: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  components: {},
  methods: {
    addCat(p1, p2) {
      setCat({
        Project: p2.Project,
        SampleID: p2.SampleID
      });
    },
    addAllA(p1, p2) {
      p2.forEach(v => {
        setCat({
          Project: v.Project,
          SampleID: v.SampleID
        });
      });
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      // this.checkAll = checkedCount === this.cities.length;
      // this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    handleNodeClick(data, checked) {
      if (checked) {
        this.addTab(data.label, data.id);
      } else {
        this.removeTab(data.label);
      }
    },
    addTab(targetName, id) {
      if (this.editableTabs.some(v => v.name == targetName)) {
        this.editableTabsValue = targetName;
        return;
      }
      this.editableTabs.push({
        title: targetName,
        name: targetName,
        content: "New Tab content"
      });
      this.editableTabsValue = targetName;
      this.projectSamplesApiFA(id);
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
      if (!this.editableTabs.length) {
        this.tabsActiveItem = {}
      }
    },
    handleTabsEdit(targetName, action) {
      if (action === "add") {
        let newTabName = ++this.tabIndex + "";
        this.editableTabs.push({
          title: "New Tab",
          name: newTabName,
          content: "New Tab content"
        });
        this.editableTabsValue = newTabName;
      }
      if (action === "remove") {
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
      }
    },
    projectSamplesApiFA(id) {
      this.activeSamples = [];
      projectSamplesApiF(id)
        .then(result => {
          let { meta = [], samples = [] } = result;
          this.prjectMeta = meta;
          this.projectSamples = samples;
        })
        .catch(() => {});
    }
  },
  watch: {
    editableTabsValue(nVal, oVal) {
      let _actvieVal = "";
      if (nVal) {
        _actvieVal = this.projectsData.filter(v => v.label == nVal);
      }
      this.tabsActiveItem = _actvieVal[0];
    },
    samplesChecklist(nVal, oVal) {
      var _list = [];
      this.projectSamples.forEach(v => {
        if (nVal.includes(v.Tags)) {
          _list.push(v);
        }
      });
      this.activeSamples = _list;
    },
    MetaChecklist(nVal, oVal) {
      this.projectActiveMeta = nVal;
    }
  },
  mounted() {
    projectsApiF()
      .then(result => {
        let _data = result;
        let _list = [];
        for (const key in _data) {
          if (_data.hasOwnProperty(key)) {
            const element = _data[key];
            _list.push({
              id: element.id,
              label: element.name,
              description: element.description,
              link: element.link,
              samples: element.samples
            });
          }
        }
        this.projectsData = _list;
      })
      .catch(() => {});
  }
};
</script>

<style lang="scss" scoped>
@import "./index";
</style>
