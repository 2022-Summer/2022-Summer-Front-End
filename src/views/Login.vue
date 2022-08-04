<template>
  <div id="login" class="login">
    <div class="wrap">
      <h1>登 录</h1>
      <el-form :model="form" ref="form" :rules="rules" class="form">
      <el-form-item  prop="mailbox">
        <el-input placeholder="邮箱" v-model="form.mailbox"></el-input>
      </el-form-item>
        <el-form-item id="password" prop="password">
          <el-input
              placeholder="密码"
              show-password
              type="password"
              v-model="form.password"
              autocomplete="off"
              @keyup.enter.native="login"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn_login">
          <el-button type="primary" @click="login">登&nbsp;&nbsp;录</el-button>
        </el-form-item>
      </el-form>
      <div class="suffix">
        <p @click="toRegister">注册帐号</p>
      </div>
      <div class="suff">
        <p @click="tofind">找回密码</p>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "main",
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
        password: '',
        mailbox:'',
      },
      rules: {
      mailbox: [
      { validator: checkEmail, trigger: 'change' }
    ]
  }
    }
  },
  methods: {
    login: function () {
      // 检查表单是否有填写内容      
      if (this.form.mailbox === '' || this.form.password === '') {
        this.$message.warning("请输入邮箱和密码!");
        return;
      }
      this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/user/login/',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({      /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          mailbox: this.form.mailbox,
          password: this.form.password
        })
      })
      .then(res => {              /* res 是 response 的缩写 */
        switch (res.data.errno) {
          case 0:
            this.$message.success("登录成功！");
            /* 将后端返回的 user 信息使用 vuex 存储起来 */
            this.$store.state.mailbox=res.data.mailbox;
            this.$store.state.username=res.data.username;
            this.$store.commit('login');
            /* 从 localStorage 中读取 preRoute 键对应的值 */
            const history_pth = localStorage.getItem('preRoute');
            /* 若保存的路由为空或为注册路由，则跳转首页；否则跳转前路由（setTimeout表示1000ms后执行） */
            setTimeout(() => {
                this.$router.push('/');
            }, 1000);
            break;
          case 2002:
            this.$message.error("密码错误!");
            break;
          case 2003:
            this.$message.error("用户不存在!");
            break;
        }
      })
      .catch(err => {
        console.log(err);         /* 若出现异常则在终端输出相关信息 */
      })
    },
    toRegister: function () {
      // 跳转注册的路由
      this.$router.push('/register');
    },
    tofind: function (){
      this.$router.push('/findback');
    },
    
  }
}
</script>

<style scoped>
#login {
  font-family: 'Noto Serif SC', serif;
  position: absolute;
  width: 100%;
  height: 100%;
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
  width: 300px;
  height: 315px;
  padding: 0 25px 0 25px;
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
</style>