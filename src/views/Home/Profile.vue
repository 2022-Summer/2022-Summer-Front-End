<template>
<div id="profile">
  <div class="form_box1">
    <img src="../../assets/img/characters/profile.png">
    <div class="head_div">
      <img src="../../assets/img/heads/1.png" style="width:120px;">
    </div>
    <p>昵称：{{username}}</p>
    <p>名称：{{name}}</p>
    <p>性别：{{sex}}</p>
    <p>简介：{{description}}</p>
  </div>
  
  <div class="form_box2">
    <img src="../../assets/img/characters/editprofile.png">
    <el-form class="form" label-width="40px">
      <el-form-item label="昵称">
        <el-input class="infoInput" :placeholder="username" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input class="infoInput" :placeholder="name" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input class="infoInput" :placeholder="description" v-model="form.description"
            type="textarea" rows="2"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select class="infoInput" :placeholder="sex" v-model="form.sex" style="float:left;">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
          <el-option label="秘密" value="秘密"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="密码">
        <el-input class="infoInput" :placeholder="password" type="password" v-model="form.password"></el-input>
      </el-form-item>
     <el-form-item>
      <el-button class="el_btn1" @click="save">
        保存修改
      </el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
import qs from "qs";
export default{
  inject:['reload'],
  data() {
    return{
      form: {
        nikname:'',
        name:'',
        description:'',
        sex:'',
        password:''
      },
      username:'username',
      name:'name',
      description:'description',
      sex:'男',
      password:'password'
    }
  },
  created(){
    //console.log("profile页面创建")
    if (!this.$store.state.islogin) {
      this.$message.warning("From /profile: 请先登录");
      this.$router.push('/login');
    }
    else {
      this.$axios({
        method: 'get', 
        url: '/api/user/info/'
      })
      .then((res) => {
        switch (res.data.errno) {
          case 0:
            this.name = res.data.data.name;
            this.username = res.data.data.username;
            this.description = res.data.data.description;
            this.sex = res.data.data.sex;
            this.password = res.data.data.password;
            break;
        }
      })
      .catch(err => {
        console.log(err); 
      });
    }
  },
  methods: {
    save: function () {
      this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/user/info/',     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({      /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          name: this.form.name,
          username: this.form.username,
          description: this.form.description,
          sex: this.form.sex,
          password: this.form.password,
        })
      })
      .then((res) => {
        switch (res.data.errno) {
          case 0:
            this.name = this.form.name,
            this.username = this.form.username,
            this.description = this.form.description,
            this.sex = this.form.sex,
            this.password = this.form.password,
            this.$message.success("保存成功");
            break;
          default:
            this.$message.error("保存失败");
        }
      })
      .catch(err => {
        console.log(err);         /* 若出现异常则在终端输出相关信息 */
      });
      this.reload()
    },
  }
}
</script>

<style scoped>
#profile {
  min-height: calc(100vh - 72px);
  background-image: url("../../assets/img/backgrounds/1.png");
  background-repeat:no-repeat;
  background-size: 33%;
  background-position:right top;
}

.form_box1 {
  width: 18%;
  height: auto;
  padding: 10px 25px;
  margin: auto;
  border-radius: 40px;
  line-height: 50px;
  position: absolute;
  top: 50%;  left: calc(38% + 120px);  
	transform: translate(-50%,-50%);
  transition: 1.0s;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 12px 18px 0 rgba(0,0,0,0.24),0 16px 40px 0 rgba(0,0,0,0.19);
  animation: appear_effect 1.5s;
}
.form_box1:hover{
  width:20%;
  padding:20px 40px;
}
.form_box2 {
  width: 18%;
  height: auto;
  padding: 10px 25px;
  margin: auto;
  border-radius: 40px;
  line-height: 50px;
  position: absolute;
  top: 50%;  left: calc(62% + 120px);  
	transform: translate(-50%,-50%);
  transition: 1.0s;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 12px 18px 0 rgba(0,0,0,0.24),0 16px 40px 0 rgba(0,0,0,0.19);
  animation: appear_effect 1.5s;
}
.form_box2:hover{
  width:20%;
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