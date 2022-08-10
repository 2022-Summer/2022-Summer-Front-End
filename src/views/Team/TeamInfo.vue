<template>
<div id="teaminfo">
  <div class="form_box1">
    <img src="../../assets/img/characters/teaminfo.png">
    <div class="head_div">
      <img src="../../assets/img/heads/9.png" style="width:120px;">
    </div>
    <p>团队名：{{}}</p>
    <p>发起者：{{}}</p>
    <p>人数：{{}}</p>
    <p>简介：{{}}</p>
  </div>
</div>
</template>


<style scoped>
#teaminfo {
  min-height: calc(100vh - 72px);
  background-image: url("../../assets/img/backgrounds/5.png");
  background-repeat:no-repeat;
  background-size: 20%;
  background-position:right bottom;
}

.form_box1 {
  width: 22%;
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
.form_box1:hover{
  width:25%;
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
</style>>