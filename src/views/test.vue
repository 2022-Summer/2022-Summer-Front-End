<template>
<el-upload
  action="/api/upload/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :before-remove="beforeRemove"
  multiple
  :file-list="fileList">
  <el-button size="small" type="primary">点击上传</el-button>
</el-upload>
</template>
<script>
  export default {
    data() {
      return {
        fileList: [{
            name:'',
            url:''
        }
        ] };
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
      }
    }
  }
</script>