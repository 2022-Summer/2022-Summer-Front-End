<template>
  <el-container id="search">
    <el-main id="main">
      <div>
        <el-menu id="menu" mode="horizontal"  active-text-color="#ffd04b">
          <el-menu-item @click="to1" index="1">个人资料</el-menu-item>
          <el-menu-item @click="to2" index="2">我的团队</el-menu-item>
        </el-menu>
      </div>
      <div id="infoTable" v-if="mainIndex===1">
        <div>
          <el-form  label-width="80px">
          <h1></h1>
            <el-form-item label="头像">
            <img :src="headshot">
            </el-form-item>
            <el-form-item label="姓名">
              <el-input class="infoInput" :placeholder="name" v-model="input1"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
              <el-input class="infoInput" :placeholder="username" v-model="input2"></el-input>
            </el-form-item>
            <el-form-item label="简介">
              <el-input class="infoInput" :placeholder="description" v-model="input4"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select class="infoInput" :placeholder="sex" v-model="input7">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
                <el-option label="秘密" value="秘密"></el-option>
              </el-select>
            </el-form-item>
              <el-form-item label="密码">
              <el-input class="infoInput" :placeholder="password" v-model="input8"></el-input>
            </el-form-item>          
          </el-form>
          <el-button type="primary" id="editFinish" @click="save">保存个人资料</el-button>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import qs from "qs";
export default {
  name: "main",
  data() {
    return {
      input1:'',
      input2: '',
      input3: '',
      input4: '',
      input7: '',
      input8: '',
        mainIndex:1,//不同值显示不同板块
        name:'1',
        username:'2',
        description:'3',
        sex:'男',  
        password:'1',
        headshot:''
        }
  },
  created(){
      if(!islogin){
        this.$message.warning("请先登录");
      }
      else{
        this.$axios({
        method: 'get',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/user/info/'     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        })
        .then((res) => {
          switch (res.data.errno){
            case 0:
              this.name=res.data.name;
              this.username=res.data.username;
              this.description=res.data.description;
              this.sex=res.data.sex;
              this.password=res.data.password;
              this.headshot=res.data.headshot;
              break;
          }
        })
        .catch(err => {
        console.log(err);         /* 若出现异常则在终端输出相关信息 */
      });
      }
  }, 
  methods: {
        save: function(){
        this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/user/info/',     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({      /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
            name:this.input1,
            username:this.input2,
            description:this.input4,
            sex:this.input7,
            password:this.input8,
            headshot:this.headshot,
        })
        })
        .then((res) => {
          switch (res.data.errno) {
            case 0:
            this.name = this.input1,
            this.username = this.input2,
            this.description = this.input4,
            this.major = this.input5,
            this.grade = this.input6,
            this.sex = this.input7,
            this.password = this.input8,
            this.$message.success("保存成功");
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

<style scoped>
#search {
  font-family: 'Noto Serif SC', serif;
  margin-top: 20px;
}
#head {
  background-color: #d4e7d9;
  color: #333;
  text-align: center;
  line-height: 60px;
}
#main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
#tip,#latestTable,#courseTable,#exerTable,#lifeTable,#newTable{
  margin-top: 20px;
}
.tipText {
  margin-bottom: 20px;
}
</style>