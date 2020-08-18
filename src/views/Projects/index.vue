<template>
  <div class="PROJECT-outer">
    <div class="search-outer" style="margin-bottom: 10px">
      <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="pr-table">
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          height="250">
          <el-table-column
            fixed
            prop="date"
            label="Project"
            width="">
          </el-table-column>
          <el-table-column
            prop="name"
            label="Tags"
            width="">
          </el-table-column>
          <el-table-column
            prop="province"
            label="sampleNumber"
            width="">
          </el-table-column>
          <el-table-column
            prop="city"
            label="Published Year"
            width="">
          </el-table-column>
          <el-table-column
            prop="address"
            label="Download"
            width="">
            <template slot-scope="scope">
              <el-button
                icon="el-icon-download"
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
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
      input3: '',
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
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
