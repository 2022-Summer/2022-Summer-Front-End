<template>
<div id="app" >
    <el-container>
      <el-header height="150px" >
        <img src="./assets/img/moshu_banner.png" width="450px" height="150px">
        <div style="margin-top: 55px;float:right;">
          <el-button type="primary" v-on:click="gotologin" v-if="!$store.state.islogin">
            登录
          </el-button>
          <h1 v-if="$store.state.islogin">
            欢迎,<router-link to="/">{{$store.state.username}}</router-link>
          </h1>
          <el-button type="primary" v-on:click="logout" v-if="this.$store.state.islogin">
            退出登录
          </el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="20%">
          <div style="margin:50% 10%;text-align:left;">
            <p>(◍•ᴗ•◍)我是侧边栏</p>
            <p style="color:darkred">Tips：为了更好的浏览体验，建议使用分辨率大于等于1600*900的设备访问本网站</p>
          </div>
          <img src="https://badges.toozhao.com/badges/01G9NYGBKXCVD7GT0YGTKPJET9/orange.svg" />
        </el-aside>
        <el-main style="padding:20px 0 0 0;">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
    export default{
  data() {
    return {
        AddSubmenuData:{
          id:"",
          pid:"",
          funType:1,
          name:"",
          sort:"",
          SystemCoding:"",
          remarks:"",
          imageUrl: ''
        },
    }
  },
  created(){
      //在页面加载时读取sessionStorage里的状态信息
      if(sessionStorage.getItem('storeState')){
          //replaceState，替换store的根状态
          this.$store.replaceState(Object.assign({},this.$store.state,JSON.parse(sessionStorage.getItem('storeState'))))
      }
  //在页面刷新时将vuex里的信息保存到sessionStorage里
         window.addEventListener('beforeunload',()=>{
         sessionStorage.setItem('storeState',JSON.stringify(this.$store.state))
          })
      },
      methods:{
        gotologin(){
          this.$router.push('/Login');
        },
        logout(){
        this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/user/logout/'       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
      })
      .then(res => {              /* res 是 response 的缩写 */
        switch (res.data.errno) {
          case 0:
            break;
        }
      })
      .catch(err => {
        console.log(err);         /* 若出现异常则在终端输出相关信息 */
      });
      this.$store.commit('logout');
      this.$message.success("退出登录成功");
        setTimeout(() => {
                this.$router.push('/');
            }, 1000);
        }
      }
    }
</script>

<style>
/*
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.nav1{
  font-weight: bold;
  color: #000000;
  float:right;
}
.nav2{
  font-weight: bold;
  float:left;
}
 a.router-link-exact-active {
  color: #000000;
}
#app .wrap {
  width: 60%;
  height: 0%;
  padding: 0 25px 0 25px;
  line-height: 40px;
  position: relative;
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 20px;
}
.footer{
  position: fixed;
  bottom: 0;
  width: 100px;
  line-height: var(--footer-height);
  background: #42b983;
  color: #fff;
}
*/
.el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
