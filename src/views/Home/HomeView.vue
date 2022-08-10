<template>
<div class="home">
  <PageHeader/>
  <el-container style="margin-top:72px;height:calc(100vh - 72px);">
    <el-aside width="240px" style="overflow:hidden">
      <HomeAside/>
    </el-aside>
    <el-main class="el_main" style="padding:0;">
      <!--Home的页面组件-->
      <router-view></router-view>
    </el-main>
  </el-container>
</div>
</template>

<script>
import PageHeader from "../../components/PageHeader.vue"
import HomeAside from "./HomeAside.vue"
export default {
  components: { PageHeader, HomeAside }
}
</script>

<style scoped>
.el-main {
  background-color: #d7faf6; 
  color: #333;
  text-align: center;
}
</style>