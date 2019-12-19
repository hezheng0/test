<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template slot="title">
                  {{
                  subItem.title
                  }}
                </template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from "./bus";
export default {
  data() {
    return {
      collapse: false,
      items: [
        { icon: "el-icon-s-home", index: "home", title: "首页" },
        {
          icon: "el-icon-s-order",
          index: "2",
          title: "表格范例",
          subs: [
            { icon: "", index: "table", title: "table实例" },
            { icon: "", index: "form", title: "form实例" }
          ]
        },
        {
          icon: "el-icon-copy-document",
          index: "messages",
          title: "信息"
        },
        { icon: "el-icon-s-order", index: "schedule", title: "课程表" },
        {
          icon: "el-icon-s-custom",
          index: "4",
          title: "监测多级",
          subs: [
            {
              index: "permission",
              title: "权限"
            },
            { index: "404", title: "404页面" }
          ]
        },
        { icon: "el-icon-phone", index: "callTest", title: "拨号盘" },
        { index: "test", title: "测试demo" }
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  created() {
    bus.$on("collapse", msg => {
      this.collapse = msg;
      bus.$emit("collapse-content", msg);
    });
  }
};
</script>

<style>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
