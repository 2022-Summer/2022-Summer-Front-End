<template>
<div id="teaminfo">
  <div class="form_box1">
    <img src="../../assets/img/characters/teaminfo.png">
    <div class="head_div">
      <img src="../../assets/img/heads/9.png" style="width:120px;">
    </div>
    <p>团队名：{{team.name}}</p>
    <p>发起者：{{team.belong}}</p>
    <p>人数：{{team.memberNum}}</p>
    <p>简介：{{team.intro}}</p>
  </div>
</div>
</template>

<style scoped>
#teaminfo {
  min-height: calc(100vh - 72px);
  background-image: url("../../assets/img/backgrounds/5.png");
  background-repeat:no-repeat;
  background-size: 20%;
  background-position:right bottom;
}

.form_box1 {
  width: 28%;
  height: auto;
  padding: 10px 25px;
  margin: auto;
  border-radius: 40px;
  line-height: 50px;
  position: absolute;
  top: 50%;  left: calc(50% + 120px);  
	transform: translate(-50%,-50%);
  transition: 1.0s;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 12px 18px 0 rgba(0,0,0,0.24),0 16px 40px 0 rgba(0,0,0,0.19);
  animation: appear_effect 1.5s;
}
.form_box1:hover{
  width:25%;
  padding:20px 40px;
}

.head_div{
  width:120px;
  height:120px;
  border:20px solid white;
  border-radius:120px;
  margin:0 auto;
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

@keyframes appear_effect{
  from{
    transform: translate(-50%,-25%);
  }
  to{}
}
</style>

<script>
import qs from "qs";
export default {
  data(){
    return{
      team:{
        "id":1,
        "name":"没头发",
        "belong":"zy1",
        "foundedTime":"2020.1.1",
        "memberNum":6,
        "intro":"这是一个团队"
      },
    }
  },
  created() {
    if (!this.$store.state.islogin) {
      this.$message.warning("请先登录");
      this.$router.push('/login');
    }
    else {
      this.$axios({
        method: 'get',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/team/message/',     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        params: {
          teamid: this.$store.state.teamid
        }
      })
        .then((res) => {
          switch (res.data.errno) {
            case 0:
              this.team.id = this.$store.state.teamid;
              this.team.name = res.data.data.teamname;
              this.team.belong = res.data.data.belong;
              this.team.foundedTime = res.data.data.foundedTime;
              this.team.memberNum = res.data.data.memberNum;
              this.team.intro = res.data.data.intro;
              break;
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        });
    }
  },
  methods:{}
}
</script>