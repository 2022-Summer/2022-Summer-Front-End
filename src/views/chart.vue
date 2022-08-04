<template>
  <el-container id="publish">
      <el-header>
          <h1>原型设计</h1>
      </el-header>
          <el-header>
        <div type="top">
        <span style="float:left">
            <el-button type="danger" icon="el-icon-back" @click="returnd">返回</el-button>
        </span>
        </div>
    </el-header>
  <el-main>


    
  </el-main>
  </el-container>
</template>

<script>
import qs from "qs";
export default {
        methods: {
        returnd: function () {
            this.$router.back();
        },
    },
}
</script>