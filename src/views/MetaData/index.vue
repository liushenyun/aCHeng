<template>
  <div class="MetaData-outer">
    <el-container>
      <el-aside width="300px">
        <div class="search-outer">
          <el-input size='small' placeholder="请输入内容" v-model="metaInput" class="Meta-input-1">
            <el-button slot="append" icon="el-icon-search" @click="searchA"></el-button>
          </el-input>
          <!-- <el-button type="primary" icon="el-icon-download" class="Meta-input-2">下载全部</el-button> -->
          <el-button style="padding: 7px 10px" type="primary" size='mini' icon="" class="Meta-input-2">
            <el-link href="http://hethelp.com:8001/MetadataList.xlsx" style="color: #FFF" target="_blank">下载全部</el-link>
          </el-button>
        </div>
        <div class="mm-trees-wrap">
          <el-tree
            @node-click="treeNodeClick"
            :data="metasData"
            node-key="meta_id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps">
          </el-tree>
        </div>
      </el-aside>
      <el-container>
        <el-main>
          <el-card shadow="always">
            <p class="tip-one"><span>{{metaDetail.name}}</span><span>{{metaDetail.levelA}}</span></p>
            <div class="tip-two">{{metaDetail.description}}</div>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { beforeRouteLeave } from '@/common/js/mixin.js'
import { metadatasApiF, metadatasSearchApiF, oneMetadataApiF } from '@/service/requestFun.js'
export default {
  name: 'home',
  mixins: [beforeRouteLeave],
  data () {
    return {
      checkList: ['选中且禁用', '复选框 A'],
      metaInput: '',
      editableTabsValue: '2',
      metaDetail: {},
      editableTabs: [{
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content'
      }, {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content'
      }],
      tabIndex: 2,
      metasData: [{
          id: 1,
          label: 'BGI_T2D(100)',
          children: [{
            id: 3,
            label: 'T2D(20)'
          }, {
            id: 4,
            label: 'Control(20)',
            children: [{
              id: 31,
              label: 'T2D(30)'
            }, {
              id: 41,
              label: 'Control(310)'
            }]
          }]
        }, {
          id: 2,
          label: 'HK_CRC(100)',
          children: [{
            id: 5,
            label: 'CRC(20)'
          }, {
            id: 6,
            label: 'Control(80)'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
    }
  },
  components: {
  },
  methods: {
    searchA () {
      if (!this.metaInput) {
        this.metadatasApiFA();
        // this.$message.error('请输入搜索的内容');
        return
      }
      this.metadatasSearchApiFA(this.metaInput);
      console.log(94, this.metaInput)
    },
    treeNodeClick (p1, p2, p3) {
      console.log(1, p1)
      console.log(2, p2)
      console.log(3, p3)
    },
    addTab (targetName) {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        });
        this.editableTabsValue = newTabName;
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
      metadatasApiFA () {
        metadatasApiF().then((result) => {
          this.metasData = result || []
          console.log(121, result)
        }).catch(() => {
        });
      },
      metadatasSearchApiFA (value) {
        metadatasSearchApiF({
          key: value
        }).then((result) => {
          this.metasData = result || []
        }).catch(() => {})
      },
      oneMetadataApiFA (id) {
        oneMetadataApiF(id).then((result) => {
          this.metaDetail = result || {}
        }).catch(() => {})
      }
  },
  watch: {
  },
  mounted () {
    this.metadatasApiFA();
    this.metadatasSearchApiFA('T2D')
    this.oneMetadataApiFA(33);
  }
}
</script>

<style lang="scss" scoped>
@import './index'
</style>
