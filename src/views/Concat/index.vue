<template>
  <div class="Concat-outer">
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="Report Bugs" name="first">
        <!-- <p class="tip">Report Bugs</p> -->
        <div class="input-row">
          <p class="input-title">Project Id：</p>
          <el-input placeholder="Project Id" v-model="input1Id"></el-input>
        </div>
        <div class="input-row">
          <p class="input-title">Email：</p>
          <el-input placeholder="Email" v-model="input1Email"></el-input>
        </div>
        <div class="input-row">
          <p class="input-title">Error Description：</p>
          <el-input type="textarea" :rows="2" placeholder="Description" v-model="input1Des"></el-input>
        </div>
        <el-row>
          <el-button type="primary" @click="bugA">submit</el-button>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Report New MetaGenome" name="second">
        <!-- <p class="tip">Report New MetaGenome</p> -->
        <div class="input-row">
          <p class="input-title">Topic：</p>
          <el-input placeholder="Topic" v-model="input2Topic"></el-input>
        </div>
        <div class="input-row">
          <p class="input-title">Link：</p>
          <el-input placeholder="Link" v-model="input2Link"></el-input>
        </div>
        <div class="input-row">
          <p class="input-title">Email：</p>
          <el-input placeholder="Email" v-model="input2Email"></el-input>
        </div>
        <div class="input-row">
          <p class="input-title">Description：</p>
          <el-input type="textarea" :rows="2" placeholder="Description" v-model="input2Des"></el-input>
        </div>
        <el-row>
          <el-button type="primary" @click="metaA">submit</el-button>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// @ is an alias to /src
import { beforeRouteLeave } from "@/common/js/mixin.js";
import { reportBugApiF, reportMetagenomeApiF } from "@/service/requestFun.js";
// reportBugApiF,
// reportMetagenomeApiF
export default {
  name: "Concat",
  mixins: [beforeRouteLeave],
  data() {
    return {
      activeName: "first",
      input1Id: "",
      input1Des: "",
      input1Email: "",
      input2Topic: "",
      input2Des: "",
      input2Email: "",
      input2Link: ""
    };
  },
  components: {},
  methods: {
    bugA() {
      reportBugApiF({
        project_id: this.input1Id,
        description: this.input1Des,
        email: this.input1Email
      })
        .then(result => {
          this.$message.success('Submit Success')
          console.log(96, result)
        })
        .catch(() => {});
      // _para = {}
    },
    metaA() {
      reportMetagenomeApiF({
        topic: this.input2Topic,
        description: this.input2Des,
        link: this.input2Link,
        email: this.input2Email
      }).then((res) => {
        this.$message.success('Submit Success')
        console.log(97, res)
      }).catch(() => {
      })
    }
  },
  watch: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "./index";
</style>
