<template>
  <div class="Metagenome-outer">
    <el-container>
      <el-aside width="250px">
        <h4>projects</h4>
        <div class="mm-trees-wrap">
          <el-tree
            :data="projectsData"
            @check-change="handleNodeClick"
            show-checkbox
            node-key="id"
            ref="tree"
            :default-checked-keys="projectsDataChecked"
            :props="defaultProps">
          </el-tree>
        </div>
      </el-aside>
      <el-container>
        <el-header style="height: auto">
          <el-card shadow="always">
            <p class="mmc-link"><span>{{tabsActiveItem.label}}</span><el-link :href="tabsActiveItem.link" type="primary">文献链接</el-link><el-link type="primary" :href="tabsActiveItem.link">EMBL数据库连接</el-link></p>
            <p><span>{{tabsActiveItem.description}}</span></p>
          </el-card>
        </el-header>
        <el-main>
          <el-tabs v-model="editableTabsValue" type="card" @tab-remove="removeTab">
            <el-tab-pane
              v-for="(item, index) in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
            >
              <div class="mm-con-inner">
                <h6 style="margin-bottom: 6px">Samples</h6>
                 <el-checkbox-group v-model="samplesChecklist">
                    <el-checkbox v-for="(item, index) in tabsActiveItem.samples" :key="index" :label="item.name"></el-checkbox>
                  </el-checkbox-group>
                <h6 style="margin-bottom: 6px">Metadata</h6>
                <div>
                  <el-checkbox-group v-model="MetaChecklist">
                    <el-checkbox v-for="(item, index) in prjectMeta" :key="index" :label="item"></el-checkbox>
                  </el-checkbox-group>
                </div>
                <h6 style="margin: 12px 0 6px 0">表格信息</h6>
                <div class="mm-table" style="margin-bottom: 10px">
                  <el-table
                    :data="activeSamples"
                    height="250"
                    border
                    style="width: 100%">
                    <el-table-column
                      prop="SampleID"
                      label="Sample"
                      width="">
                    </el-table-column>
                    <el-table-column
                      prop="Tags"
                      label="Tags"
                      width="">
                    </el-table-column>
                    <el-table-column
                      prop="Project"
                      label="Project">
                    </el-table-column>
                    <el-table-column
                      v-for="(item, index) in projectActiveMeta"
                      :key="index"
                      :prop="item"
                      :label="item">
                    </el-table-column>
                  </el-table>
                </div>
                <el-button type="primary" icon="el-icon-download">下载</el-button>
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
import { beforeRouteLeave } from '@/common/js/mixin.js'
import { projectsApiF, projectSamplesApiF,
  projectsOneSamplesApiF } from '@/service/requestFun.js'
export default {
  name: 'home',
  mixins: [beforeRouteLeave],
  data () {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      checkList: ['选中且禁用','复选框 A'],
      samplesChecklist: [],
      MetaChecklist: [],
      editableTabsValue: '2',
      tabsActiveItem: {},
      editableTabs: [],
      tabIndex: 2,
      projectActiveMeta: [],
      prjectMeta: [],
      activeSamples: [],
      projectSamplesList: [],
      projectsDataChecked: [2],
      projectsData: [
        // {
        //   id: 1,
        //   label: 'BGI_T2D(100)'
        // }
      ],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
    }
  },
  components: {
  },
  methods: {
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length;
      console.log(159, value)
      // this.checkAll = checkedCount === this.cities.length;
      // this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    handleNodeClick (data, checked) {
      console.log(this.$refs.tree.getCheckedNodes());
      console.log(this.$refs.tree.getCurrentKey());
      console.log(165, data, checked);
      if (checked) {
        this.addTab(data.label, data.id)
      } else {
        this.removeTab(data.label)
      }
    },
    addTab (targetName, id) {
      console.log(1606, this.projectsDataChecked)
      if (this.editableTabs.some(v => v.name == targetName)) {
        this.editableTabsValue = targetName;
        return
      }
        this.editableTabs.push({
          title: targetName,
          name: targetName,
          content: 'New Tab content'
        });
        this.editableTabsValue = targetName;
        this.projectSamplesApiFA(id);
      },
      removeTab (targetName) {
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
      },
      handleTabsEdit (targetName, action) {
        if (action === 'add') {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: 'New Tab',
            name: newTabName,
            content: 'New Tab content'
          });
          this.editableTabsValue = newTabName;
        }
        if (action === 'remove') {
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
      projectSamplesApiFA (id) {
        projectSamplesApiF(id).then((result) => {
          let { meta = [], samples = [] } = result
          this.prjectMeta = meta
          this.projectSamples = samples
          console.log(213, result)
        }).catch((err) => {
        });
      }
  },
  watch: {
    editableTabsValue (nVal, oVal) {
      let _actvieVal = ''
      if (nVal) {
        _actvieVal = this.projectsData.filter(v => v.label == nVal)
      }
      this.tabsActiveItem = _actvieVal[0]
      console.log(224, this.projectsData, nVal, oVal, _actvieVal)
    },
    samplesChecklist (nVal, oVal) {
      console.log(251, this.projectSamples, nVal, oVal)
      var _list = []
       this.projectSamples.forEach(v => {
        console.log(241, v)
        nVal.forEach(k => {
          console.log(243, v[k])
          if (v[k]) {
            _list.push(v)
          }
        })
        this.activeSamples = _list
      })
    },
    MetaChecklist (nVal, oVal) {
      this.projectActiveMeta = nVal;
    }
  },
  mounted () {
    projectsApiF().then((result) => {
      let _data = result;
      let _list = []
      for (const key in _data) {
        if (_data.hasOwnProperty(key)) {
          const element = _data[key];
          _list.push({
            id: element.id,
            label: element.name,
            description: element.description,
            link: element.link,
            samples: element.samples
          })
          console.log(229, element)
        }
      }
      this.projectsData = _list
      console.log(213, result)
    }).catch((err) => {
      
    });
// projectSamplesApiF,
//   projectsOneSamplesApiF
    // projectsOneSamplesApiF(1).then((result) => {
    //   console.log(213, result)
    // }).catch((err) => {
    // });
  }
}
</script>

<style lang="scss" scoped>
@import './index'
</style>
