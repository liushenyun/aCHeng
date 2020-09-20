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
              <meta-com @showInfo='showInfo' @setActiveSamples = 'setActiveSamples' :tabsItem='item'></meta-com>
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
import { getCat } from '@/common/js/ut'

import MetaCom from './MetaCom.vue'

export default {
  name: "home",
  mixins: [beforeRouteLeave],
  data() {
    return {
      tableData: [],
      checkList: [],
      samplesChecklist: [],
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
  components: {
    MetaCom: MetaCom
  },
  methods: {
    oneMetadataBynameApiFA(id) {
      oneMetadataBynameApiF(id).then(res => {
        this.$alert(`
        <p><strong>Unit</strong>： ${res.unit || '--'}</p>
        <p><strong>Description</strong>： ${res.description || '--'} </p>
        `, id, {
          dangerouslyUseHTMLString: true
        });
      }).catch(() => {})
    },
    showInfo(item) {
      this.oneMetadataBynameApiFA(item.name)
    },
    tabClick(p) {
      // console.log(156, p.name, this.editableTabsValue)
    },
    checkedA(item) {
      item.checked = !item.checked
      if (item.checked) {
        // this.addTab(item.label, item.id);
        this.addTab(item);
      } else {
        this.removeTab(item.label);
      }
    },
    addTab(item) {
      let targetName = item.label
      // let id = item.id
      if (this.editableTabs.some(v => v.name == targetName)) {
        this.editableTabsValue = targetName;
        return;
      }
      this.projectSamplesApiFA(item.id);
      this.editableTabs.push({
        title: targetName,
        name: targetName,
        content: "New Tab content",
        samplesChecklist: item.samples.map(v => v.name),
        tabTags: item.samples,
        prjectMeta: [],
        projectSamples: [],
        projectActiveMeta: [],
        activeSamples: [],
        tabsActiveItem: item
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
    setActiveSamples(obj) {
      this.editableTabs.forEach(v => {
        if (obj.name == this.editableTabsValue) {
          v.activeSamples = obj.activeSamples
        }
      })
    },
    projectSamplesApiFA(id) {
      this.activeSamples = [];
      this.samplesChecklist = []
      projectSamplesApiF(id)
        .then(result => {
          let { meta = [], samples = [] } = result;
          let _catInfo = getCat() // SampleID
          samples.forEach(v => {
            if (_catInfo[v.SampleID]) {
              v.isCat = true
            } else {
              v.isCat = false
            }
          })
          this.editableTabs.forEach(v => {
            if (v.name == this.editableTabsValue) {
              v.prjectMeta = meta.map(v => ({ name: v, checked: false }));
              v.projectSamples = samples;
            }
          })
        })
        .catch(() => {});
    }
  },
  watch: {
    editableTabsValue(nVal, oVal) {
      this.editableTabs.forEach(v => {
        if (nVal == v.name) {
          this.tabsActiveItem = v.tabsActiveItem
        }
      })
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
        this.projectsData = _data;
      })
      .catch(() => {});
      this.$bus.$off('updatePageCatData').$on('updatePageCatData', (_catInfo) => {
        this.$nextTick(() => {
          this.editableTabs.forEach(v => {
            if (v.name == this.editableTabsValue) {
              v.projectSamples.forEach(k => {
                if (_catInfo[k.SampleID]) {
                  k.isCat = true
                } else {
                  k.isCat = false
                }
              })
            }
          })
        })
      })
  }
};
</script>

<style lang="scss" scoped>
@import "./index";
</style>
