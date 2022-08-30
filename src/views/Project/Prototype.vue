<template>
  <div id="prototype">
    <el-dialog
        :visible.sync="info"
        width="30%"
        :before-close="handleClose">
      <div>
        <el-input v-model="inputname" placeholder="请输入原型名称"></el-input>
        <div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="newaxure">新建原型</el-button>
          </span>
    </el-dialog>
    <div class="invite_box">
      <!--需要v-if特殊判断没有邀请的情况，没有邀请也需要做样式-->
      <div v-if="File1.length==0">
        <p style="font-size:21px;weight:600;">暂无原型，赶紧去创建吧</p>
      </div>
      <div v-for="file in File1" :key="file.id" class="el_card">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span><b>设计原型</b></span>
            <el-button style="float:right;margin:5px;color:darksalmon;" type="text" @click="del(file.id)">
              <b>删除</b>
            </el-button>
            <el-button style="float:right;margin:5px;color:green;" type="text" @click="open(file.id,file.title)">
              <b>打开</b>
            </el-button>
            <el-button style="float:right;margin:5px;color:green;" type="text" v-if="preinfo" @click="showpre(file.id)">
              <b>预览地址</b>
            </el-button>
          </div>
          <div class="box_text">
            <p><b>文档名称：</b>{{ file.title }}</p>
            <p><b>编辑时间：</b>{{ file.lastEditTime }}</p>
          </div>
        </el-card>
      </div>
      <br>
      <el-button class="el_btn1" @click="buildProject">
        新建原型
      </el-button>
      <el-button class="el_btn1" v-if="preinfo" @click="closepreview">关闭预览</el-button>
      <el-button class="el_btn1" v-if="!preinfo" @click="openpreview">开启预览</el-button>
    </div>
    <el-dialog :visible.sync="preinfo2" width="30%" :before-close="handleClose">
      <div>
        <p>{{ this.preurl }}</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from "qs";

export default {
  data() {
    return {
      inputname: "",
      info: false,
      preurl: "",
      preinfo: false,
      preinfo2: false,
      File1: [
        {
          id: 1,
          title: 'xx.txt',
          lastEditTime: '2020.1.1'
        }
      ],
    }
  },
  created() {
    this.$axios({
      method: 'get',           /* 指明请求方式，可以是 get 或 post */
      url: '/api/project/view/',     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
      params: {
        projectid: this.$store.state.projectid,
      }
    })
        .then((res) => {
          switch (res.data.errno) {
            case 0:
              this.File1 = res.data.file;
              break;
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        });
    this.$axios({
      method: 'get',           /* 指明请求方式，可以是 get 或 post */
      url: '/api/project/previewstate/',     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
      params: {
        projectid: this.$store.state.projectid,
      }
    })
        .then((res) => {
          switch (res.data.errno) {
            case 0:
              this.preinfo = res.data.state;
              break;
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        });
  },
  methods: {
    del(val) {
      this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/project/deleteaxure/',     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({      /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          id: val
        })
      })
          .then((res) => {
            switch (res.data.errno) {
              case 0:
                this.$message.success("删除成功");
                break;
            }
          })
          .catch(err => {
            console.log(err);         /* 若出现异常则在终端输出相关信息 */
          });
    },
    open(val1, val2) {
      this.$store.state.prototypeid = val1;
      this.$store.state.axurename = val2;
      this.$router.push('/design');
    },
    buildProject() {
      this.info = true;
      this.$store.state.prototypeid = 0;
    },
    newaxure() {
      this.$store.state.axurename = this.inputname;
      this.$router.push('/design');
    },
    closepreview() {
      this.preinfo = false;
      this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/project/change/',     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({      /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          projectid: this.$store.state.projectid,
          op: 1
        })
      })
          .then((res) => {
            switch (res.data.errno) {
              case 0:
                this.$message.success("关闭预览成功");
                break;
            }
          })
          .catch(err => {
            console.log(err);         /* 若出现异常则在终端输出相关信息 */
          });
    },
    openpreview() {
      this.preinfo = true;
      this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/project/change/',     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({      /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          projectid: this.$store.state.projectid,
          op: 0
        })
      })
          .then((res) => {
            switch (res.data.errno) {
              case 0:
                this.$message.success("开启预览成功");
                break;
            }
          })
          .catch(err => {
            console.log(err);         /* 若出现异常则在终端输出相关信息 */
          });
    },
    showpre(val) {
      this.preurl = "http://120.46.200.79/preview?projectid=" + this.$store.state.projectid + "&axureid=" + val;
      this.preinfo2 = true;
    }
  }
}
</script>
<style scoped>
#prototype {
  min-height: calc(100vh - 72px);
  background-image: url("../../assets/img/backgrounds/3.png");
  background-repeat: no-repeat;
  background-size: 30%;
  background-position: right top;
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
  top: 50%;
  left: calc(50% + 120px);
  transform: translate(-50%, -50%);
  transition: 1.0s;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 12px 18px 0 rgba(0, 0, 0, 0.24), 0 16px 40px 0 rgba(0, 0, 0, 0.19);
  animation: appear_effect 1.5s;
}

.el_card {
  display: inline-block;
  margin: 20px;
}

.el_btn1 {
  width: 40%;
  font-size: 18px;
  color: white;
  background-color: #89C7BF;
  border-radius: 20px;
  border: 1px solid rgba(150, 169, 183, 0.413);
  padding: 10px;
  transition: 0.2s;
}

.el_btn1:hover {
  width: 48%;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.25), 0 8px 16px 0 rgba(0, 0, 0, 0.20);
}

.el_btn1:active {
  background-color: #dff6f4;
}

@keyframes appear_effect {
  from {
    transform: translate(-50%, -25%);
  }
  to {
  }
}
</style>