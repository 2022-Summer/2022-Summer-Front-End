<template>
  <div>
    <h1>sddddsds</h1>
<el-form :model="ruleForm" :rules="rules" class="demo-ruleForm">
    <el-form-item label="Email:" prop="buyerEmail" required>
        <el-input v-model="ruleForm.buyerEmail"></el-input>
    </el-form-item>
</el-form>
  </div>
</template>

<style scoped>
</style>
<script>
export default {
data () {
  var checkEmail = (rule, value, callback) => {
    const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
    if (!value) {
      return callback(new Error('邮箱不能为空'))
    }
    setTimeout(() => {
      if (mailReg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的邮箱格式'))
      }
    }, 100)
  }
return {
  ruleForm: {
    buyerEmail: ''
  },
  rules: {
    buyerEmail: [
      { validator: checkEmail, trigger: 'blur' }
    ]
  }
}
}
}
</script>