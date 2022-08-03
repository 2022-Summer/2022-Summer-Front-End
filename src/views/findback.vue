<template>
  <div id="login" class="login">
    <div class="wrap">
      <h1>找回密码</h1>
      <el-form :model="form" ref="form" :rules="rules" class="form">
      <el-form-item  prop="mailbox">
        <el-input placeholder="邮箱" v-model="form.mailbox"></el-input>
      </el-form-item>
        <el-form-item>
          <el-button type="primary" plain float="right" @click="send">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="code">
          <el-input placeholder="验证码" type="code"  v-model="form.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="btn_login">
          <el-button type="primary" @click="get">找回密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "NewRegister",
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
    return {
      form: {
        mailbox: '',
        code:'',
      },
      rules: {
      mailbox: [
      { validator: checkEmail, trigger: 'change' }
    ]
  }
    }
  },
  methods: {
      send: function () {
      this.$axios({
        method: 'get',           
        url: '/api/user/password/',       
        params:{
          mailbox:this.form.mailbox
        }
      })
      .then(res => {              /* res 是 response 的缩写 */
        switch (res.data.errno) {
          case 0:
            this.$message.success("发送成功");
            break;
          case 3001:
            this.$message.error("请求方式错误!");
            break;
          case 3002:
            this.$message.error("用户不存在!");
            break;
        }
      })
      .catch(err => {
        console.log(err);         /* 若出现异常则在终端输出相关信息 */
      })
    },
    get: function(){
      if(this.form.mailbox === '' || this.form.code === ''){
        this.$message.warning("请填写完整信息");
      }
      this.$axios({
        method: 'post',           
        url: '/api/user/password/',       
        data: qs.stringify({      
          mailbox: this.form.mailbox,
          code: this.form.code
        })
      })
      .then(res => {
          switch (res.data.errno) {
          case 0:
            this.$message.success("密码为:"+res.data.password);
            setTimeout(() => {
                this.$router.push('/Login');
            }, 1000);
            break;
          case 4002:
            this.$message.error("验证码错误!");
            break;
          case 4003:
            this.$message.error("用户不存在!");
            break;
        }
      })
      .catch(err => {
        console.log(err);         /* 若出现异常则在终端输出相关信息 */
      })
    },
  },
}
</script>

</script>

<style scoped>
#login {
  font-family: 'Noto Serif SC', serif;
  background-color: rgb(246,246,246);
  width: 100%;
  height: 100%;
  position: absolute;
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
  width: 300px;
  height: 400px;
  padding: 0 25px 0 25px;
  line-height: 40px;
  position: relative;
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 20px;
  margin-top: 100px;
  box-shadow: darkgrey 1px 1px 1px 1px;
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
</style>