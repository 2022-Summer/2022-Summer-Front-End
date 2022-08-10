<template>
<div id="memberlist">
  <a href="/word">To Project</a>
  <div class="member_box">
    <!--需要v-if特殊判断没有邀请的情况，没有邀请也需要做样式-->
    <div v-if="Members.length==0">
      <p style="font-size:21px;weight:600;">您还没有收到邀请，赶紧让队友邀请你吧</p>
    </div>
    <div v-for="mem in Members" :key="mem.email" class="el_card">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span><img src="../../assets/img/heads/1.png" width="80px;"
              style="border-radius: 10px;border: 4px solid gold;"></span>
          <el-button v-if="mem.status==='管理员'&&myStatus==='发起人'" type="text"
              style="float:right;margin:5px;color:red;"><b>移出</b></el-button>
          <el-button v-if="mem.status==='管理员'&&myStatus==='发起人'" type="text"
              style="float:right;margin:5px;color:red;"><b>降级</b></el-button>
          <el-button v-if="mem.status==='普通用户'&&myStatus!=='普通用户'" type="text"
              style="float:right;margin:5px;color:red;"><b>移出</b></el-button>
          <el-button v-if="mem.status==='普通用户'&&myStatus!=='普通用户'" type="text"
              style="float:right;margin:5px;color:green;"><b>提升</b></el-button>
        </div>
        <div class="box_text">
          <p><b>昵称：</b>{{mem.username}}</p>
          <p><b>身份：</b>{{mem.status}}</p>
          <p><b>姓名：</b>{{mem.name}}</p>
          <p><b>邮箱：</b>{{mem.email}}</p>
          <p><b>个人简介：</b>{{mem.description}}</p>
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
      myStatus: "发起人",
      team: {
        "id":1,
        "name":"没头发",
        "belong":"zy1",
        "foundedTime":"2020.1.1",
        "memberNum":6,
        "intro":"这是一个团队"
      },
      Members:[//成员列表
        {
          "name":"zy1",
          "username":'zy',
          "email":"1@qq.com",
          "sex":'男',
          "status":"发起人",
          "description":'啥也没写.HHHHHHHHHHHHHHHHHHHh'
        },
        {
          "name":"PLT",
          "username":'PLY',
          "email":"plutopupchenplutopupchenpzpzpzp@gmail.com",
          "sex":'男',
          "status":"管理员",
          "description":'啥也没写!'
        },
        {
          "name":"chen",
          "username":'wang',
          "email":"3@qq.com",
          "sex":'男',
          "status":"普通用户",
          "description":'今天跟集美出去逛街啦，搞点神仙甜品778顺便暴风吸入'
        },
        {
          "name":"liu",
          "username":'liu',
          "email":"66@pp.com",
          "sex":'男',
          "status":"普通用户",
          "description":'今天跟集美出去逛街啦，搞点神仙甜品778顺便暴风吸入'
        },
        
      ],
    }
  },
  computed: {
      getRandomHead(){
        let path="../../assets/img/heads/"
        let head=Math.ceil(Math.random()*10)
        let str = path + head + ".png"
        console.log(str)
        return str
      }
  },
  created() {
    
  },
  methods: {

  }
}
</script>


<style scoped>
p {
  word-break:break-all; 
}
#memberlist {
  min-height: calc(100vh - 72px);
  background-image: url("../../assets/img/backgrounds/4.png");
  background-repeat:no-repeat;
  background-size: 22%;
  background-position:right bottom;
}

.box_text {
  font-size: 16px;
  line-height: 36px;
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
  width: 300px;
  background-color: rgba(194, 232, 228, 0.5);
  border-radius: 20px;
  transition: 0.8s;
  padding: 0px;
}
.box-card:hover {
  background-color: rgba(119, 171, 164, 0.5);
}

.member_box {
  width: 1300px;
  height: auto;
  padding: 10px;
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
  margin:4px;
}

@keyframes appear_effect{
  from{
    transform: translate(-50%,-25%);
  }
  to{}
}
</style>