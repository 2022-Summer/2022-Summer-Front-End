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
        multiple
        :file-list="fileList">
      <el-link icon="el-icon-paperclip" type="primary">添加需要上传的文件</el-link>
    </el-upload>
  <el-button type="primary" @click="upload">上传</el-button>
  <el-upload
  class="upload-demo"
  action="http://localhost:8000/api/project/upload/"
  :headers="headers"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :before-remove="beforeRemove"
  multiple>
  <el-button size="small" type="primary">点击上传</el-button>
</el-upload>
</div>
</template>
<script>
  export default {
 data() {
      return {
        headers:{
          Authorization:localStorage.token
        },
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
      then((res) => {
        if (res.status === 200) {
          thisInfo.$message.success('修改信息成功')
        } else {
          thisInfo.$message.success('修改信息失败')
        }
        thisInfo.formFileList = []
        thisInfo.uploadFormFileList = []
      })
    }
    }
  }
</script>