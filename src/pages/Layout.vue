<template>
  <fullscreen ref="fullscreen">
    <el-container>
      <el-aside :width="isCollapse ? '65px' : '226px'">
        <h1>小U商城后台</h1>
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#333"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          :collapse="isCollapse"
          :collapse-transition="false"
          unique-opened
        >
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">管理中心</span>
          </el-menu-item>
          <div v-for="(item, index) in menus" :key="item.id">
            <!-- 菜单 -->
            <el-menu-item :index="item.url" v-if="item.type == 2">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
            <!-- 目录 -->
            <el-submenu :index="String(index)" v-else>
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <!-- 子菜单 -->
              <el-menu-item
                :index="val.url"
                v-for="val in item.children"
                :key="val.id"
              >
                <span slot="title">{{ val.title }}</span>
              </el-menu-item>
            </el-submenu>
          </div>
          <!-- 
         <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>系统设置</span>
          </template>
          <el-menu-item index="/menu">
            <span slot="title">菜单管理</span>
          </el-menu-item>
          <el-menu-item index="/role">
            <span slot="title">角色管理</span>
          </el-menu-item>
          <el-menu-item index="/user">
            <span slot="title">管理员管理</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-goods"></i>
            <span>商城管理</span>
          </template>
          <el-menu-item index="/cate">
            <span slot="title">商品分类</span>
          </el-menu-item>
          <el-menu-item index="/specs">
            <span slot="title">规格管理</span>
          </el-menu-item>
          <el-menu-item index="/goods">
            <span slot="title">商品管理</span>
          </el-menu-item>
          <el-menu-item index="/member">
            <span slot="title">会员管理</span>
          </el-menu-item>
          <el-menu-item index="/banner">
            <span slot="title">轮播图管理</span>
          </el-menu-item>
          <el-menu-item index="/seckill">
            <span slot="title">秒杀活动</span>
          </el-menu-item>
        </el-submenu> 
 -->
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="left">
            <el-button
              class="btn"
              type="primary"
              icon="el-icon-s-fold"
              size="mini"
              @click="isCollapse = !isCollapse"
            ></el-button>
          </div>
          <div class="right">
            <el-dropdown>
              <span class="el-dropdown-link">
                {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <div @click="fullscreen">全屏预览</div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div @click="quit">安全退出</div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <!-- 二级路由占位符 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </fullscreen>
</template>

<script>
import Vue from "vue";
import fullscreen from "vue-fullscreen";
Vue.use(fullscreen);
export default {
  data() {
    return {
      isCollapse: false,
      username: JSON.parse(localStorage.getItem("userInfo") || "{}").username,
    };
  },
  created() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    this.menus = userInfo.menus;
  },
  methods: {
    // 退出
    quit() {
      // 1.弹出退出成功
      this.$message({
        message: "退出成功",
        type: "success",
      });
      // 2.清空localStorage
      localStorage.removeItem("userInfo");
      // 3.跳转到登录页
      this.$router.push("/login");
    },
    fullscreen() {
      this.$refs.fullscreen.toggle();
    },
  },
  components: {},
};
</script>
<style scoped>
.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0 5px #444;
  z-index: 1;
}

.el-aside {
  background-color: #333;
  /* 过渡动画 */
  transition: all 0.2s ease;
}
.el-aside h1 {
  background-color: #444;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  font-weight: 400;
  /* 字间距 */
  letter-spacing: 5px;
  white-space: nowrap;
}

.el-main {
  background-color: #e9eef3;
}
.el-container {
  height: 100vh;
}
.el-menu {
  border: 0;
}
.btn {
  font-size: 16px;
}
</style>