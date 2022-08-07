<template>
 <div style="width: 70%;margin-left: 30px;margin-top: 30px;">
 <el-button class="filter-item" type="success" icon="el-icon-download" @click="downloadFile(id)">下载</el-button>
 </div>
</template>

<script>
 import axios from 'axios'

 export default {
 data() {
  return {
    id:2,
  }
 },
 mounted: function() {

 },
 methods: {
  downloadFile(){
    this.$axios({
        method: 'get',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/project/download/',     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        params: {
          fileid: this.id
        }
        })
        .then((res) => {
          switch (res.data.errno){
            case 0:
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

<style>
</style>