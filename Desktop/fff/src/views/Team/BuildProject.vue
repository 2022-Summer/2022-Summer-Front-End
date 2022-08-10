<template>
<div id="buildteam">
  <div class="form_box2">
    <img src="../../assets/img/characters/buildproject.png">
    <el-form class="form_box" label-width="80px">
      <!--需要修改！！！！！！！！！！！-->
      <el-form-item label="项目名">
        <el-input class="infoInput" placeholder="请输入团队名" v-model="input1"></el-input>
      </el-form-item>
      <el-form-item label="创建者">
        <el-input class="infoInput" v-model="input2" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="项目简介">
        <el-input class="infoInput" placeholder="请输入团队简介" v-model="input3"
            type="textarea" rows="4"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="el_btn1" @click="build">
          创建项目
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
import qs from "qs";
export default{
  data(){
    return {
      input1:'',
      input2:this.$store.state.username,
      input3:''
    }
  },
  methods: {
    build(){
      /*
      团队名：this.input1
      发起人：this.input2即this.$store.state.username
      团队简介：this.input3
      应该还要传一个当前日期
      */
      this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
        url: "/api/project/new/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        data: qs.stringify({
          /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          teamid: this.$store.state.teamid,
          email: this.$store.state.mailbox,
          title: this.input1,
          Description: this.input3
        }),
      }).then((res) => {
        switch (res.data.errno) {
          case 0:
            this.$message.success("创建成功");
            break;
        }
      });
    },
  }
}
</script>

<style scoped>
#buildteam {
  min-height: calc(100vh - 72px);
  background-image: url("../../assets/img/backgrounds/6.png");
  background-repeat:no-repeat;
  background-size: 26%;
  background-position:right bottom;
}

.form_box2 {
  width: 36%;
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
.form_box2:hover{
  width:42%;
  padding:20px 40px;
}

.head_div{
  width:120px;
  height:120px;
  border:20px solid white;
  border-radius:120px;
  margin:0 auto;
}

.el_in{
  font-size: 16px;
}

.el_btn1 {
  width: 86%;
  font-size:18px;
  color:white;
  background-color: #89C7BF;
  border-radius:20px;
  border: 1px solid rgba(150, 169, 183, 0.413);
  padding: 10px;
  transition: 0.2s;
}
.el_btn1:hover {
  width:94%;
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