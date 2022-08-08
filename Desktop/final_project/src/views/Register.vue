<template>
<div id="register">
  <div @click="gotoWelcome" style="cursor:pointer;">
      <img src="../assets/img/moshu_top.png" style="width:500px;margin-top:40px;">
  </div>
  <div class="form_box">
    <img src="../assets/img/register_banner.png">
    <el-form class="form">
      <!--待添加rules-->
      <el-form-item>
        <el-input class="el_in" placeholder="请输入邮箱" v-model="form.email"
          prefix-icon="el-icon-postcard" clearable>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input class="el_in" placeholder="请输入昵称" v-model="form.nickname"
          prefix-icon="el-icon-user" clearable>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input class="el_in" placeholder="请输入用户名" v-model="form.username"
          prefix-icon="el-icon-user-solid" clearable>
        </el-input>
      </el-form-item> 
      <el-form-item>
        <el-input class="el_in" placeholder="请输入密码" v-model="form.password1"
          prefix-icon="el-icon-lock" show-password clearable>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input class="el_in" placeholder="请确认密码" v-model="form.password2"
          prefix-icon="el-icon-lock" show-password clearable>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input class="el_in" placeholder="请输入验证码" v-model="form.verifyCode"
          prefix-icon="el-icon-s-check" clearable style="float:left;width:60%;"
          @click="getVerifyCode">
        </el-input>
        <el-button class="el_btn2" @click="getVerifyCode">发送</el-button>
      </el-form-item> 
      <el-form-item>
        <el-button class="el_btn1" @click="gotoMainPage">
          登&nbsp;&nbsp;录
        </el-button>
      </el-form-item>
    </el-form>
    <div class="form_btm" @click="gotoLogin">已有账号？马上登录</div>
  </div>
</div>
</template>

<script>
export default{
  data() {
    return{
      form: {
        email:'',
        nickname:'',
        username:'',
        password1:'',
        password1:'',
        verifyCode:''
      }
    }
  },
  methods: {
    gotoWelcome(){
      this.$router.push('/')
    },
    gotoMainPage(){

    },
    getVerifyCode(){

    },
    gotoLogin(){
      this.$router.push("/login")
    }
  }
}
</script>

<style scoped>
#register {
  min-height: 100vh;
  background-image: url("../assets/img/background.png");
  background-size: 100%;
}

.form_box {
  width: 340px;
  height: auto;
  padding: 10px 25px;
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
  width:400px;
  padding:20px 40px;
}

.el_in{
  font-size: 16px;
}

.el_btn1 {
  width: 86%;
  font-size:18px;
  color:white;
  background-color: #89C7BF;
  border-radius:20px;
  border: 1px solid rgba(150, 169, 183, 0.413);
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
  from{
    transform: translate(-50%,0);
  }
  to{

  }
}
</style>