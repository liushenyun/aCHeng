<template>
  <div class="JY-home">
    <el-container>
      <el-header class="home-header">
        <el-row>
          <!-- <el-col :span="4">
            <div class="grid-content bg-purple">
              <i class="el-icon-eleme"></i>
            </div>
          </el-col> -->
          <el-col class="company-name" :span="8">
            <div class="grid-content">CHIP DATABASE</div>
          </el-col>
          <el-col :span="2" :offset="6" class="col-offset">
            <div class="grid-content" :class="$route.path == '/metagenome' ? 'button-active':''">
              <router-link to="/metagenome">Metagenome</router-link>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content" :class="$route.path == '/project' ? 'button-active':''">
              <span>12</span>
              <router-link to="/project">Project</router-link>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content" :class="$route.path == '/metaData' ? 'button-active':''">
              <router-link to="/metaData">MetaData</router-link>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content" :class="$route.path == '/globalSearch' ? 'button-active':''">
              <router-link to="/globalSearch">Search</router-link>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content" :class="$route.path == '/contact' ? 'button-active':''">
              <router-link to="/contact">Contact Us</router-link>
            </div>
          </el-col>
          <!-- <el-col :span="2">
            <div class="grid-content">Cart</div>
          </el-col> -->
        </el-row>
      </el-header>
      <div class="cart-outer">
        <el-badge :value="cartNum">
          <el-button type="success" @click="openDrawer" icon="el-icon-s-goods" circle></el-button>
        </el-badge>
      </div>
      <el-drawer title="Cart Information" :visible.sync="drawer" :before-close="handleClose">
        <el-container>
          <el-main>
            <el-table :data="gridData" border="" @selection-change="handleSelectionChange" height="100%">
              <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column property="SampleID" label="Samples" width="150"></el-table-column>
              <el-table-column property="Project" label="Project" width="200"></el-table-column>
            </el-table>
          </el-main>
          <el-footer>
            <el-row>
              <el-button type="danger" icon="el-icon-delete" @click="delProjectA" circle></el-button>
              <el-button type="primary" icon="el-icon-download" @click="downLoadA" circle></el-button>
            </el-row>
          </el-footer>
        </el-container>
      </el-drawer>
      <el-container>
        <router-view>
          <!-- <el-aside width="200px">Aside</el-aside>
          <el-main>Main</el-main>-->
        </router-view>
      </el-container>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import { beforeRouteLeave } from "@/common/js/mixin.js";
import { cartDownloadApiF } from "@/service/requestFun.js";
import { getCat, delCat } from '@/common/js/ut'
export default {
  name: "home",
  mixins: [beforeRouteLeave],
  data() {
    return {
      drawer: false,
      showCartButton: true,
      gridData: [],
      checkedGrid: [],
      cartNum: 0
    };
  },
  components: {},
  methods: {
    handleSelectionChange (v) {
      this.checkedGrid = v
      console.log(95, v)
    },
    cartDownloadApiFA() {
      cartDownloadApiF({
        sample: [
          ["A1", "A"],
          ["A2", "A"],
          ["A3", "A"],
          ["B1", "B"],
          ["B4", "B"],
          ["C5", "C"]
        ]
      })
        .then(() => {})
        .catch(() => {});
    },
    handleClose(done) {
      done();
    },
    openDrawer() {
      this.drawer = true;
      this.renderCat();
    },
    renderCat() {
      let _catData = getCat();
      let _list = []
      for (const key in _catData) {
        if (_catData.hasOwnProperty(key)) {
          const element = _catData[key];
          _list.push(element)
        }
      }
      this.gridData = _list
    },
    delProjectA() {
      this.$confirm("sure delete？", {
          confirmButtonText: 'sure',
          cancelButtonText: 'cancel',
          type: 'warning'
        })
        .then(_ => {
          console.log(132, this.checkedGrid)
          if (this.checkedGrid.length) {
            delCat(this.checkedGrid)
            setTimeout(() => {
              this.renderCat();
            }, 10)
          }
        })
        .catch(_ => {});
    },
    downLoadA() {
      this.cartDownloadApiFA()
    }
  },
  watch: {},
  mounted() {
    this.cartNum = Object.keys(getCat()).length
    this.$bus.$off('computedCount').$on('computedCount', (data) => {
      this.cartNum = Object.keys(data).length
    })
  }
};
</script>

<style lang="scss" scoped>
@import "./index";
</style>
