<template>
  <el-container id="search">
    <el-header id="head">
      项目名：{{project.name}}
    </el-header>
    <el-main id="main">
      <div>
        <el-menu id="menu" mode="horizontal" active-text-color="#ffd04b">
          <el-menu-item @click="to1" index="1">原型设计</el-menu-item>
          <el-menu-item @click="to2" index="2">图绘制</el-menu-item>
          <el-menu-item @click="to3" index="3">文档编辑</el-menu-item>
        </el-menu>
      </div>
      <div id="infoTable" v-if="projectIndex===1">
        <el-table :data="File1" style="width: 100%">
          <el-table-column type="index"> </el-table-column>
          <el-table-column prop="title" label="名称"></el-table-column>
          <el-table-column prop="lastEditTime" label="最后编辑时间"></el-table-column>
          <el-table-column prop="id" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="Detail(scope.row.id)">下载</el-button>
              <el-button type="danger" @click="Delete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="newPrototype" class="bottomButton" round>新建原型</el-button>
        <el-button type="primary" class="bottomButton" round>上传原型</el-button>
        <el-button v-if="isPreviewed===false" type="primary" @click="openPreview" class="bottomButton" round>开启预览</el-button>
        <el-button v-if="isPreviewed===true" type="success" @click="toPreview" class="bottomButton" round>进入预览</el-button>
        <el-button v-if="isPreviewed===true" type="danger" @click="closePreview" class="bottomButton" round>关闭预览</el-button>
      </div>
      <div id="infoTable" v-if="projectIndex===2">
        <el-button type="primary" @click="newPicture" class="bottomButton" round>新建图</el-button>
      </div>
      <div id="wordTable" v-if="projectIndex===3">
        <el-table :data="words" style="width: 100%">
          <el-table-column type="index"> </el-table-column>
          <el-table-column prop="title" label="文档标题"></el-table-column>
          <el-table-column prop="lastEditor" label="最后编辑人"></el-table-column>
          <el-table-column prop="lastEditTime" label="最后编辑时间"></el-table-column>
          <el-table-column prop="id" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="wordDetail(scope.row.id)">查看文档</el-button>
              <el-button type="danger" @click="wordDelete(scope.row.id)">删除文档</el-button>
              <el-button type="success" @click="wordDownload(scope.row.id)">下载文档</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="newword" class="bottomButton" round>新建文档</el-button>
        <!--大抵还是要显示已经生成的文档吧，至于怎么做，还不知道-->
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
      projectIndex:1,//不同值显示不同板块
      isPreviewed:false,
      project:{
        id:"1",
        name:"test"
      },
      words:[
        {
          id:1,
          title:"测试文档1",
          lastEditor:"zy1",
          lastEditTime:"2022.1.1"
        },
        {
          id:2,
          title:"测试文档2",
          lastEditor:"zy3",
          lastEditTime:"2022.1.1"
        }
      ],
      File1: [{
        id: 1,
        title: 'xx.txt',
        lastEditTime: '2020.1.1'
      }],
    }
  },
  created(){
  }, 
  methods: {
    to1: function(){
      this.projectIndex=1;
    },
    to2: function(){
      this.projectIndex=2;
    },
    to3: function(){
      this.projectIndex=3;
    },
    newPrototype(){/*新建原型*/},
    newPicture(){/*新建图*/},
    newword: function(){
      this.$store.state.wordid=0;
      this.$router.push('/word');
    },
    wordDetail(val){/*查看id为val的文档详情*/},
    wordDelete(val){/*删除id为val的文档*/},
    wordDownload(val){/*下载id为val的文档*/},

    openPreview(){
      this.isPreviewed=true;
    },
    toPreview(){
      this.$router.push('/preview')
    },
    closePreview(){
      this.isPreviewed=false;
    }
  }
}
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>

<style scoped>
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
#wordTable{
  margin-top: 20px;
}
.bottomButton {
  float: left;
  margin-top: 20px;
  margin-left: 20px;
}
</style>