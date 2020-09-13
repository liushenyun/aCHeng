<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <pub-loading></pub-loading>
    <transition name='fade' mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import PubLoading from "./components/Loading"
import puGetSearch from '@/utils/puGetSearch'
import { setToken } from '@/common/js/ut'
export default {
  name: 'app',
  components: {
    PubLoading
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style  lang="scss">
@import './common/css/reset';
@import './common/css/animation';
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .el-table thead th,
  .el-table thead tr {
    background-color: #f3f3f3;
  }
  .el-table thead th>.cell {
    color: #677AFB;
    font-weight: 700;
    font-weight: bolder;
  }
}
.el-icon-download {
  font-size: 16px
}
.pr-table .el-table__body .one-column {
  color: #409eff;
  cursor: pointer;
}
.JY-home {
  .el-drawer__body {
    height: 100%;
    overflow: auto;
  }
  .el-drawer__title {
    margin-bottom: 10px
  }
  .el-drawer__header {
    margin-bottom: 0;
  }
  .el-drawer__header>:first-child {
    font-size: 16px;
    font-weight: bolder;
  }
}
.PROJECT-outer {
  .drawer-con-wrap {
    height: 100%;
    .el-container {
      height: 100%;
      .table {
        height: 100%;
      }
    }
  }
  // .el-drawer__body {
  //   overflow: auto;
  // }
}
.GlobalSearch-outer {
  .aside-card.el-card {
      overflow: auto;
  }
  .el-container {
    height: 100%;
  }
}
.Metagenome-outer {
  .aside-card {
    .el-card__body {
      padding: 0;
    }
  }
  .aside-card.el-card {
      overflow: auto;
  }
  .mm-trees-wrap {
    .el-tree-node {
      padding: 8px 0;
    }
    .el-tree-node__label {
      font-size: 16px;
      color: #2F2725;
      text-align: center;
      // font-weight: bolder;
    }
  }
}
.PROJECT-outer {
  .pr-table {
    .el-link--inner {
      display: flex;
      align-items: center;
    }
  }
  // .search-outer {
  //   .el-input__inner {
  //     border: 1px solid #677AFB;
  //   }
  // }
}
.MetaData-outer {
  .search-outer {
    .el-link--inner {
      display: flex;
      align-items: center;
    }
  }
}
</style>
