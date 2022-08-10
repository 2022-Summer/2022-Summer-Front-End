<template>
<div class="home">

  <el-container style="height:100vh;">
    <el-aside width="240px" style="overflow:hidden">
      <ProjectAside/>
    </el-aside>
    <el-main style="padding:0;">
      <router-view></router-view>
    </el-main>
  </el-container>
</div>
</template>

<script>
import PageHeader from "../../components/PageHeader.vue"
import ProjectAside from "./ProjectAside.vue"
export default {
  components: { PageHeader, ProjectAside }
}
</script>

<style scoped>
.el-main {
  background-color: #d7faf6; 
  color: #333;
  text-align: center;
}
</style>