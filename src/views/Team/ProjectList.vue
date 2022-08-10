<template>
  <div id="projectlist">
    <div class="projectlist_box">
      <!--需要v-if特殊判断没有邀请的情况，没有邀请也需要做样式-->
      <div v-if="Projects.length==0">
        <p style="font-size:21px;weight:600;">当前团队还没有项目呢，赶快去创建吧</p>
      </div>
      <div v-for="proj in Projects" :key="proj.id" class="el_card">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span><b>团队项目</b></span>
            <el-button style="float:right;margin:5px;color:darksalmon;" type="text" @click="removeProject(proj.id)">
              <b>删除</b>
            </el-button>
            <el-button style="float:right;margin:5px;color:darkgreen;" type="text" @click="renameProject(proj.id)">
              <b>重命名</b>
            </el-button>
            <el-button style="float:right;margin:5px;color:darkorange" type="text" @click="copyProject(proj.id)">
              <b>复制</b>
            </el-button>
            <el-button style="float:right;margin:5px;" type="text" @click="projectDetail(proj.id)">
              <b>进入</b>
            </el-button>
          </div>
          <div class="box_text">
            <p><b>项目名：</b>{{proj.title}}</p>
            <p><b>负责人：</b>{{proj.leader}}</p>
            <p><b>创立时间：</b>{{proj.startTime}}</p>
          </div>
        </el-card>
      </div>
      <el-button class="el_btn1" @click="addProject">
        新建项目
      </el-button>
    </div>
    <el-dialog title="请输入项目新标题" :visible.sync="renameVisible" width="30%" :before-close="handleClose">
      <el-input v-model="input" placeholder="请输入项目新标题"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="renameSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";
export default{
  data(){
    return{
      renameVisible:false,
      projectRenamed:0,
      input:'',
      Projects:[//项目列表
        {
          "id":1,
          "title":"学习生活交流论坛",
          "startTime":"2020.1.1",
          "leader":"zy1"
        },
        {
          "id":2,
          "title":"CTS",
          "startTime":"2020.1.1",
          "leader":"zy2"
        },
        {
          "id":3,
          "title":"SUMMER2022",
          "startTime":"2022.8.1",
          "leader":"G34"
        }
      ],
    }
  },
  created(){
    if (!this.$store.state.islogin) {
      this.$message.warning("请先登录");
      this.$router.push('/login');
    }
    else{
      this.$axios({
        method: 'get',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/team/project/',     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        params: {
          teamid: this.$store.state.teamid
        }
        })
        .then((res) => {
          switch (res.data.errno){
            case 0:
              this.Projects=res.data.projects;
              break;
          }
        })
        .catch(err => {
        console.log(err);         /* 若出现异常则在终端输出相关信息 */
      });
    }
  },
  methods: {
    projectDetail(val) {//跳转项目详情页，val为项目id
      this.$store.state.projectid = val;
      this.$router.push('/word');
    },
    renameProject(val) {//打开重命名对话框
      this.projectRenamed = val;
      this.renameVisible = true;
    },
    renameSure() {//对话框中点击确定，确认重命名
      //交互，重命名的项目id为{{this.projectRenamed}}，新名字为{{this.input}}
      this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
        url: "/api/project/rename/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        data: qs.stringify({
          /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          projectid: this.projectRenamed,
          newname: this.input,
        }),
      }).then((res) => {
        switch (res.data.errno) {
          case 0:
            this.$message.success("重命名成功");
            break;
        }
      });
      this.renameVisible = false;
      this.$message.success("重命名成功！");
      this.input = "";
    },
    removeProject(val) {//项目移入回收站
      this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
        url: "/api/team/recycle/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        data: qs.stringify({
          /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          teamid: this.$store.state.teamid,
          projectid: val,
          op: 0,
        }),
      }).then((res) => {
        switch (res.data.errno) {
          case 0:
            this.$message.success("移入成功");
            break;
        }
      });
      this.$axios({
        method: 'get',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/team/project/',     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        params: {
          teamid: this.$store.state.teamid
        }
      })
        .then((res) => {
          switch (res.data.errno) {
            case 0:
              this.Projects = res.data.projects;
              break;
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        });
    },
    copyProject(val){//复制项目
        this.$axios({
        method: 'post',
        url: '/api/project/copy/',
        data: qs.stringify({
            projectid:val,
        })
      })
      .then(res => {              /* res 是 response 的缩写 */
        switch (res.data.errno) {
          case 0:
            this.$message.success("复制成功");
            break;
        }
      })
      .catch(err => {
        console.log(err);         /* 若出现异常则在终端输出相关信息 */
      })
    },
    addProject() {//新建项目
      this.$router.push('/buildproject');
    },
  }
}
</script>


<style scoped>
#projectlist {
  min-height: calc(100vh - 72px);
  background-image: url("../../assets/img/backgrounds/2.png");
  background-repeat:no-repeat;
  background-size: 35%;
  background-position:left top;
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

.projectlist_box {
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
</style>>