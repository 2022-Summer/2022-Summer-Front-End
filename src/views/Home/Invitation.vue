<template>
<div id="invitation">
  <div class="invite_box">
    <!--需要v-if特殊判断没有邀请的情况，没有邀请也需要做样式-->
    <div v-if="myInvitations.length==0">
      <p style="font-size:21px;weight:600;">您还没有收到邀请，赶紧让队友邀请你吧</p>
    </div>
    <div v-for="inv in myInvitations" :key="inv.id" class="el_card">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span><b>邀请您加入团队</b></span>
          <el-button style="float:right;margin:5px;color:darksalmon;" type="text" @click="refuse(inv.id)">
            <b>拒绝</b>
          </el-button>
          <el-button style="float:right;margin:5px;" type="text" @click="accept(inv.id)">
            <b>同意</b>
          </el-button>
        </div>
        <div class="box_text">
          <p><b>邀请人：</b>{{inv.invitor}}</p>
          <p><b>团队名：</b>{{inv.teamName}}</p>
          <p><b>邀请时间：</b>{{inv.inviteTime}}</p>
        </div>
      </el-card>
    </div>
  </div>
</div>
</template>

<script>
import qs from "qs";

export default {
  data() {
    return {
      myInvitations:[
        {
          "id":1,//邀请id
          "teamID":3,//发出邀请的队伍id
          "teamName":"没头发",
          "invitor":"zy1",//发出邀请者
          "inviteTime":"2020.1.1"
        },
        {
          "id":2,
          "teamID":4,
          "teamName":"有头发",
          "invitor":"zy2",
          "inviteTime":"2020.1.1"
        }
      ]
    }
  },
  created() {
    console.log("invitation页面创建")
    if (!this.$store.state.islogin) {
      this.$message.warning("From /invitation: 请先登录");
      this.$router.push('/login');
    }
    else {
      this.$axios({
        method: 'get', 
        url: '/api/user/invited/' 
      })
      .then((res) => {
        switch (res.data.errno) {
          case 0:
            this.myInvitations = res.data.myInvitations;
            break;
        }
      })
      .catch(err => {
        this.$message.error("连接失败，获取邀请信息失败！")
        console.log(err);
      });
    }
  },
  methods: {
    accept(val){//当前用户加入主键为val的队伍，身份普通成员
      this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/user/invited/',     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({      /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          id: val,
          op: 0
        })
      })
      .then((res) => {
        switch (res.data.errno) {
          case 0:
            this.$message.success("加入成功");
            break;
        }
      })
      .catch(err => {
        console.log(err);         /* 若出现异常则在终端输出相关信息 */
      });
      this.$axios({
        method: 'get',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/user/invited/'     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
      })
      .then((res) => {
        switch (res.data.errno) {
          case 0:
            this.myInvitations = res.data.myInvitations;
            break;
        }
      })
      .catch(err => {
        console.log(err);         /* 若出现异常则在终端输出相关信息 */
      });
    },
    refuse(val){//直接删除主键为val的邀请即可
      this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/user/invited/',     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({      /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          id: val,
          op: 1
        })
      })
      .then((res) => {
        switch (res.data.errno) {
          case 0:
            this.$message.success("已拒绝邀请");
            break;
        }
      })
      .catch(err => {
        console.log(err);         /* 若出现异常则在终端输出相关信息 */
      });
      this.$axios({
        method: 'get',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/user/invited/'     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
      })
      .then((res) => {
        switch (res.data.errno) {
          case 0:
            this.myInvitations = res.data.myInvitations;
            break;
        }
      })
      .catch(err => {
        console.log(err);         /* 若出现异常则在终端输出相关信息 */
      });
    }
  }
}
</script>


<style scoped>
#invitation {
  min-height: calc(100vh - 72px);
  background-image: url("../../assets/img/backgrounds/5.png");
  background-repeat:no-repeat;
  background-size: 20%;
  background-position:right bottom;
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