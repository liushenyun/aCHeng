<template>
  <div class="Metagenome-outer">
    <el-container>
      <el-aside width="300px">
        <el-card class="aside-card" shadow="always" style="height: 100%">
          <h4>projects</h4>
          <div class="mm-trees-wrap">
            <el-collapse @change="handleChange">
              <el-collapse-item  v-for="(item, k) in projectsData" :key="k" :title="item.category" :name="k">
                <ul class="mm-ul">
                  <li @click="checkedA(subItem)" v-for="(subItem, j) in item.projects" :key="j"><span>{{subItem.name}}({{subItem.sample_num}})</span><img v-if="subItem.checked" src="../../image/btn_selected_check.png" alt=""><img v-else src="../../image/btn_normal_check.png" alt=""></li>
                </ul>
              </el-collapse-item>
            </el-collapse>
            <!-- <el-tree
              :data="projectsData"
              @check-change="handleNodeClick"
              show-checkbox
              node-key="id"
              ref="tree"
              :default-checked-keys="projectsDataChecked"
              :props="defaultProps"
            ></el-tree> -->
          </div>
        </el-card>
      </el-aside>
      <el-container>
        <el-main>
          <el-card shadow="always" style="margin-bottom: 20px">
            <p class="mmc-link" v-if="tabsActiveItem.label">
              <span>{{tabsActiveItem.label}}</span>
              <el-link :href="tabsActiveItem.link" target="_blank" type="primary">Literature Link</el-link>
              <el-link type="primary" target="_blank" :href="tabsActiveItem.link">EMBL Database Link</el-link>
            </p>
            <p v-else></p>
            <p class="metahome-tip">
              <span>{{tabsActiveItem.description}}</span>
            </p>
          </el-card>
          <el-tabs v-model="editableTabsValue" type="card" closable @tab-click="tabClick" @tab-remove="removeTab">
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
                  <ul class="meta-data-ul">
                    <li v-for="(item, index) in prjectMeta"  :key="index">
                      <div @click="metaClick(item)"><img v-if="item.checked" src="../../image/btn_selected_check.png" alt=""><img v-else src="../../image/btn_normal_check.png" alt=""></div>
                      <span @click="showInfo(item)">{{item.name}}</span>
                    </li>
                  </ul>
                  <!-- <el-checkbox-group v-model="MetaChecklist">
                      <el-checkbox v-for="(item, index) in prjectMeta" :key="index" :label="item"></el-checkbox>
                  </el-checkbox-group> -->
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
                        <el-button
                          type="primary"
                          icon="el-icon-plus"
                          @click.native.prevent="addAllA(scope.$index, activeSamples)"
                        >Add all</el-button>
                      </template>
                      <template slot-scope="scope">
                        <el-button
                          class="add-samll"
                          size="small"
                          @click.native.prevent="addCat(scope.$index, scope.row)"
                        >
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
  newprojectsApiF,
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
      projectSamples: [],
      projectsDataChecked: [],
      projectsData: [
        {
          category: "Neurological",
          projects: [{ name: "GermanPD", checked: false }, { name: "GermanPD", checked: true }]
        },
        {
          category: "Neurological2",
          projects: [{ name: "GermanPD", checked: true }, { name: "GermanPD", checked: false }]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  components: {},
  methods: {
    showInfo(item) {
      console.log(item)
      this.$alert(`<strong>${item.name}</strong>`, item.name, {
        dangerouslyUseHTMLString: true
      });
    },
    metaClick(item) {
      console.log(12, item)
      item.checked = !item.checked
      if (item.checked) {
        if (!this.MetaChecklist.includes(item.name)) {
          this.MetaChecklist.push(item.name);
        }
      } else {
        let _index = this.MetaChecklist.indexOf(item.name);
        if (_index > -1) {
          this.MetaChecklist.splice(_index, 1)
        }
      }
    },
    tabClick(p) {
      console.log(156, p.name, this.editableTabsValue)
    },
    checkedA(item) {
      item.checked = !item.checked
      console.log(155, item)
      if (item.checked) {
        this.addTab(item.label, item.id);
      } else {
        this.removeTab(item.label);
      }
      console.log(155, item)
    },
    handleChange(val) {
      console.log(val);
    },
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
    },
    removeTab(targetName) {
      console.log(28, targetName)
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
      console.log(223, this.projectsData)
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
      this.samplesChecklist = []
      projectSamplesApiF(id)
        .then(result => {
          let { meta = [], samples = [] } = result;
          this.prjectMeta = meta.map(v => ({ name: v, checked: false }));
          this.projectSamples = samples;
        })
        .catch(() => {});
    }
  },
  watch: {
    editableTabsValue(nVal, oVal) {
      console.log(264, nVal, oVal)
      let _actvieVal = "";
      if (nVal) {
        this.projectsData.forEach(v => {
          v.projects.forEach(k => {
            if (k.label == nVal) {
              _actvieVal = k
            }
          })
        })
      }
      console.log(275, _actvieVal)
      this.tabsActiveItem = _actvieVal;
      this.projectSamplesApiFA(_actvieVal.id);
    },
    samplesChecklist(nVal, oVal) {
      console.log(nVal, oVal, this.projectSamples)
      var _list = [];
      this.projectSamples.forEach(v => {
        if (nVal.includes(v.Tags)) {
          _list.push(v);
        }
      });
      this.activeSamples = _list;
    },
    MetaChecklist(nVal, oVal) {
      console.log(121)
      this.projectActiveMeta = nVal;
    }
  },
  mounted() {
    newprojectsApiF()
      .then(result => {
        let _data = result;
        _data.forEach(v => {
          v.projects.forEach(k => {
            k.checked = false
            k.label = k.name
          })
        })
        // let _list = [];
        // for (const key in _data) {
        //   if (_data.hasOwnProperty(key)) {
        //     const element = _data[key];
        //     _list.push({
        //       id: element.id,
        //       label: element.name,
        //       description: element.description,
        //       link: element.link,
        //       samples: element.samples
        //     });
        //   }
        // }
        this.projectsData = _data;
      })
      .catch(() => {});
  }
};
</script>

<style lang="scss" scoped>
@import "./index";
</style>
