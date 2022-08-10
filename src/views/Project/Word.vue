<template>
  <div id="word">
    <div class="invite_box">
      <!--需要v-if特殊判断没有邀请的情况，没有邀请也需要做样式-->
      <div v-if="words.length==0">
        <p style="font-size:21px;weight:600;">暂无文档，赶紧去创建吧</p>
      </div>
      <div v-for="word in words" :key="word.id" class="el_card">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span><b>文字类文档</b></span>
            <el-button style="float:right;margin:5px;color:darksalmon;" type="text">
              <b>删除</b>
            </el-button>
            <el-button style="float:right;margin:5px;color:green;" type="text">
              <b>下载</b>
            </el-button>
            <el-button style="float:right;margin:5px;" type="text">
              <b>查看</b>
            </el-button>
          </div>
          <div class="box_text">
            <p><b>文档名称：</b>{{word.title}}</p>
            <p><b>最后编辑：</b>{{word.lastEditor}}</p>
            <p><b>编辑时间：</b>{{word.lastEditTime}}</p>
          </div>
        </el-card>
      </div>
      <el-button class="el_btn1" @click="newWord">
        新建文档
      </el-button>
    </div>
<!--
    <el-dialog :visible.sync="wordInfoVisible" width="30%" :before-close="handleClose">
      <div>
        <el-radio-group v-model="filetype">
          <el-radio label="0">Word</el-radio>
          <el-radio label="1">PDF</el-radio>
          <el-radio label="2">Markdown</el-radio>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="downloadword">确 定</el-button>
      </span>
    </el-dialog>
-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      words: [
        {
          id: 1,
          title: "测试文档1",
          lastEditor: "zy1",
          lastEditTime: "2022.1.1"
        },
        {
          id: 2,
          title: "测试文档2",
          lastEditor: "zy3",
          lastEditTime: "2022.1.1"
        }
      ],
    }
  },
  created() {
    
  },
  methods: {
    newWord: function () {
      this.$store.state.wordid = 0;
      this.$router.push('/wordpage');
    },
  }
}
</script>


<style scoped>
#word {
  min-height: calc(100vh - 72px);
  background-image: url("../../assets/img/backgrounds/2.png");
  background-repeat:no-repeat;
  background-size: 30%;
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