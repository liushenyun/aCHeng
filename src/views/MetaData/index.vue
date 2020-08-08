<template>
  <div class="Metagenome-outer">
    <el-container>
      <el-aside width="200px">
        <h4>projects</h4>
        <div class="search-outer">
          <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <div class="mm-trees-wrap">
          <el-tree
            :data="data"
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps">
          </el-tree>
        </div>
      </el-aside>
      <el-container>
        <el-main>
          <p>信息展示</p>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { beforeRouteLeave } from '@/common/js/mixin.js'
export default {
  name: 'home',
  mixins: [beforeRouteLeave],
  data () {
    return {
      checkList: ['选中且禁用','复选框 A'],
      editableTabsValue: '2',
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
      data: [{
          id: 1,
          label: 'BGI_T2D(100)',
          children: [{
            id: 3,
            label: 'T2D(20)'
          }, {
            id: 4,
            label: 'Control(20)'
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
      }
  },
  watch: {
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
@import './index'
</style>
