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
    <el-button type="primary" class="bottomButton" @click="buildproj">创建项目</el-button>
    <el-button type="danger" class="bottomButton" @click="cancelproj">取消创建</el-button>
  </div>
</template>

<script>
import qs from "qs";
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
    buildproj:function(){
    this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
          url: "/api/project/new/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
          data: qs.stringify({
                    /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          teamid:this.$store.state.teamid,
          email:this.$store.state.mailbox,
          title:this.NewProject.Name,
          Description:this.NewProject.Description
            }),
            }).then((res) => {
                switch (res.data.errno) {
                    case 0:
                        this.$message.success("创建成功");
                        break;
                }
            });
      this.$router.back()
    },
    cancelproj:function(){
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