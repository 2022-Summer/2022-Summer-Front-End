<template>
  <el-container id="search">
    <el-main id="main">
      <div>
        <el-menu id="menu" mode="horizontal"  active-text-color="#ffd04b">
          <el-menu-item @click="to1" index="1">原型设计</el-menu-item>
          <el-menu-item @click="to2" index="2">图绘制</el-menu-item>
            <el-menu-item @click="to3" index="3">文档编辑</el-menu-item>
        </el-menu>
      </div>
      <div id="infoTable" v-if="projectIndex===3">
        <div>
            <el-button type="primary" @click="newword" class="bottomButton" round>新建文档</el-button>
            <!--大抵还是要显示已经生成的文档吧，至于怎么做，还不知道-->
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import qs from "qs";
export default {
  name: "main",
  data() {
    return {
        projectIndex:3,//不同值显示不同板块
        projectid:0,
        }
  },
  created(){
  }, 
  methods: {
    to1: function(){
      this.projectIndex=1;
    },
    to2: function(){
      this.projectIndex=2;
    },
    to3: function(){
      this.projectIndex=3;
    },
    newword: function(){
      this.$store.state.wordid=0;
      this.$router.push('/word');
    }
  }
}
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>

<style scoped>
#search {
  font-family: 'Noto Serif SC', serif;
  margin-top: 20px;
}
#head {
  background-color: #d4e7d9;
  color: #333;
  text-align: center;
  line-height: 60px;
}
#main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
#tip,#latestTable,#courseTable,#exerTable,#lifeTable,#newTable{
  margin-top: 20px;
}
.tipText {
  margin-bottom: 20px;
}
.bottomButton {
  float: left;
  margin-top: 20px;
  margin-left: 20px;
}
</style>