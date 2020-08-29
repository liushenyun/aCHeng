<template>
  <div class="MetaData-outer">
    <el-container>
      <!-- <el-header>Header</el-header> -->
      <el-aside width="300px">
        <div class="search-outer">
          <el-input size="small" placeholder="请输入内容" v-model="metaInput" class="Meta-input-1">
            <el-button slot="append" icon="el-icon-search" @click="searchA"></el-button>
          </el-input>
          <el-button style="padding: 7px 10px" type="primary" target="_blank" size="mini" icon class="Meta-input-2">
            <el-link
              href="http://hethelp.com:8001/MetadataList.xlsx"
              style="color: #FFF"
              target="_blank"
            >下载全部</el-link>
          </el-button>
        </div>
        <div class="mm-trees-wrap">
          <el-menu @select='elMenuSelectA'>
            <menutree :data="metasData"></menutree>
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <el-main>
          <el-card shadow="always">
            <p class="tip-one">
              <span>Name： </span><span>{{metaDetail.name || '--'}}</span>
              
            </p>
            <p class="tip-one">
              <span>Unit： </span><span>{{metaDetail.unit || '--'}}</span>
            </p>
            <p class="tip-one">
              <span>Description：</span>
              <span>{{metaDetail.description || '--'}}</span>
            </p>
            <!-- <div class="tip-one">
              
            </div> -->
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { beforeRouteLeave } from "@/common/js/mixin.js";
import {
  metadatasApiF,
  metadatasSearchApiF,
  oneMetadataApiF
} from "@/service/requestFun.js";
import menutree from "./menutree";
export default {
  name: "home",
  mixins: [beforeRouteLeave],
  data() {
    return {
      checkList: ["选中且禁用", "复选框 A"],
      metaInput: "",
      editableTabsValue: "2",
      metaDetail: {},
      metasData: [
        {
          meta_id: "1d",
          label: "用户管理",
          children: [
            {
              meta_id: "1-2fff",
              label: "用户列表",
              children: [
                {
                  meta_id: "1-2-1",
                  label: "用户列表查询"
                }
              ]
            }
          ]
        },
        {
          meta_id: "2",
          label: "角色管理",
          children: [
            {
              meta_id: "1-2-1-1-1-1",
              label: "用户列表查询"
            }
          ]
        },
        {
          meta_id: "3",
          label: "用户管理",
          children: [
            {
              meta_id: "1-2-1-1-1-1",
              label: "用户列表查询",
              children: [
                {
                  meta_id: "1-2-1-1-1-1",
                  label: "用户列表查询"
                }
              ]
            }
          ]
        },
        {
          meta_id: "4",
          label: "角色管理"
        }
      ],
      editableTabs: [
        {
          title: "Tab 1",
          name: "1",
          content: "Tab 1 content"
        },
        {
          title: "Tab 2",
          name: "2",
          content: "Tab 2 content"
        }
      ],
      tabIndex: 2,
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  components: {
      menutree: menutree
  },
  methods: {
    elMenuSelectA(p) {
      this.oneMetadataApiFA(p)
      console.log(p);
    },
    searchA() {
      if (this.metaInput) {
        this.metadatasSearchApiFA(this.metaInput);
      } else {
        this.metadatasApiFA();
      }
      
      console.log(94, this.metaInput);
    },
    treeNodeClick(p1, p2, p3) {
      console.log(1, p1);
      console.log(2, p2);
      console.log(3, p3);
    },
    addTab(targetName) {
      let newTabName = ++this.tabIndex + "";
      this.editableTabs.push({
        title: "New Tab",
        name: newTabName,
        content: "New Tab content"
      });
      this.editableTabsValue = newTabName;
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
    metadatasApiFA() {
      metadatasApiF()
        .then(result => {
          this.metasData = result || [];
          console.log(121, result);
        })
        .catch(() => {});
    },
    metadatasSearchApiFA(value) {
      metadatasSearchApiF({
        key: value
      })
        .then(result => {
          this.metasData = result || [];
        })
        .catch(() => {});
    },
    oneMetadataApiFA(id) {
      oneMetadataApiF(id)
        .then(result => {
          this.metaDetail = result || {};
        })
        .catch(() => {});
    }
  },
  watch: {},
  mounted() {
    this.metadatasApiFA();
    // this.metadatasSearchApiFA('T2D')
    // this.oneMetadataApiFA(33);
  }
};
</script>

<style lang="scss" scoped>
@import "./index";
</style>
