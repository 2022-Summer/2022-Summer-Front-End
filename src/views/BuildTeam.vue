<template>
    <div id="login" class="login">
    <div class="wrap">
      <el-form  label-width="80px" class="form">
        <el-form-item label="团队名">
          <el-input class="infoInput" placeholder="请输入团队名" v-model="input1"></el-input>
        </el-form-item>
        <el-form-item label="发起者">
          <el-input class="infoInput" v-model="input2" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="团队简介">
          <el-input class="infoInput" type="textarea" rows="10" placeholder="这是一个团队。" v-model="input3"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="bottomButton" @click="build">建立团队</el-button>
      <el-button type="danger" class="bottomButton" @click="cancel">取消</el-button>
    </div>
  </div>
  <!---
  <div>
    <el-form  label-width="80px">
      <el-form-item label="团队名">
        <el-input class="infoInput" placeholder="请输入团队名" v-model="input1"></el-input>
      </el-form-item>
      <el-form-item label="发起者">
        <el-input class="infoInput" v-model="input2" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="团队简介">
        <el-input class="infoInput" type="textarea" autosize placeholder="这是一个团队。" v-model="input3"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" class="bottomButton" @click="build">建立团队</el-button>
    <el-button type="danger" class="bottomButton" @click="cancel">取消</el-button>
  </div>
  -->
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      input1:'',
      input2: this.$store.state.username,
      input3: '',
    }
  },
  created(){
  }, 
  methods: {
    build(){
      /*
      团队名：this.input1
      发起人：this.input2即this.$store.state.username
      团队简介：this.input3
      应该还要传一个当前日期
      */
      this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/team/found/',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({      /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
            teamname:this.input1,
            email:this.$store.state.mailbox,
            intro:this.input3
        })
      })
      .then(res => {              /* res 是 response 的缩写 */
        switch (res.data.errno) {
          case 0:
            this.$store.state.teamid=res.data.teamid;
            this.$router.push('/');
            break;
        }
      })
      .catch(err => {
        console.log(err);         /* 若出现异常则在终端输出相关信息 */
      })     
    },
    cancel(){
      this.$router.push('/');
    },
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