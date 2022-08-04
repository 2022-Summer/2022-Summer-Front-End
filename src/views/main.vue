<template>
  <el-container id="search">
    <el-main id="main">
      <div>
        <el-menu id="menu" mode="horizontal"  active-text-color="#ffd04b">
          <el-menu-item @click="to1" index="1">个人资料</el-menu-item>
          <el-menu-item @click="to2" index="2">我的团队</el-menu-item>
          <el-menu-item @click="to3" index="3">
          <el-badge :value="myInvitations.length" class="item">团队邀请</el-badge>
          </el-menu-item>
        </el-menu>
      </div>
      <div id="infoTable" v-if="mainIndex===1">
        <div>
          <el-form  label-width="80px">
          <h1></h1>
            <el-form-item label="姓名">
              <el-input class="infoInput" :placeholder="name" v-model="input1"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
              <el-input class="infoInput" :placeholder="username" v-model="input2"></el-input>
            </el-form-item>
            <el-form-item label="简介">
              <el-input class="infoInput" :placeholder="description" v-model="input4"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select class="infoInput" :placeholder="sex" v-model="input7">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
                <el-option label="秘密" value="秘密"></el-option>
              </el-select>
            </el-form-item>
              <el-form-item label="密码">
              <el-input class="infoInput" :placeholder="password" v-model="input8"></el-input>
            </el-form-item>          
          </el-form>
          <el-button type="primary" id="editFinish" @click="save">保存个人资料</el-button>
        </div>
      </div>
            <div id="myTeamTable" v-if="mainIndex===2">
        <el-table :data="myTeams" style="width: 100%">
          <el-table-column type="index"> </el-table-column>
          <el-table-column prop="name" label="团队名"></el-table-column>
          <el-table-column prop="belong" label="发起者"></el-table-column>
          <el-table-column prop="foundedTime" label="建立时间"></el-table-column>
          <el-table-column prop="teamid" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="intoTeam(scope.row.teamid)">进入团队</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="success" class="bottomButton" @click="buildTeam">建立团队</el-button>
      </div>
            <div id="inviteTable" v-if="mainIndex===3">
        <el-table :data="myInvitations" style="width: 100%">
          <el-table-column type="index"> </el-table-column>
          <el-table-column prop="teamName" label="团队名"></el-table-column>
          <el-table-column prop="invitor" label="邀请人"></el-table-column>
          <el-table-column prop="inviteTime" label="邀请时间"></el-table-column>
          <el-table-column prop="id" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="accept(scope.row.id)">进入团队</el-button>
              <el-button type="danger" @click="refuse(scope.row.id)">拒绝邀请</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import qs from "qs";
export default {
  name: "main",
  data() {
    return {
      input1:'',
      input2: '',
      input3: '',
      input4: '',
      input7: '',
        mainIndex:1,//不同值显示不同板块
        name:'1',
        username:'2',
        description:'3',
        sex:'男',  
        password:'1',
        invitations:2,//收到的邀请总数
        myTeams:[
        {
          "teamid":1,
          "name":"没头发",
          "belong":"zy1",
          "foundedTime":"2020.1.1",
        }
      ],
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
  created(){
      if(!this.$store.state.islogin){
        this.$message.warning("请先登录");
        this.$router.push('/login');
      }
      else{
        this.$axios({
        method: 'get',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/user/info/'     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        })
        .then((res) => {
          switch (res.data.errno){
            case 0:
              this.name=res.data.data.name;
              this.username=res.data.data.username;
              this.description=res.data.data.description;
              this.sex=res.data.data.sex;
              this.password=res.data.data.password;
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
          switch (res.data.errno){
            case 0:
              this.myInvitations=res.data.myInvitations;
              break;
          }
        })
        .catch(err => {
        console.log(err);         /* 若出现异常则在终端输出相关信息 */
      });
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
        console.log(err);         /* 若出现异常则在终端输出相关信息 */
      });
      }
  }, 
  methods: {
        save: function(){
        this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/user/info/',     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({      /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
            name:this.input1,
            username:this.input2,
            description:this.input4,
            sex:this.input7,
            password:this.input8,
        })
        })
        .then((res) => {
          switch (res.data.errno) {
            case 0:
            this.name = this.input1,
            this.username = this.input2,
            this.description = this.input4,
            this.sex = this.input7,
            this.password = this.input8,
            this.$message.success("保存成功");
              break;
          }
        })
        .catch(err => {
        console.log(err);         /* 若出现异常则在终端输出相关信息 */
      });
    },
        to1(){
      this.mainIndex=1;
    },
    to2(){
      this.mainIndex=2;
    },
     to3(){
      this.mainIndex=3;
    },
    intoTeam(val){//进入id为val的团队主页
      this.$store.state.teamid=val;
      this.$router.push('/team');
    },
    buildTeam(){
      this.$router.push('/BuildTeam');
    },
    accept(val){//当前用户加入主键为val的队伍，身份普通成员
        this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/user/invited/',     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({      /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
        id:val,
        op:0
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
          switch (res.data.errno){
            case 0:
              this.myInvitations=res.data.myInvitations;
              break;
          }
        })
        .catch(err => {
        console.log(err);         /* 若出现异常则在终端输出相关信息 */
      });
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
        console.log(err);         /* 若出现异常则在终端输出相关信息 */
      });
    },
    refuse(val){//直接删除主键为val的邀请即可
      this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/user/invited/',     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({      /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
        id:val,
        op:1
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
          switch (res.data.errno){
            case 0:
              this.myInvitations=res.data.myInvitations;
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
#head {
  background-color: #d4e7d9;
  color: #333;
  text-align: center;
  line-height: 60px;
}
#main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
#infoTable,#myTeamTable,#inviteTable{
  margin-top: 20px;
}
.bottomButton {
  float: left;
  margin-top: 20px;
  margin-left: 20px;
}
</style>