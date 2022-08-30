<template>
  <div>
    <div class="axure-leftnav">
      <el-menu
          mode="vertical"
          default-active="0"
          style="width: 30vh; height: 93vh"
      >
        <el-container>
          <el-aside width="30%">
            <el-tree :data="Prototypes" :expand-on-click-node="false">
                <span class="custom-tree-node" slot-scope="{ node, data }"
                      @click="show(data.axureid)">{{ node.label }}</span>
            </el-tree>
          </el-aside>
        </el-container>
      </el-menu>
    </div>
    <preview-view :content="curContent"></preview-view>
  </div>
</template>

<script>

import PreviewView from "@/views/design/PreviewView";
import qs from "qs";

export default {
  name: "PreviewListView",
  components: {
    PreviewView
  },
  props: {
    list: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      pid: 0,
      axureid: 0,
      axureList: this.list,
      Prototypes: [
        {
          axureid: 1,
          label: '原型1',
        },
        {
          axureid: 2,
          label: '原型2',
        },
        {
          axureid: 3,
          label: '原型3',
        },
      ],
      curContent: ''
    }
  },
  created() {
    let data = new FormData()
    this.pid = this.$route.query.projectid
    this.axureid = this.$route.query.axureid
    data.append('axureid', this.axureid)
    data.append('projectid', this.pid)
    this.$axios({
      method: 'post',
      url: '/api/project/preview/',
      data: data
    }).then(res => {
      if (res.data.errno === 0) {
        this.curContent = res.data.axureContent
      } else {
        this.$message.error("该项目未开启预览权限")
      }
    });
    this.$axios({
      method: 'post',           /* 指明请求方式，可以是 get 或 post */
      url: '/api/project/previewlist/',     /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */
      data: qs.stringify({      /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
        projectid: this.pid
      })
    })
        .then((res) => {
          switch (res.data.errno) {
            case 0:
              this.Prototypes = res.data.prototypes
              break;
          }
        })
        .catch(err => {
          console.log(err);         /* 若出现异常则在终端输出相关信息 */
        });
  },
  methods: {
    changeAxure(axureID, content) {
      this.curContent = content
    },
    show(val) {
      this.$router.push({path: 'preview', query: {projectid: this.pid, axureid: val}});
    }
  }
}
</script>

<style scoped>
.axure-leftnav {
  border-right: solid 1px #e6e6e6;
}

.el-menu-item {
  text-align: left;
}
</style>
