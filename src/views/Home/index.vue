<template>
  <div class="JY-home">
    <el-container>
      <el-header class="home-header">
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple">
            <i class="el-icon-eleme"></i>
          </div></el-col>
          <el-col :span="3"><div class="grid-content">公司名称</div></el-col>
          <el-col :span="3"><div class="grid-content" :class="$route.path == '/metagenome' ? 'button-active':''"><router-link to="/metagenome">metagenome</router-link></div></el-col>
          <el-col :span="3"><div class="grid-content" :class="$route.path == '/project' ? 'button-active':''"><router-link to="/project">project</router-link></div></el-col>
          <el-col :span="3"><div class="grid-content" :class="$route.path == '/metaData' ? 'button-active':''"><router-link to="/metaData">MetaData</router-link></div></el-col>
          <el-col :span="3"><div class="grid-content" :class="$route.path == '/globalSearch' ? 'button-active':''"><router-link to="/globalSearch">Global Search</router-link></div></el-col>
          <el-col :span="3"><div class="grid-content" :class="$route.path == '/contact' ? 'button-active':''"><router-link to="/contact">Contact Us</router-link></div></el-col>
          <el-col :span="2"><div class="grid-content">Cart</div></el-col>
        </el-row>
      </el-header>
      <el-container>
        <router-view>
          <!-- <el-aside width="200px">Aside</el-aside>
          <el-main>Main</el-main> -->
        </router-view>
      </el-container>
      <el-footer>Footer</el-footer>
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
    }
  },
  components: {
  },
  methods: {
      toDetailA(type, item) {
        this.$router.push({
          path: `/detailA/${type}/${item.id}`
        })
      }
  },
  watch: {
  },
  mounted () {
    console.log(this.$route)
  }
}
</script>

<style lang="scss" scoped>
@import './index'
</style>
