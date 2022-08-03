<template>
  <div>
    <el-form  label-width="80px">

      <el-form-item label="项目名称">
        <el-input class="infoInput" placeholder="请输入项目名称" v-model="NewProject.Name"></el-input>
      </el-form-item>
      <el-form-item label="项目描述">
        <el-input class="infoInput" type="textarea" placeholder="请输入项目描述" v-model="NewProject.Description"></el-input>
      </el-form-item>
      
    </el-form>
    <el-button type="primary" class="bottomButton" @click="buildproj()">创建项目</el-button>
    <el-button type="danger" class="bottomButton" @click="cancelproj()">取消创建</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      NewProject:{
        Name:'',
        Description:'',
      }
    }
  },
  methods: {
    buildproj(){
      //创建项目还没有实现，先在控制台输出信息
      console.log(JSON.stringify(this.NewProject))
    },
    cancelproj(){
      this.$router.back()
    }
  }
}
</script>

<style>
.bottomButton {
  float: left;
  margin-top: 20px;
  margin-left: 80px;
}
</style>