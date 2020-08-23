<template>
    <div class="menutree">
        <label v-for="menu in data" :key="menu.meta_id">
            <el-submenu :index="menu.meta_id.toString()" v-if="menu.children">
                <template slot="title">
                    <span>{{menu.label}}</span>
                </template>
                <label>
                    <menutree :data="menu.children"></menutree>
                </label>
            </el-submenu>
            <el-menu-item v-else :index="menu.meta_id.toString()">
                <span slot="title">{{menu.label}}</span>
            </el-menu-item>
        </label>
    </div>
</template>

<script>
import menutree from "./menutree";
export default {
  name: "menutree",
  data() {
    return {
      menu_data: {}
    };
  },
  components: {
    menutree: menutree
  },
  props: ["data"]
};
</script>
