<template>
  <div id="draw">
    <div class="invite_box">
      <!--需要v-if特殊判断没有邀请的情况，没有邀请也需要做样式-->
      <div v-if="File2.length==0">
        <p style="font-size:21px;weight:600;">暂无图，赶紧去创建/上传吧</p>
      </div>
      <div v-for="file in File2" :key="file.id" class="el_card">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span><b>图绘制</b></span>
            <el-button style="float:right;margin:5px;color:darksalmon;" type="text" @click="del(file.id)">
              <b>删除</b>
            </el-button>
            <el-button style="float:right;margin:5px;color:green;" type="text" @click="download(file.id)">
              <b>下载</b>
            </el-button>
          </div>
          <div class="box_text">
            <p><b>文档名称：</b>{{file.title}}</p>
            <p><b>编辑时间：</b>{{file.lastEditTime}}</p>
          </div>
        </el-card>
      </div>
      <br>
      <el-button class="el_btn1" @click="newPicture">
        新建图
      </el-button>

      <el-button class="el_btn1" @click="buildProject">
        上传图
      </el-button>
    </div>
          <el-dialog :visible.sync="info" width="30%" :before-close="handleClose">
        <div>
          <el-upload ref="upload" style="display: inline" drag :headers="headers"
            action="http://localhost:8080/api/project/upload/" :on-preview="handlePreview"
            :http-request="handleUploadForm" :auto-upload="false" :on-remove="handleRemove"
            :before-remove="beforeRemove" multiple>
            <el-link icon="el-icon-paperclip" type="primary">添加需要上传的文件</el-link>
          </el-upload>
          <div>
            <el-button type="primary" @click="upload()">上传</el-button>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="file2InfoVisible = false">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import qs from "qs";

export default {
  data() {
    return {
      info:false,
      File2: [
        {
        id: 2,
        title: 'xx.txt',
        lastEditTime: '2020.1.1'
        }
      ],
    }
  },
  created() {
      this.$axios({
      method: 'get',           /* 指明请求方式，可以是 get 或 post */
      url: '/api/project/file/',     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
      params: {
        projectid: this.$store.state.projectid,
        type: 1
      }
    })
    .then((res) => {
          switch (res.data.errno) {
            case 0:
              this.File2 = res.data.file;
              break;
          }
        })
      .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        });
  },
  methods: {
    newPicture() {/*新建图*/
      this.$store.state.chartid = 0;
      this.$router.push('/drawpage');
    },
    buildProject(){
        this.info = true;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    upload() {
      this.$refs.upload.submit();
    }, 
    del(val){
      this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/project/delete/',       /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({      /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          fileid: val
        })
      })
          .then(res => {              /* res 是 response 的缩写 */
            switch (res.data.errno) {
              case 0:
                this.$message.success("删除成功！");
                break;
            }
          })
          .catch(err => {
            console.log(err);         /* 若出现异常则在终端输出相关信息 */
          })
    },
    download(val){
      let url = 'http://localhost:8080/api/project/download/?fileid=' + val;
      this.$axios({
        method: 'get',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/project/download/',     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        params: {
          fileid: val
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
     handleUploadForm(param) {
      let thisInfo = this
      let formData = new FormData()
      // 在formData中加入我们需要的参数
      formData.append('file', param.file)
      formData.append('projectid', this.$store.state.projectid)
      formData.append('email', this.$store.state.mailbox)
      formData.append('type', 1)
      // 向后端发送数据
      thisInfo.$axios.post('/api/project/upload/', formData).then(res => {              /* res 是 response 的缩写 */
        switch (res.data.errno) {
          case 0:
            this.$message.success("上传成功!")
            break;
          case 11001:
            this.$message.error("上传失败!");
            break;
        }
      })
          .catch(err => {
            console.log(err);         /* 若出现异常则在终端输出相关信息 */
          })
      thisInfo.formFileList = []
      thisInfo.uploadFormFileList = []
    }
  }
}
</script>


<style scoped>
#draw {
  background-position:left top;
  min-height: calc(100vh - 72px);
  background-image: url("../../assets/img/backgrounds/8.png");
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

.el_btn1 {
  width: 40%;
  font-size:18px;
  color:white;
  background-color: #89C7BF;
  border-radius:20px;
  border: 1px solid rgba(150, 169, 183, 0.413);
  padding: 10px;
  transition: 0.2s;
}
.el_btn1:hover {
  width:48%;
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