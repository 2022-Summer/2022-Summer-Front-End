<template>
  <el-container id="search">
    <el-header id="head">
      项目名：{{project.name}}
    </el-header>
    <el-main id="main">
      <div>
        <el-menu id="menu" mode="horizontal"  active-text-color="#ffd04b">
          <el-menu-item @click="to1" index="1">设计原型</el-menu-item>
          <el-menu-item @click="to2" index="2">绘制图</el-menu-item>
            <el-menu-item @click="to3" index="3">编辑文档</el-menu-item>
        </el-menu>
      </div>
        <div id="infoTable" v-if="projectIndex===1">
        <el-button type="primary" @click="newPrototype" class="bottomButton" round>新建原型</el-button>
                <el-table :data="words" style="width: 100%">
          <el-table-column type="index"> </el-table-column>
          <el-table-column prop="title" label="名称"></el-table-column>
          <el-table-column prop="lastEditTime" label="最后编辑时间"></el-table-column>
          <el-table-column prop="id" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="Detail1(scope.row.id)">下载</el-button>
              <el-button type="danger" @click="Delete1(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div id="infoTable" v-if="projectIndex===2">
        <el-button type="primary" @click="newPicture" class="bottomButton" round>新建图</el-button>
          <el-table :data="words" style="width: 100%">
          <el-table-column type="index"> </el-table-column>
          <el-table-column prop="title" label="名称"></el-table-column>
          <el-table-column prop="lastEditTime" label="最后编辑时间"></el-table-column>
          <el-table-column prop="id" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="Detail2(scope.row.id)">下载</el-button>
              <el-button type="danger" @click="Delete2(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
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
        projectIndex:3,//不同值显示不同板块
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
      File1:[{
        id:1,
        title:'xx.txt',
        lastEditTime:''
      }],
      File2:[{
        id:1,
        title:'xx.txt',
        lastEditTime:''
      }]
        }
  },
  created(){
      this.$axios({
        method: 'get',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/project/file/',     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        params: {
          projectid: this.$store.state.projectid,
          type:0
        }
        })
        .then((res) => {
          switch (res.data.errno){
            case 0:
              this.File1=res.data.file;
              break;
          }
        })
        .catch(err => {
        console.log(err);         /* 若出现异常则在终端输出相关信息 */
      });
        this.$axios({
        method: 'get',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/project/file/',     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        params: {
          projectid: this.$store.state.projectid,
          type:1
        }
        })
        .then((res) => {
          switch (res.data.errno){
            case 0:
              this.File2=res.data.file;
              break;
          }
        })
        .catch(err => {
        console.log(err);         /* 若出现异常则在终端输出相关信息 */
      });
       this.$axios({
        method: 'get',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/project/doc/',     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        params: {
          projectid: this.$store.state.projectid,
        }
        })
        .then((res) => {
          switch (res.data.errno){
            case 0:
              this.words=res.data.word;
              break;
          }
        })
        .catch(err => {
        console.log(err);         /* 若出现异常则在终端输出相关信息 */
      });

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
    newPrototype(){/*新建原型*/
    this.$store.state.prototypeid=0;
    this.$router.push('/prototype');
    },
    newPicture(){/*新建图*/
    this.$store.state.chartid=0;
    this.$router.push('/chart');
    },
    newword: function(){
      this.$store.state.wordid=0;
      this.$router.push('/word');
    },
    wordDetail(val){/*查看id为val的文档详情*/
      this.$store.state.wordid=val;
      this.$router.push('/word');
    },
    wordDelete(val){/*删除id为val的文档*/
        this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/project/deword/',     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({      /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
            wordid:val
        })
        })
        .then((res) => {
          switch (res.data.errno) {
            case 0:
            this.$message.success("删除成功");
              break;
          }
        })
        .catch(err => {
        console.log(err);         /* 若出现异常则在终端输出相关信息 */
      });
       this.$axios({
        method: 'get',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/project/doc/',     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        params: {
          projectid: this.$store.state.projectid,
        }
        })
        .then((res) => {
          switch (res.data.errno){
            case 0:
              this.words=res.data.word;
              break;
          }
        })
        .catch(err => {
        console.log(err);         /* 若出现异常则在终端输出相关信息 */
      });
    },
  }
}
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>

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