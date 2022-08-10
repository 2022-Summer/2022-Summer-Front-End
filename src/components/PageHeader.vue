<template>
<!--
***这是 Home,Team and Project 页面的上边栏组件***
-->
<div id="top_banner">
  <div class="top_left" @click="backMain">
    <img src="../assets/img/characters/moshu_top.png" style="float:left;height:72px;">
  </div>

  <div class="top_right">
    <div class="head_box" @click="gotoProfile">
      <img src="../assets/img/heads/1.png">
    </div>
    <div class="div_btn1" @click="logout">登出</div> 
  </div>
</div>
</template>

<script>
export default {
  methods: {
    backMain() {
      this.$router.push("/")
    },
    gotoProfile(){
      this.$router.push("/profile")
    },
    logout(){
      this.$store.commit('logout')
      this.$message.warning("您已注销登录");
      setTimeout(() => {
        this.$router.push('/');
      }, 1000);
    }
  }
}
</script>

<style scoped>
#top_banner {
  width: 100%;
  height: 72px;
  position: fixed;
  top:0px;
  backdrop-filter: blur(20px);
  /*background-color: rgb(177, 218, 213);*/
  background: linear-gradient(to right, #77aba4, #d7faf6);
  z-index: 1;
  box-shadow: 0 4px 6px 0 rgba(0,0,0,0.24),0 6px 18px 0 rgba(0,0,0,0.19);
  overflow: hidden;
  display: block;
}

.div_btn1 {
  display: none;
  color:black;
  background-color: white;
  font-size: 20px;
  border: 1px solid rgba(150, 169, 183, 0.413);
  border-radius: 10px;
  margin: 15px;
  margin-left: 0;
  padding: 5px;
  width: 60px;
  transition: 1.0s;
  float:left;
}
.div_btn1:hover {
  cursor: pointer;
  box-shadow: 0 4px 6px 0 rgba(0,0,0,0.24),0 6px 18px 0 rgba(0,0,0,0.19);
}

.top_left {
  float:left;
}
.top_left:hover {
  cursor: pointer;
}

.top_middle {
  float:left
}

.top_right {
  float:right;
  margin-right:40px;
  font-size: 30px;
  transition: 2.5s;
}
.top_right:hover .div_btn1{
  display: block;
}

.head_box {
  width: 66px;
  height: 66px;
  border:1px solid;
  border-radius: 20px;
  float:left;
  margin-top:2px;
  margin-right:20px;
}
.head_box:hover {
  margin-top:0;
  border:3px solid;
  cursor: pointer;
}
.head_box img{
  width: 66px;
  height: 66px;
  border-radius: 20px;
}
</style>