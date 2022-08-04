<template>
  <div style="position:relative;">
    <el-container>
      <el-header style="height:80px;line-height:normal;">
        <div style="margin-top:20px;float:left;">
          <el-button type="danger" icon="el-icon-back" @click="returnd">返回</el-button>
        </div>
        <div style="margin-top:23px;margin-left:80px;float:left">
          <h1 style="display:inline;font-size:24px;">原型设计</h1>
        </div>
      </el-header>
      <el-main style="padding:0;">
        <div style="border: 5px outset gray;line-height:0;">
          <iframe src="http://120.46.200.79:808/" height="900px" width="100%" frameborder="0"></iframe>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  methods: {
    returnd: function () {
      this.$router.back();
    },
  },
}
</script>