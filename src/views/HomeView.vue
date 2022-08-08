<template>
<div class="home">
  <div id="top_banner">
    <img src="../assets/img/moshu_top.png" style="float:left;height:72px;">
    <ul id="top_left">
      <div class="div_btn1" style="float:left" @click="gotoLogin">登录</div>
      <div class="div_btn1" style="float:left" @click="gotoRegister">注册</div>
    </ul>
  </div>
  
</div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
#top_banner {
  width: 100%;
  height: 72px;
  position: fixed;
  backdrop-filter: blur(20px);
  background-color: rgba(177, 218, 213, 0.5);
  z-index: 1;
  box-shadow: 10rpx 10rpx 10rpx rgb(0 0 0 / 18%);
  overflow: auto;
}

#top_left {
  float:right;
  margin-right:40px;
  font-size: 30px;
}

</style>