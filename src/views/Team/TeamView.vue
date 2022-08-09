<template>
<div class="home">
  <PageHeader/>
  <el-container style="margin-top:72px;height:calc(100vh - 72px);">
    <el-aside width="240px" style="overflow:hidden">
      <TeamAside/>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</div>
</template>

<script>
import PageHeader from "../../components/PageHeader.vue"
import TeamAside from "./TeamAside.vue"
export default {
  created(){
    this.$router.push('/memberlist')
  },
  components: { PageHeader, TeamAside }
}
</script>

<style scoped>
.el-main {
  background-color: #d7faf6; 
  color: #333;
  text-align: center;
}
</style>