<template>
  <div id="memberlist">
    <div class="member_box">
      <!--需要v-if特殊判断没有邀请的情况，没有邀请也需要做样式-->
      <div v-if="Members.length == 0">
        <p style="font-size:21px;weight:600;">您还没有收到邀请，赶紧让队友邀请你吧</p>
      </div>
      <div v-for="mem in Members" :key="mem.email" class="el_card">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span><img src="../../assets/img/heads/1.png" width="80px;"
                style="border-radius: 10px;border: 4px solid gold;"></span>
            <el-button v-if="mem.status === '管理员' && myStatus === '发起人'" type="text" @click="out(mem.email)"
              style="float:right;margin:5px;color:red;"><b>移出</b></el-button>
            <el-button v-if="mem.status === '管理员' && myStatus === '发起人'" type="text" @click="delAdmin(mem.email)"
              style="float:right;margin:5px;color:red;"><b>降级</b></el-button>
            <el-button v-if="mem.status === '普通用户' && myStatus !== '普通用户'" type="text" @click="out(mem.email)"
              style="float:right;margin:5px;color:red;"><b>移出</b></el-button>
            <el-button v-if="mem.status === '普通用户' && myStatus !== '普通用户'" type="text" @click="addAdmin(mem.email)"
              style="float:right;margin:5px;color:green;"><b>提升</b></el-button>
          </div>
          <div class="box_text">
            <p><b>昵称：</b>{{ mem.username }}</p>
            <p><b>身份：</b>{{ mem.status }}</p>
            <p><b>姓名：</b>{{ mem.name }}</p>
            <p><b>邮箱：</b>{{ mem.email }}</p>
            <p><b>个人简介：</b>{{ mem.description }}</p>
          </div>
        </el-card>
      </div>
      <el-button class="el_btn1" @click="addMember">
        邀请成员
      </el-button>
      <el-button class="el_btn2" @click="quitTeam">
        退出
      </el-button>
    </div>
    <el-dialog title="请输入要邀请的用户邮箱" :visible.sync="inviteVisible" width="30%" :before-close="handleClose">
      <el-input v-model="input1"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="inviteSure">发送邀请</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";

export default {
  inject:['reload'],
  data() {
    return {
      myStatus: "发起人",
      inviteVisible:false,
      input1:'',
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
  created(){
    if (!this.$store.state.islogin) {
      this.$message.warning("请先登录");
      this.$router.push('/login');
    }
    else {
      this.$axios({
        method: 'get',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/team/member/',     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        params: {
          teamid: this.$store.state.teamid
        }
      })
        .then((res) => {
          switch (res.data.errno) {
            case 0:
              this.myStatus = res.data.MyStatus;
              this.Members = res.data.Members;
              break;
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        });
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
  methods: {
    addAdmin(val) {//增加管理员
      this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
        url: "/api/team/admin/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        data: qs.stringify({
          /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          teamid: this.$store.state.teamid,
          email: val,
          op: 0,
        }),
      }).then((res) => {
        switch (res.data.errno) {
          case 0:
            this.$message.success("设置成功");
            break;
        }
      });
      this.reload()
    },
    delAdmin(val) {//删除管理员
      this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
        url: "/api/team/admin/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        data: qs.stringify({
          /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          teamid: this.$store.state.teamid,
          email: val,
          op: 1,
        }),
      }).then((res) => {
        switch (res.data.errno) {
          case 0:
            this.$message.success("设置成功");
            break;
        }
      });
      this.reload()
    },
    out(val) {//移出团队
      this.$confirm('确认将该成员移出本团队?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //交互，移出成员操作
        this.$axios({
          method: "post" /* 指明请求方式，可以是 get 或 post */,
          url: "/api/team/invite/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
          data: qs.stringify({
            /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
            teamid: this.$store.state.teamid,
            email: val,
            op: 1
          }),
        }).then((res) => {
          switch (res.data.errno) {
            case 0:
              this.$message.success("已成功移出");
              break;
          }
        });
      })
      this.reload()
    },
    addMember() {//邀请新成员
      this.inviteVisible = true;
    },
    inviteSure() {//确认发出邀请。目标邮箱为{{this.input1}}
      //交互
      this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
        url: "/api/team/invite/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        data: qs.stringify({
          /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          teamid: this.$store.state.teamid,
          email: this.input1,
          op: 0
        }),
      }).then((res) => {
        switch (res.data.errno) {
          case 0:
            this.$message.success("已发送邀请");
            break;
          case 8001:
            this.$message.warning("该成员不存在");
            break;
          case 8002:
            this.$message.warning("该成员已在团队中");
            break;
        }
      });
      this.inviteVisible = false;
      this.input1 = "";
    },
    quitTeam() {//退出团队
      this.$confirm('确认退出该团队?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //退出团队交互
        this.$axios({
          method: "post" /* 指明请求方式，可以是 get 或 post */,
          url: "/api/team/invite/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
          data: qs.stringify({
            /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
            teamid: this.$store.state.teamid,
            email: this.$store.state.mailbox,
            op: 1
          }),
        }).then((res) => {
          switch (res.data.errno) {
            case 0:
              this.$message.success("退出成功");
              break;
            case 2003:
          }
        });
        //返回个人主页
        this.$router.push('/teamlist');
      })
    },
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
.el_btn2 {
  width: 86%;
  font-size:18px;
  color:white;
  background-color: #c79389;
  border-radius:20px;
  border: 1px solid rgba(150, 169, 183, 0.413);
  padding: 10px;
  transition: 0.2s;
}
.el_btn2:hover {
  width:94%;
  box-shadow: 0 4px 6px 0 rgba(0,0,0,0.25),0 8px 16px 0 rgba(0,0,0,0.20);
}
.el_btn2:active {
  background-color: #dff6f4;
}

@keyframes appear_effect{
  from{
    transform: translate(-50%,-25%);
  }
  to{}
}
</style>