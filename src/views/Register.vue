<template>
<div id="register">
  <div @click="gotoWelcome" style="cursor:pointer;">
      <img src="../assets/img/characters/moshu_top.png" style="width:500px;margin-top:40px;">
  </div>
  <div class="form_box">
    <img src="../assets/img/characters/register_banner.png">
    <el-form ref="form">
      <!--待添加rules-->
      <el-form-item>
        <el-input class="el_in" placeholder="请输入邮箱" v-model="form.mailbox"
          prefix-icon="el-icon-postcard" clearable>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input class="el_in" placeholder="请输入昵称" v-model="form.username"
          prefix-icon="el-icon-user" clearable>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input class="el_in" placeholder="请输入用户名" v-model="form.name"
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
        <el-input class="el_in" placeholder="请输入验证码" v-model="form.code"
          prefix-icon="el-icon-s-check" clearable style="float:left;width:60%;">
        </el-input>
        <el-button class="el_btn2" @click="send">发送</el-button>
      </el-form-item> 
      <el-form-item>
        <el-button class="el_btn1" @click="register">
          注册账号
        </el-button>
      </el-form-item>
    </el-form>
    <div class="form_btm" @click="gotoLogin">已有账号？马上登录</div>
  </div>
</div>
</template>

<script>
import qs from "qs";
export default{
  data() {
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }
    return{
      form: {
        mailbox:'', //邮箱
        username:'', //昵称
        name:'',  //用户名
        password1:'', //密码
        password1:'', //重复密码
        code:'' //验证码
      },
      rules: {
        mailbox: [
          { validator: checkEmail, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    gotoWelcome(){
      this.$router.push('/')
    },
    gotoLogin(){
      this.$router.push("/login")
    },
    send() { //发送验证码
      if (this.form.mailbox === '') {
        this.$message.error("邮箱不能为空");
        return;
      }
      this.$axios({
        method: 'get',
        url: '/api/user/register/',
        params: {
          mailbox: this.form.mailbox
        }
        })
        .then(res => {              /* res 是 response 的缩写 */
          switch (res.data.errno) {
            case 0:
              this.$message.success("发送成功");
              break;
            case 1001:
              this.$message.error("请求方式错误!");
              break;
            case 1002:
              this.$message.error("邮箱格式错误!");
              break;
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        })
    },
    register(){//注册账号，需要交互
      if (this.form.password1 === ''|| this.form.password2 === '' || this.form.username === '' ||
          this.form.name === '' || this.form.mailbox === '' || this.form.code === '') {
        this.$message.warning("请填写完整信息!");
        return;
      }
      this.$axios({
        method: 'post',           
        url: '/api/user/register/',       
        data: qs.stringify({      
          name: this.form.name,
          username: this.form.username,
          mailbox: this.form.mailbox,
          code:this.form.code,
          password_1: this.form.password1,
          password_2: this.form.password2,
        })
      })
      .then(res => { 
        switch (res.data.errno) {
          case 0:
            this.$message.success("注册成功！");
            setTimeout(() => {
                this.$router.push('/login');
            }, 1000);
            break;
          case 1002:
            this.$message.error("该邮箱已被注册!");
            break;
          case 1003:
            this.$message.error("两次输入的密码不一致!");
            break;
          case 1004: 
            this.$message.error("验证码错误");
            break;
        }
      })
      .catch(err => {
        console.log(err);  
      })
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
    transform: translate(-50%,-25%);
  }
  to{}
}
</style>