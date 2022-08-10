<template>
<div id="draw">
  <div class="invite_box">
    <!--需要v-if特殊判断没有邀请的情况，没有邀请也需要做样式-->
    <div v-if="File2.length==0">
      <p style="font-size:21px;weight:600;">暂无图，赶紧去创建/上传吧</p>
    </div>
    <div v-for="file in File2" :key="file.id" class="el_card">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span><b>设计原型</b></span>
          <el-button style="float:right;margin:5px;color:darksalmon;" type="text">
            <b>删除</b>
          </el-button>
          <el-button style="float:right;margin:5px;color:green;" type="text">
            <b>下载</b>
          </el-button>
        </div>
        <div class="box_text">
          <p><b>文档名称：</b>{{file.title}}</p>
          <p><b>编辑时间：</b>{{file.lastEditTime}}</p>
        </div>
      </el-card>
    </div>
    <br>
    <el-button class="el_btn1" @click="newPicture">
      新建图
    </el-button>
    <el-button class="el_btn1" @click="buildProject">
      上传图
    </el-button>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      File2: [
        {
        id: 2,
        title: 'xx.txt',
        lastEditTime: '2020.1.1'
        }
      ],
    }
  },
  created() {
    
  },
  methods: {
    newPicture() {/*新建图*/
      this.$store.state.chartid = 0;
      this.$router.push('/drawpage');
    },
  }
}
</script>


<style scoped>
#draw {
  background-position:left top;
  min-height: calc(100vh - 72px);
  background-image: url("../../assets/img/backgrounds/8.png");
  background-repeat:no-repeat;
  background-size: 25%;
  background-position:right bottom;
}

.box_text {
  font-size: 16px;
  line-height: 40px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.box-card {
  width: 320px;
  background-color: rgba(194, 232, 228, 0.5);
  border-radius: 20px;
  transition: 0.8s;
}
.box-card:hover {
  background-color: rgba(119, 171, 164, 0.5);
}

.invite_box {
  width: 1100px;
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
.el_card{
  display: inline-block;
  margin:20px;
}

.el_btn1 {
  width: 40%;
  font-size:18px;
  color:white;
  background-color: #89C7BF;
  border-radius:20px;
  border: 1px solid rgba(150, 169, 183, 0.413);
  padding: 10px;
  transition: 0.2s;
}
.el_btn1:hover {
  width:48%;
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