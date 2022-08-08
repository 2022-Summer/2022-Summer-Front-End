<template>
<div id="login">
  <div @click="gotoWelcome" style="cursor:pointer;">
      <img src="../assets/img/moshu_top.png" style="width:500px;margin-top:40px;">
  </div>
  <div class="form_box">
    <el-tabs v-model="paneName">
      <el-tab-pane label="邮箱登录" name="first">
        <el-form class="form">
          <!--待添加rules-->
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
              prefix-icon="el-icon-s-check" clearable style="float:left;width:60%;"
              @click="getVerifyCode">
            </el-input>
            <el-button class="el_btn2" @click="getVerifyCode">发送</el-button>
          </el-form-item> 
          <el-form-item>
            <el-button class="el_btn1" @click="findBack">
              找回密码
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <div class="form_btm" @click="toRegister">没有账号？马上注册</div>
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
    return {
      paneName:'first',
      form: {
        password: '',
        mailbox:'',
        code:''
      },
      rules: {
        mailbox: [
          { validator: checkEmail, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    gotoWelcome: function(){
      this.$router.push('/');
    },
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
  from{transform: translate(-50%,20%);}
  to{}
}
</style>