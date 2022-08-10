<template>
  <div id="word">
    <div class="invite_box">
      <!--需要v-if特殊判断没有邀请的情况，没有邀请也需要做样式-->
      <div v-if="words.length==0">
        <p style="font-size:21px;weight:600;">暂无文档，赶紧去创建吧</p>
      </div>
      <div v-for="word in words" :key="word.id" class="el_card">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span><b>文字类文档</b></span>
            <el-button style="float:right;margin:5px;color:darksalmon;" type="text" @click="wordDelete(word.id)">
              <b>删除</b>
            </el-button>
            <el-button style="float:right;margin:5px;color:green;" type="text" @click="showdownloadword(word.id)">
              <b>下载</b>
            </el-button>
            <el-button style="float:right;margin:5px;" type="text" @click="wordDetail(word.id)">
              <b>查看</b>
            </el-button>
          </div>
          <div class="box_text">
            <p><b>文档名称：</b>{{word.title}}</p>
            <p><b>最后编辑：</b>{{word.lastEditor}}</p>
            <p><b>编辑时间：</b>{{word.lastEditTime}}</p>
          </div>
        </el-card>
      </div>
      <el-button class="el_btn1" @click="newWord">
        新建文档
      </el-button>
    </div>
    <el-dialog :visible.sync="info" width="30%" :before-close="handleClose"
        style="border-radius:20px;">
      <div style="border-radius:20px;">
        <el-radio-group v-model="filetype">
          <el-radio label="1">PDF</el-radio>
          <el-radio label="2">Markdown</el-radio>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="downloadword">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info:false,
      wordid:0,
      filetype:1,
      words: [
        {
          id: 1,
          title: "测试文档1",
          lastEditor: "zy1",
          lastEditTime: "2022.1.1"
        },
        {
          id: 2,
          title: "测试文档2",
          lastEditor: "zy3",
          lastEditTime: "2022.1.1"
        }
      ],
    }
  },
  created() {
    this.$axios({
      method: 'get',           /* 指明请求方式，可以是 get 或 post */
      url: '/api/project/doc/',     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
      params: {
        projectid: this.$store.state.projectid,
      }
    })
        .then((res) => {
          switch (res.data.errno) {
            case 0:
              this.words = res.data.word;
              break;
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        });
  },
  methods: {
    newWord: function () {
      this.$store.state.wordid = 0;
      this.$router.push('/wordpage');
    },
    showdownloadword(val){
        this.info = true;
        this.wordID = val;
    },
    downloadword:function(){
      let url = 'http://120.46.200.79:8080/api/project/downloadword/?wordid=' + this.wordid + '&type=' + this.filetype;
      this.$axios({
        method: 'get',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/project/downloadword/',     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        params: {
          wordid: this.wordid,
          filetype:this.filetype
        }
      })
      .then((res) => {
      switch (res.data.errno) {
              case 0:
                break;
            }
          })
          .catch(err => {
            console.log(err);         /* 若出现异常则在终端输出相关信息 */
          });
      window.open(url, '_blank');
    },
    wordDelete(val) {/*删除id为val的文档*/
      this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/project/deword/',     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({      /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          wordid: val
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
      this.$axios({
        method: 'get',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/project/doc/',     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        params: {
          projectid: this.$store.state.projectid,
        }
      })
          .then((res) => {
            switch (res.data.errno) {
              case 0:
                this.words = res.data.word;
                break;
            }
          })
          .catch(err => {
            console.log(err);         /* 若出现异常则在终端输出相关信息 */
          });
    },
    wordDetail(val) {/*查看id为val的文档详情*/
      this.$store.state.wordid = val;
      this.$router.push('/word');
    },
  }
}
</script>


<style scoped>
#word {
  min-height: calc(100vh - 72px);
  background-image: url("../../assets/img/backgrounds/2.png");
  background-repeat:no-repeat;
  background-size: 30%;
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
</style>