<template>
<div id="profile">
  <div class="form_box1">
    <img src="../../assets/img/characters/profile.png">
    <div class="head_div">
      <img src="../../assets/img/heads/1.png" style="width:120px;">
    </div>
    <p>昵称：{{}}</p>
    <p>名称：{{}}</p>
    <p>性别：{{}}</p>
    <p>简介：{{}}</p>
  </div>
  
  <div class="form_box2">
    <img src="../../assets/img/characters/editprofile.png">
    <el-form class="form" label-width="40px">
      <!--需要修改！！！！！！！！！！！-->
      <el-form-item label="昵称">
        <el-input class="infoInput" :placeholder="name" v-model="input1"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input class="infoInput" :placeholder="username" v-model="input2"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input class="infoInput" :placeholder="description" v-model="input4"
            type="textarea" rows="2"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select class="infoInput" :placeholder="sex" v-model="input7" style="float:left;">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
          <el-option label="秘密" value="秘密"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="密码">
        <el-input class="infoInput" :placeholder="password" type="password" v-model="input8"></el-input>
      </el-form-item>
     <el-form-item>
      <el-button class="el_btn1" @click="修改信息">
        修改信息
      </el-button>
    </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
export default{
  data() {
    return{
      
    }
  },
  methods: {
    
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