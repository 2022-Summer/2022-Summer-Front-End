<template>
<div id="login">
  <div @click="gotoWelcome" style="cursor:pointer;">
      <img src="../assets/img/characters/moshu_top.png" style="width:500px;margin-top:40px;">
  </div>
  <div class="form_box">
    <el-tabs v-model="paneName">
      <el-tab-pane label="邮箱登录" name="first">
        <el-form class="form">
          <!--待添加rules，用于限定邮箱和密码格式-->
          <el-form-item>
            <el-input class="el_in" placeholder="请输入邮箱" v-model="form.mailbox"
              prefix-icon="el-icon-postcard" clearable>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input class="el_in" placeholder="请输入密码" v-model="form.password"
              prefix-icon="el-icon-lock" show-password clearable>
            </el-input>
          </el-form-item> 
          <el-form-item>
            <el-button class="el_btn1" @click="login">
              登&nbsp;&nbsp;录
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="找回密码" name="second">
        <el-form class="form">
          <!--待添加rules-->
          <el-form-item>
            <el-input class="el_in" placeholder="请输入邮箱" v-model="form.mailbox"
              prefix-icon="el-icon-postcard" clearable>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input class="el_in" placeholder="请输入验证码" v-model="form.code"
              prefix-icon="el-icon-s-check" clearable style="float:left;width:60%;">
            </el-input>
            <el-button class="el_btn2" @click="sendCode">发送</el-button>
          </el-form-item> 
          <el-form-item>
            <el-button class="el_btn1" @click="checkCode">
              找回密码
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <div class="form_btm" @click="gotoRegister">没有账号？马上注册</div>
  </div>
</div>
</template>

<script>
export default{
  data(){
    return{
      paneName:'first', //初始选中第一个窗口（也就是登录窗口）
      form:{
        mailbox:'', //邮箱
        password:'', //密码
        code:'' //验证码
      }
    }
  },
  methods: {
    gotoWelcome(){
      this.$router.push('/');
    },
    gotoRegister(){
      this.$router.push('/register');
    },
    login(){ //登录账号，需要和后端交互
      
      //需要添加内容

      this.$message.success("登录成功，前往主界面");
      setTimeout(() => {
        this.$router.push('/teamlist');
      }, 1000);
    },
    sendCode(){ //发送验证码，需要和后端交互
      
      //内容待添加
      
      this.$message.success("验证码已发送，请注意接收");
    },
    checkCode(){ //校验验证码，需要和后端交互
      
      //内容待添加
      
      this.$message.success("验证成功，您的密码为：" + "password");
    }
  }
}
</script>

<style scoped>
#login {
  min-height: 100vh;
  background-image: url("../assets/img/background.png");
  background-size: 100%;
}

.form_box {
  width: 300px;
  height: auto;
  padding: 25px;
  margin: auto;
  border-radius: 40px;
  line-height: 50px;
  position: absolute;
  top: 50%;  left: 50%;  
	transform: translate(-50%,-50%);
  transition: 1.0s;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 12px 18px 0 rgba(0,0,0,0.24),0 16px 40px 0 rgba(0,0,0,0.19);
  animation: appear_effect 1.5s;
}
.form_box:hover{
  width:360px;
  padding:36px;
}

.el_in{
  font-size: 16px;
  margin-top: 10px;
}

.el_btn1 {
  width: 86%;
  font-size:18px;
  color:white;
  background-color: #89C7BF;
  border-radius:20px;
  border: 1px solid rgba(150, 169, 183, 0.413);
  margin-top:10px;
  padding: 10px;
  transition: 0.2s;
}
.el_btn1:hover {
  width:94%;
  box-shadow: 0 4px 6px 0 rgba(0,0,0,0.25),0 8px 16px 0 rgba(0,0,0,0.20);
}
.el_btn1:active {
  background-color: #dff6f4;
}

.el_btn2 {
  width:26%;
  font-size:16px;
  color:white;
  background-color: #89C7BF;
  border-radius:10px;
  border: 1px solid rgba(150, 169, 183, 0.413);
  margin-top:10px;
  transition: 0.2s;
}
.el_btn2:hover {
  width:32%;
  box-shadow: 0 4px 6px 0 rgba(0,0,0,0.25),0 8px 16px 0 rgba(0,0,0,0.20);
}
.el_btn2:active {
  background-color: #dff6f4;
}

.form_btm {
  font-size: 12px;
  float: right;
  color: #999;
  cursor: pointer;
  transition: 1.0s;
  line-height:32px;
}
.form_btm:hover {
  color: rgb(145, 171, 203);
  font-size: 15px;
  padding:10px;
}

@keyframes appear_effect{
  from{transform: translate(-50%,0);}
  to{}
}
</style>