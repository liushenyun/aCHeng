<template>
    <div class="mm-con-inner">
        <h6 class="mm-con-title">Tag</h6>
        <el-checkbox-group v-model="tabsItem.samplesChecklist">
            <el-checkbox
                v-for="(item, index) in tabsItem.tabTags"
                :key="index"
                :label="item.name"
            >{{item.name}}({{item.number}})</el-checkbox>
        </el-checkbox-group>
        <el-divider></el-divider>
        <h6 class="mm-con-title">Metadata</h6>
        <div>
            <ul class="meta-data-ul">
                <li v-for="(item, index) in tabsItem.prjectMeta" :key="index">
                    <div @click="metaClick(item)">
                        <img v-if="item.checked" src="../../image/btn_selected_check.png" alt="">
                        <img v-else src="../../image/btn_normal_check.png" alt="">
                    </div>
                    <span @click="showInfo(item)">{{item.name}}</span>
                </li>
            </ul>
        </div>
        <el-divider></el-divider>
        <h6 class="mm-con-title">Sample</h6>
        <div class="mm-table" style="margin-bottom: 10px">
            <el-table :data="activeSamples" height="350" border="" style="width: 100%;">
                <el-table-column prop="SampleID" label="Sample" width=""></el-table-column>
                <el-table-column prop="Tags" label="Tags" width=""></el-table-column>
                <el-table-column prop="Project" label="Project"></el-table-column>
                <el-table-column
                    v-for="(item, index) in tabsItem.projectActiveMeta"
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
</template>

<script>
import { setCat } from "@/common/js/ut";
export default {
  name: "MetaCom",
  data() {
    return {
      activeSamples: []
    };
  },
  components: {},
  watch: {
    tabsItem: {
      handler(nVal, oVal) {
        console.log(81, nVal, oVal);
        var _list = [];
        nVal.projectSamples.forEach(v => {
          if (nVal.samplesChecklist.includes(v.Tags)) {
            _list.push(v);
          }
        });
        this.activeSamples = _list;
      },
      deep: true
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
  },
  props: {
    tabsItem: {
      type: Object,
      default: () => ({})
    }
  },
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
    showInfo(item) {
      this.$emit("showInfo", item);
    },
    metaClick(item) {
      item.checked = !item.checked;
      if (item.checked) {
        if (!this.tabsItem.projectActiveMeta.includes(item.name)) {
          this.tabsItem.projectActiveMeta.push(item.name);
        }
      } else {
        let _index = this.tabsItem.projectActiveMeta.indexOf(item.name);
        if (_index > -1) {
          this.tabsItem.projectActiveMeta.splice(_index, 1);
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.mm-con-title {
  font-size: 18px;
  color: #2f2725;
  margin: 30px 0 30px 0;
  font-weight: bolder;
}
.meta-data-ul {
  overflow: hidden;
  li {
    display: flex;
    float: left;
    min-width: 86px;
    margin: 0 10px 16px 0;
    align-items: center;
    div {
      cursor: pointer;
      width: 20px;
      height: 20px;
      margin-right: 6px;
    }
    span {
      flex: 1;
      cursor: pointer;
    }
    span:hover {
      color: #677afb;
      text-decoration: underline;
    }
  }
}
.mm-table {
  .add-samll {
    padding: 4px 6px;
    background: #e8ebfe;
    border-radius: 2px;
    border: 0px solid;
    img {
      width: 14px;
      height: 14px;
    }
  }
}
</style>
