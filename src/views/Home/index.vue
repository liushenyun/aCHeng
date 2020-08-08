<template>
  <div class="JY-home">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple">LOGO</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple-light">公司名称</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple">metagenome</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple-light">projects</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple">metadata</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple-light">Global Seach</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple-light">contact us</div></el-col>
          <el-col :span="2"><div class="grid-content bg-purple-light">Cart</div></el-col>
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
  }
}
</script>

<style lang="scss" scoped>
@import './index'
</style>
