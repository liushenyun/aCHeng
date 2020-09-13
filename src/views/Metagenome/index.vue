<template>
  <div class="Metagenome-outer">
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
                  >{{item.name}}({{item.number}})</el-checkbox>
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
  projectsOneSamplesApiF,
  oneMetadataBynameApiF
} from "@/service/requestFun.js";
import { setCat } from "@/common/js/ut";

export default {
  name: "home",
  mixins: [beforeRouteLeave],
  data() {
    return {
      tableData: [],
      checkList: [],
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
      projectsData: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  components: {},
  methods: {
    oneMetadataBynameApiFA(id) {
      oneMetadataBynameApiF(id).then(res => {
        this.$alert(`
        <p><strong>Unit</strong>: ${res.unit || '--'}</p>
        <p><strong>Description</strong>: ${res.unit || '--'} </p>
        `, id, {
          dangerouslyUseHTMLString: true
        });
      }).catch(() => {})
    },
    showInfo(item) {
      this.oneMetadataBynameApiFA(item.name)
    },
    metaClick(item) {
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
      // console.log(156, p.name, this.editableTabsValue)
    },
    checkedA(item) {
      item.checked = !item.checked
      if (item.checked) {
        this.addTab(item.label, item.id);
      } else {
        this.removeTab(item.label);
      }
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
    // handleNodeClick(data, checked) {
    //   if (checked) {
    //     this.addTab(data.label, data.id);
    //   } else {
    //     this.removeTab(data.label);
    //   }
    // },
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
        this.editableTabsValue = ''
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
          this.filterActiveSamples(this.samplesChecklist);
        })
        .catch(() => {});
    },
    filterActiveSamples(nVal) {
      var _list = [];
      this.projectSamples.forEach(v => {
        if (nVal.includes(v.Tags)) {
          _list.push(v);
        }
      });
      this.activeSamples = _list;
    }
  },
  watch: {
    editableTabsValue(nVal, oVal) {
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
      this.tabsActiveItem = _actvieVal;
      this.$nextTick(() => {
        if (_actvieVal) {
          this.samplesChecklist = _actvieVal.samples.map(v => v.name)
        }
      })
      if (_actvieVal) {
        this.projectSamplesApiFA(_actvieVal.id);
      }
    },
    samplesChecklist(nVal, oVal) {
      this.filterActiveSamples(nVal);
    },
    MetaChecklist(nVal, oVal) {
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
