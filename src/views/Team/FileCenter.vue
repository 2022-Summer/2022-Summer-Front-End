<template>
  <div id="filecenter">
    <h1>文件中心</h1>
    <el-tree :data="Files" :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span v-if="data.wordid > 0">
          <d>&nbsp;最后编辑人:{{ data.lastEditor }}</d>
          <d>&nbsp;最后编辑时间:{{ data.lastEditTime }}&nbsp;</d>
          <el-button type="text" @click="fileDetail(data.wordid)">
            查看详情
          </el-button>
          <el-button type="text" @click="fileDelete(data.wordid)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>


<style scoped>

#filecenter {
  min-height: calc(100vh - 72px);
  background-image: url("../../assets/img/backgrounds/8.png");
  background-repeat:no-repeat;
  background-size: 25%;
  background-position:right bottom;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 8px;
}
</style>

<script>
import qs from "qs";
export default {
  data(){
    return{
      Files: [
        {
          projectid: '1',
          label: '项目1',
          children: [
            {
              wordid: 1,
              label: '文档1',
              lastEditTime: '2002.1.1',
              lastEditor: 'k'
            },
            {
              wordid: 2,
              label: '文档2',
              lastEditTime: '2002.2.2',
              lastEditor: 'x'
            },
            {
              wordid: 3,
              label: '文档3',
              lastEditTime: '2002.3.3',
              lastEditor: 'k'
            },
          ]
        },
        {
          label: '项目2',
          children: [
            {
              wordid: 4,
              label: '文档1',
              lastEditTime: '2002.2.2',
              lastEditor: 'w'
            },
            {
              wordid: 5,
              label: '文档2',
              lastEditTime: '2002.2.2',
              lastEditor: 'w'
            },
          ]
        },
        {
          label: '项目3',
          children: [
          ]
        },
      ]
    }
  },
  created(){
    if (!this.$store.state.islogin) {
      this.$message.warning("请先登录");
      this.$router.push('/login');
    }
    else{
      this.$axios({
        method: 'get',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/team/wordcenter/',     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        params: {
          teamid: this.$store.state.teamid
        }
        })
        .then((res) => {
          switch (res.data.errno){
            case 0:
              this.Files=res.data.Files;
              break;
          }
        })
        .catch(err => {
        console.log(err);         /* 若出现异常则在终端输出相关信息 */
      });
    }
  },
  methods:{
    fileDetail(val) {
      this.$store.state.wordid = val;
      this.$router.push('/wordpage');
    },
    fileDelete(val) {
      this.$axios({
        method: 'post',           /* 指明请求方式，可以是 get 或 post */
        url: '/api/project/deword/',     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
        data: qs.stringify({      /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          wordid: val
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
    },
  }
}
</script>