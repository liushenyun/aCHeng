<template>
  <div class="JY-home">
    <el-container class="JH-el-comtainer">
      <el-header class="home-header">
        <!-- <el-row :gutter="10"> -->
        <ul class="h-ul">
          <li :class="$route.path == '/index' ? 'index button-active':''">
            <router-link to="/index">
              CHIP DATABASE
            </router-link>
          </li>
          <li :class="$route.path == '/metagenome' ? 'button-active':''">
            <img v-if="$route.path == '/metagenome'" src="../../image/ic_selected_Metagenome.png" alt="">
            <img v-else src="../../image/ic_normal_Metagenome.png" alt="">
            <router-link to="/metagenome">
              Metagenome
            </router-link>
          </li>
          <li :class="$route.path == '/project' ? 'button-active':''">
            <img v-if="$route.path == '/project'" src="../../image/ic_selected_Project.png" alt="">
            <img v-else src="../../image/ic_normal_Project.png" alt="">
            <router-link to="/project">Project</router-link>
          </li>
          <li :class="$route.path == '/metaData' ? 'button-active':''">
            <img v-if="$route.path == '/metaData'" src="../../image/ic_selected_MetaData.png" alt="">
            <img v-else src="../../image/ic_normal_MetaData.png" alt="">
            <router-link to="/metaData">MetaData</router-link>
          </li>
          <li :class="$route.path == '/globalSearch' ? 'button-active':''">
            <img v-if="$route.path == '/globalSearch'" src="../../image/ic_selected_Search.png" alt="">
            <img v-else src="../../image/ic_normal_Search.png" alt="">
            <router-link to="/globalSearch">Search</router-link>
          </li>
          <li :class="$route.path == '/contact' ? 'button-active':''">
            <img v-if="$route.path == '/contact'" src="../../image/ic_selected_Contact.png" alt="">
            <img v-else src="../../image/ic_normal_Contact.png" alt="">
            <router-link to="/contact">Contact Us</router-link>
          </li>
        </ul>
        <!-- <el-row>
          <el-col class="company-name" :span="9">
            <div class="grid-content">CHIP DATABASE</div>
          </el-col>
          <el-col :span="3" class="col-offset">
            <div class="grid-content" :class="$route.path == '/metagenome' ? 'button-active':''">
              <img style="width: 24px;margin-right: 12px" src="../../image/ic_selected_Project.png" alt="">
              <router-link to="/metagenome">
                Metagenome
              </router-link>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content" :class="$route.path == '/project' ? 'button-active':''">
              <img style="width: 24px;margin-right: 12px" src="../../image/ic_selected_Project.png" alt="">
              <router-link to="/project">Project</router-link>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content" :class="$route.path == '/metaData' ? 'button-active':''">
              <img style="width: 24px;margin-right: 12px" src="../../image/ic_selected_Project.png" alt="">
              <router-link to="/metaData">MetaData</router-link>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content" :class="$route.path == '/globalSearch' ? 'button-active':''">
              <img style="width: 24px;margin-right: 12px" src="../../image/ic_selected_Project.png" alt="">
              <router-link to="/globalSearch">Search</router-link>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content" :class="$route.path == '/contact' ? 'button-active':''">
              <img style="width: 24px;margin-right: 12px" src="../../image/ic_selected_Project.png" alt="">
              <router-link to="/contact">Contact Us</router-link>
            </div>
          </el-col>
        </el-row> -->
      </el-header>
      <div class="cart-outer">
        <el-badge :value="cartNum">
          <el-button style="background: #473DF" @click="openDrawer" circle>
            <!-- <img src="../../image/btn_selected_buy.png" alt=""> -->
            <!-- <img src="../../image/btn_normal_buy.png" alt=""> -->
            <img src="../../image/btn_selected_buyall01.png" alt="">
          </el-button>
        </el-badge>
      </div>
      <el-drawer class="cart-drawer" title="Cart Information" :visible.sync="drawer" :before-close="handleClose">
        <el-container>
          <el-main>
            <el-table height="100%" :data="gridData" border="" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column property="SampleID" label="Samples" width="150"></el-table-column>
              <el-table-column property="Project" label="Project" width="200"></el-table-column>
            </el-table>
          </el-main>
          <el-footer style="height: 80px">
            <el-row>
              <el-button type="danger" @click="delProjectA" circle>
                <img style="width: 24px;" src="../../image/btn_delete.png" alt="">
              </el-button>
              <el-button type="primary" @click="downLoadA" circle>
                <img style="width: 24px;" src="../../image/ic_Download02.png" alt="">
              </el-button>
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
          if (this.checkedGrid.length) {
            delCat(this.checkedGrid)
            setTimeout(() => {
              this.renderCat();
            }, 10)
            setTimeout(() => {
              this.$bus.$emit('updatePageCatData', getCat())
            }, 100)
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
