<template>
<div>
  <div id="top_banner">
    <div class="top_left">
      <img src="../assets/img/characters/moshu_top.png" style="float:left;height:72px;">
    </div>
    <!--如果读取到登录信息就显示登录后的情况-->
    <div class="top_right">
      <div class="div_btn1" style="float:left" @click="gotoLogin">登录</div>
      <div class="div_btn1" style="float:left" @click="gotoRegister">注册</div>
    </div>
  </div>

  <div style="height:100px;"></div>
  <div>
      <div class="text_head">
        免费在线的团队协作管理平台
      </div>
      <div class="text_detail">
        软工团队协作与管理平台，为校内外中小团队的项目协作开发提供管理服务
      </div>
  </div>
  <div class="div_btn2" @click="gotoLogin"
    style="margin:auto;margin-top:40px;margin-bottom:60px;">
    开始使用
  </div>
  
  <div class="div_intro1">
    <div class="intro_img">
      <img src="../assets/img/img_test.jpg">
    </div>
    <div class="intro_text">
      <div class="text_head">
        水墨风清新风格界面
      </div>
      <div class="text_detail">
        水墨风清新风格界面，带给你不一样的使用体验
      </div>
    </div>
  </div>

  <div class="div_intro2">
    <div class="intro_text">
      <div class="text_head">
        高效的图形绘制
      </div>
      <div class="text_detail">
        内置强大的作图工具，支持多人实时在线协作，可用于原型图、UML等多种图形绘制
      </div>
    </div>
    <div class="intro_img">
      <img src="../assets/img/test_img.jpg">
    </div>
  </div>

  <div class="div_intro1">
    <div class="intro_img">
      <img src="../assets/img/img_test.jpg">
    </div>
    <div class="intro_text">
      <div class="text_head">
        多人协作云端存储
      </div>
      <div class="text_detail">
        多人绘制，多端同步，实时存储，历史版本可回溯，文件安全有保障
      </div>
    </div>
  </div>

  <div class="div_intro2">
      <div class="intro_text">
        <div class="text_head">
          更多功能，等你体验...
        </div>
        <div class="text_detail">
          加入我们，创建独属于自己的团队和项目，和志同道合的好兄弟好姐妹一起玩转软工，享受开发的乐趣...
        </div>
        <div class="div_btn2" style="margin:auto;margin-top:40px;" @click="gotoRegister">立即使用</div>
      </div>
      <div class="intro_img">
        <img src="../assets/img/img_test.jpg">
      </div>
    </div>

    <div class="div_intro1" style="height:300px;display: block;">
      <div class="info_img">
        <p style="margin-bottom:20px;font-size:18px;">友情链接</p>
        <img src="../assets/img/nbpl.png">
      </div>
      <div class="info_img">
        <p style="margin-bottom:20px;font-size:18px;">关于我们</p>
        <img src="../assets/img/about_us.png">
      </div>
      <div class="info_img" style="width:240px;">
        <p style="margin-bottom:20px;font-size:18px;">访问统计</p>
        <img src="https://badges.toozhao.com/badges/01G9NYGBKXCVD7GT0YGTKPJET9/blue.svg"
            style="width:100%;margin:auto;" alt="连接异常">
      </div>
    </div>

</div>
</template>

<script>
export default {
  methods: {
    gotoLogin(){//跳转到登录界面
        this.$router.push("/login")
    },
    gotoRegister(){//跳转到注册界面
        this.$router.push("/register")
    }
  }
}
</script>

<style scoped>
#top_banner {
  width: 100%;
  height: 72px;
  position: fixed;
  backdrop-filter: blur(20px);
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 1;
  box-shadow: 10rpx 10rpx 10rpx rgb(0 0 0 / 18%);
  overflow: hidden;
}

.top_left {
  float:left;
}
.top_left:hover {
  cursor: pointer;
}
.top_right {
  float:right;
  margin-right:40px;
  font-size: 30px;
}

.div_btn1 {
  color:black;
  font-size: 20px;
  border: 1px solid rgba(150, 169, 183, 0.413);
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  width: 80px;
  transition: 1.0s;
}
.div_btn1:hover {
  cursor: pointer;
  box-shadow: 0 4px 6px 0 rgba(0,0,0,0.24),0 6px 18px 0 rgba(0,0,0,0.19);
}

.div_btn2{
  color:white;
  font-size: 24px;
  background-color:black;
  border: 1px solid rgba(150, 169, 183, 0.413);
  border-radius: 10px;
  margin: 10px;
  padding: 15px 34px;
  width: 100px;
  transition: 1.0s;
}
.div_btn2:hover {
  cursor: pointer;
  padding: 20px 48px;
  box-shadow: 0 10px 16px 0 rgba(0,0,0,0.24),0 14px 36px 0 rgba(0,0,0,0.19);
}

.text_head {
  font-size:48px;
  font-weight:600;
  color:black;
}
.text_detail {
  margin-top:24px;
  font-size:20px;
  color:#6c7d8f;
}

.div_intro1 {
  display: flex;
  flex-direction: row;
  height: 600px;
  background: linear-gradient(to right, #77aba4, #d7faf6); 
}
.div_intro2 {
  display: flex;
  flex-direction: row;
  height: 600px;
}

.intro_text {
  float:left;
  width:40%;
  margin: auto;
}
.intro_img {
  border-radius: 10px;
  float: right;
  width:40%;
  margin: auto;
  transition: 1.0s;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.3), 0 12px 40px 0 rgba(0, 0, 0, 0.28);
  animation: resize_effect 1.5s;
}
.intro_img:hover {
  width: 45%;
}

.intro_img img {
  border-radius:10px;
  width:100%;
  display: block;
}

.info_img {
  width: 180px;
  float: right;
  border-radius:10px;
  margin:50px 80px 0 0;
}
.info_img img {
  border-radius:10px;
  width:100%;
  display: block;
}

@keyframes resize_effect{
  from{width:45%;}
  to{}
}
</style>
