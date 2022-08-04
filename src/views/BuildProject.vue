<template>
  <div class="login" id="login">
    <div class="wrap">
      <el-form  label-width="80px" class="form">
        <el-form-item label="项目名称">
          <el-input class="infoInput" placeholder="请输入项目名称" v-model="NewProject.Name"></el-input>
        </el-form-item>
        <el-form-item label="项目描述">
          <el-input class="infoInput" type="textarea" rows="10" placeholder="请输入项目描述" v-model="NewProject.Description"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="bottomButton" @click="buildproj">创建项目</el-button>
      <el-button type="danger" class="bottomButton" @click="cancelproj">取消创建</el-button>
    </div>
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
    this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
          url: "/api/project/new/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
          data: qs.stringify({
                    /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          teamid:this.$store.state.teamid,
          email:this.$store.state.mailbox,
          title:this.NewProject.Name,
          Descrition:this.NewProject.Descrition
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
    cancelproj(){
      this.$router.back()
    }
  }
}
</script>
<style scoped>
#login {
  font-family: 'Noto Serif SC', serif;
  position: relative;
  top:0;
  left: 0;
  height: 800px;
  background-color: rgb(246, 246, 246);
}
#login >>> .el-input__inner {
  font-family: 'Noto Serif SC', serif;
}
#login .bgbox {
  display: block;
  opacity: 1;
  z-index: -3;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 1s,transform .25s,filter .25s;
  backface-visibility: hidden;
}
#login .wrap {
  width: 800px;
  height: auto;
  padding: 40px;
  line-height: 40px;
  position: relative;
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 20px;
  margin-top: 150px;
  box-shadow: darkgrey 1px 1px 1px 1px ;
}
#login .btn_login {
  margin-top: 25px;
  text-align: center;
}
#login .btn_login button{
  line-height: 10px;
  font-family: 'Noto Serif SC', serif;
  width: 100%;
  height: 38px;
}
#login .suffix {
  font-size:14px;
  line-height:10px;
  color:#999;
  cursor: pointer;
  float:left;
}
#login .suff {
  font-size:14px;
  line-height:10px;
  color:#999;
  cursor: pointer;
  float:right;
}
.bottomButton {
  float: left;
  margin-top: 20px;
  margin-left: 80px;
}
</style> 