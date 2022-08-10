<template>
<div id="teamlist">
  <div class="invite_box">
    <!--需要v-if特殊判断没有团队，没有团队也需要做样式-->
    <div v-if="myTeams.length==0">
      <p style="font-size:21px;weight:600;">您还没有任何团队，赶紧去创立/加入团队吧</p>
    </div>
    <div v-for="team in myTeams" :key="team.teamid" class="el_card">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span><b>{{team.name}}</b></span>
          <el-button style="float:right;margin:5px;" type="text"><b>进入团队</b></el-button>
        </div>
        <div class="box_text">
          <p><b>团队名：</b>{{team.name}}</p>
          <p><b>发起者：</b>{{team.belong}}</p>
          <p><b>建立时间：</b>{{team.foundedTime}}</p>
        </div>
      </el-card>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      myTeams:[
        {
          "teamid":1,
          "name":"没头发",
          "belong":"zy1",
          "foundedTime":"2020.1.1",
        },
        {
          "teamid":2,
          "name":"绝绝子",
          "belong":"集美们",
          "foundedTime":"2020.6.6",
        }
      ]
    }
  }
}
</script>


<style scoped>
#teamlist {
  min-height: calc(100vh - 72px);
  background-image: url("../../assets/img/backgrounds/3.png");
  background-repeat:no-repeat;
  background-size: 33%;
  background-position:right top;
}

.box_text {
  font-size: 16px;
  line-height: 40px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.box-card {
  width: 320px;
  background-color: rgba(194, 232, 228, 0.5);
  border-radius: 20px;
  transition: 0.8s;
}
.box-card:hover {
  background-color: rgba(119, 171, 164, 0.5);
}

.invite_box {
  width: 1100px;
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
.el_card{
  display: inline-block;
  margin:20px;
}

@keyframes appear_effect{
  from{
    transform: translate(-50%,-25%);
  }
  to{}
}
</style>