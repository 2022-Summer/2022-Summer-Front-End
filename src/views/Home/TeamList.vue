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
          <el-button style="float:right;margin:5px;" type="text" @click="intoTeam(team.teamid)">
            <b>进入团队</b>
          </el-button>
        </div>
        <div class="box_text">
          <p><b>团队名：</b>{{team.name}}</p>
          <p><b>发起者：</b>{{team.belong}}</p>
          <p><b>建立时间：</b>{{team.foundedTime}}</p>
        </div>
      </el-card>
    </div>
    <el-button class="el_btn1" @click="buildTeam">
      新建团队
    </el-button>
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
          "foundedTime":"2020.1.1"
        },
        {
          "teamid":2,
          "name":"绝绝子",
          "belong":"集美们",
          "foundedTime":"2020.6.6"
        },
        {
          "teamid":3,
          "name":"好累呀",
          "belong":"PLT",
          "foundedTime":"2020.9.9"
        }
      ]
    }
  },
  created(){
    if(!this.$store.state.islogin){
      this.$message.warning("From /teamlist: 请先登录");
      this.$router.push('/login');
    }
    else{
      this.$axios({
        method: 'get',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/user/team/'     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        })
        .then((res) => {
          switch (res.data.errno){
            case 0:
              this.myTeams=res.data.myTeams;
              break;
          }
        })
        .catch(err => {
          this.$message.error("获取团队列表失败")
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        });
    }
  },
  methods: {
    intoTeam(val){//进入id为val的团队主页
      this.$store.state.teamid=val;
      this.$router.push('/memberlist');
    },
    buildTeam(){
      this.$router.push('/buildteam');
    },
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