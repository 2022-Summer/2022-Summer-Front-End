<template>
 <div style="width: 70%;margin-left: 30px;margin-top: 30px;">
 <el-button class="filter-item" type="success" icon="el-icon-download" @click="downFile()">下载</el-button>
 </div>
</template>

<script>
 import axios from 'axios'

 export default {
 data() {
  return {
  }
 },
 mounted: function() {

 },
 methods: {
  downloadFile(url, options = {}){
  return new Promise((resolve, reject) => {
   axios({
   method: 'post',
   url: url, // 请求地址
   data: options, // 参数
   responseType: 'blob' // 表明返回服务器返回的数据类型
   }).then(
   response => {
    resolve(response.data)
    let blob = new Blob([response.data], {
    type: 'application/vnd.ms-excel'
    })
    let fileNameEncode = response.headers['content-disposition'].split("filename=")[1]
    let fileName = decodeURIComponent(fileNameEncode)
    if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, fileName)
    } else {
    var link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = fileName
    link.click()
    window.URL.revokeObjectURL(link.href)
    }
   },
   err => {
    reject(err)
   }
   )
  })
  },
  // 下载文件
  downFile(val){
  let postUrl= "http://localhost:8000/api/project/upload/"
  let params = {
   fileid: "1",
  }
  // console.log("下载参数",params)
  this.downloadFile(postUrl,params)
  },
 }
 }
</script>

<style>
</style>