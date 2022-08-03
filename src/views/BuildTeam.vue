<template>
  <div>
    <el-form  label-width="80px">
      <el-form-item label="团队名">
        <el-input class="infoInput" placeholder="请输入团队名" v-model="input1"></el-input>
      </el-form-item>
      <el-form-item label="发起者">
        <el-input class="infoInput" v-model="input2" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="团队简介">
        <el-input class="infoInput" type="textarea" autosize placeholder="这是一个团队。" v-model="input3"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" class="bottomButton" @click="build">建立团队</el-button>
    <el-button type="danger" class="bottomButton" @click="cancel">取消</el-button>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      input1:'',
      input2: this.$store.state.username,
      input3: '',
    }
  },
  created(){
  }, 
  methods: {
    build(){
      /*
      团队名：this.input1
      发起人：this.input2即this.$store.state.username
      团队简介：this.input3
      应该还要传一个当前日期
      */
    },
    cancel(){
      this.$router.push('/');
    },
  }
}
</script>

<style>
.bottomButton {
  float: left;
  margin-top: 20px;
  margin-left: 80px;
}
</style>