<template>
    <div class="rule-com">
        <div class="rule-outer">
            <el-row style="margin-bottom: 20px;" v-for="(item, index) in project.ruleList" :key="index">
                <label class="cmeta-title">{{item.name}}:</label>
                <el-checkbox-group class="enum-outer" v-if="item.type == 'enum'" v-model="item.checked">
                    <el-checkbox v-for="(sub, k) in item.values" :key="k" :label="sub"></el-checkbox>
                </el-checkbox-group>
                <label class="range-outer" v-if="item.type == 'range'">
                    <el-input class="rang-input" type='number' size="mini" placeholder="min" v-model="item.min"></el-input>
                    <label class="rang-label">-</label>
                    <el-input class="rang-input" type='number' size="mini" placeholder="max" v-model="item.max"></el-input>
                </label>
            </el-row>
            <!-- <el-row style="margin-top: 60px; text-algign: right">
                <el-button type="primary" @click="searchA">search</el-button>
            </el-row> -->
        </div>
        <div class="button-outer">
            <el-button size='mini' v-if="isShowCascader" type="success" icon="el-icon-check" @click="checkedRuleA">Add Rule</el-button>
            <el-button size='mini' v-else class="button-add" type="primary" icon="el-icon-edit" @click="toEdit">Add Rule</el-button><label for="" style="color: #999; margin-left: 6px"></label>
            <el-cascader-panel v-model="checkedRule"  @mouseleave.native.prevent="checkedRuleA()" v-if="isShowCascader" class="rule-cascader" :options="project.allRuler" :props="{ multiple: true, checkStrictly: true }"></el-cascader-panel>
        </div>
    </div>
</template>

<script>
import {
  searchOneRulerApiF
} from "@/service/requestFun.js";
export default {
  name: "RuleCom",
  data() {
    return {
        rulesList: [],
        // options: [
        //     { value: '1', label: '3' },
        //     { value: '1', label: '3' },
        //     { value: '1', label: '3' }
        // ],
        isShowCascader: false,
        checkedRule: []
    };
  },
  components: {
  },
  props: {
    project: {
        type: Object,
        default: () => ({})
    }
  },
  methods: {
      checkedRuleA() {
          this.isShowCascader = false
          let _k = this.checkedRule.map(v => v[0])
          let _l = this.project.allRuler.filter(v => _k.includes(v.name))
          this.$emit('changeRuler', {
              id: this.project.id,
              checkedRule: _l
          })
      },
      toEdit() {
          if (this.project.allRuler && this.project.allRuler.length) {
              this.isShowCascader = true
              return
          }
          this.searchOneRulerApiFA(this.project.id)
      },
      searchOneRulerApiFA(id) {
          searchOneRulerApiF(id).then((result) => {
             result.ruler.forEach(v => {
                 v.value = v.name
                 v.label = v.name
                 if (v.type == "enum") {
                    v.checked = [];
                } else if (v.type == "range") {
                    v.min = "";
                    v.max = "";
                }
             });
            // this.rulesList = result.ruler
            this.isShowCascader = true
            this.$emit('allRuler', {
                id: this.project.id,
                allRuler: result.ruler
            })
            // this.$emit('changeRuler', id)
          }).catch((err) => {
          });
      }
  }
};
</script>
<style lang="scss" scoped>
.button-outer {
    width: 200px;
    .button-add {
        margin-bottom: 10px;
    }
}
.rule-outer {
    .el-row {
        display: flex;
        align-items: center;
    }
    h3 {
    margin: 20px 0 10px 0;
    // font-weight: bolder;
   }
   .cmeta-title {
     display: inline-block;
     font-weight: 500;
     margin: 0 20px 0px 0;
     width: 60px;
     text-align: right;
     font-size: 14px;
   }
   .range-outer,
   .enum-outer {
     display: inline-block;
   }
   .range-outer {
    display: flex;
    justify-items: center;
    align-items: center;
    .rang-label {
        margin: 0 6px;
    }
    .rang-input {
        width: 100px;
        //  margin-right: 20px;
    }
    }
}
</style>
