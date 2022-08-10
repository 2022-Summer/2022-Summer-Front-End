<template>
<div id="recycle">
  <div class="recycle_box">
    <!--需要v-if特殊判断没有邀请的情况，没有邀请也需要做样式-->
    <div v-if="Recycle.length==0">
      <p style="font-size:21px;weight:600;">回收站还没有项目呢</p>
    </div>
    <div v-for="proj in Recycle" :key="proj.id" class="el_card">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span><b>回收站项目</b></span>
          <el-button style="float:right;margin:5px;color:darksalmon;" type="text" @click="delProject(proj.id)">
            <b>彻底删除</b>
          </el-button>
          <el-button style="float:right;margin:5px;" type="text" @click="recoverProject(proj.id)">
            <b>恢复项目</b>
          </el-button>
        </div>
        <div class="box_text">
          <p><b>项目名：</b>{{proj.title}}</p>
          <p><b>负责人：</b>{{proj.leader}}</p>
          <p><b>创立时间：</b>{{proj.startTime}}</p>
        </div>
      </el-card>
    </div>
  </div>
</div>
</template>

<script>
import qs from "qs";
export default{
  data(){
    return{
      Recycle:[//回收站项目列表
        {
          "id":2,
          "title":"回收站项目",
          "startTime":"2020.1.1",
          "leader":"zy2"
        }
      ]
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
    }
  },
  methods: {
    recoverProject(val) {//恢复项目
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
  }
}
</script>



<style scoped>
#recycle {
  min-height: calc(100vh - 72px);
  background-image: url("../../assets/img/backgrounds/7.png");
  background-repeat:no-repeat;
  background-size: 25%;
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

.recycle_box {
  width: 74%;
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
</style>>