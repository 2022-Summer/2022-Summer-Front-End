<template>
<div>
      <el-upload
        ref="upload"
        style="display: inline"
        drag
        :headers="headers"
        action="http://localhost:8000/api/project/upload/"
        :on-preview="handlePreview"
        :http-request="handleUploadForm"
        :auto-upload="false"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple>
      <el-link icon="el-icon-paperclip" type="primary">添加需要上传的文件</el-link>
    </el-upload>
<div>
  <el-button
                  type="primary"
                  size="mini"
                  style="color: white"
                  @click="downloadfile(scope.$index, scope.row)"
                >
                  下载
   </el-button>
</div>
</div>
</template>
<script>
  export default {
 data() {
      return {
        download_url: 'http://localhost:8000/api/project/upload/',
        headers:{
          Authorization:localStorage.token
        },
        filelist:[
        ]
      };
    },
    created(){      
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      upload(){
        this.$refs.upload.submit();
      },
      handleUploadForm(param) {
      let thisInfo = this
      let formData = new FormData()
      // 在formData中加入我们需要的参数
      formData.append('file', param.file)
    	formData.append('projectid', this.$store.state.projectid)
      formData.append('email',this.$store.state.mailbox)
    // 向后端发送数据
      thisInfo.$axios.post('/api/project/upload/', formData).
        then(res => {              /* res 是 response 的缩写 */
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