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
          <el-button style="float:right;margin:5px;color:darksalmon;" type="text" @click="delProject(proj.id)">
            <b>删除</b>
          </el-button>
          <el-button style="float:right;margin:5px;color:darkgreen;" type="text" @click="recoverProject(proj.id)">
            <b>重命名</b>
          </el-button>
          <el-button style="float:right;margin:5px;" type="text" @click="recoverProject(proj.id)">
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
    <el-button class="el_btn1" @click="buildProject">
      新建项目
    </el-button>
  </div>
</div>
</template>

<script>
import qs from "qs";
export default{
  data(){
    return{
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
          "id":2,
          "title":"SUMMER2022",
          "startTime":"2022.8.1",
          "leader":"G34"
        }
      ],
    }
  },
  created(){
    
  },
  methods: {
    recoverProject(val){//恢复项目
      this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
        url: "/api/team/recycle/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        data: qs.stringify({
          /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          teamid: this.$store.state.teamid,
          projectid: val,
          op: 1,
        }),
      }).then((res) => {
        switch (res.data.errno) {
          case 0:
            this.$message.success("恢复成功");
            break;
        }
      });
      this.$axios({
        method: 'get',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/team/recycle/',     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        params: {
          teamid: this.$store.state.teamid
        }
      })
        .then((res) => {
          switch (res.data.errno) {
            case 0:
              this.Recycle = res.data.Recycle;
              break;
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
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
    delProject(val) {//彻底删除项目
      this.$confirm('此操作将彻底删除项目，无法恢复，是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //删除操作，交互
        this.$axios({
          method: "post" /* 指明请求方式，可以是 get 或 post */,
          url: "/api/team/recycle/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
          data: qs.stringify({
            /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
            teamid: this.$store.state.teamid,
            projectid: val,
            op: 2,
          }),
        }).then((res) => {
          switch (res.data.errno) {
            case 0:
              this.$message.success("删除成功");
              break;
          }
        });
        this.$axios({
          method: 'get',           /* 指明请求方式，可以是 get 或 post */
          url: '/api/team/recycle/',     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
          params: {
            teamid: this.$store.state.teamid
          }
        })
          .then((res) => {
            switch (res.data.errno) {
              case 0:
                this.Recycle = res.data.Recycle;
                break;
            }
          })
          .catch(err => {
            console.log(err);         /* 若出现异常则在终端输出相关信息 */
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    buildProject(){
      this.$router.push('/buildproject');
    }
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