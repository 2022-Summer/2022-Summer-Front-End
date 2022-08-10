<template>
  <div class="design-tool" style="background: white;" @click="nani">
    <!-- 使用topology组件 -->
    <topology
        :configs="topologyConfigs"
        :materials="materials"
        :user="user"
        :data="data"
        @event="onEvent"
        :key="refleshKey"
    />
  </div>
</template>

<script>
import Vue from 'vue';
// 导入topology-vue组件
import topology from '@/assets/topology-vue';
// 需要导入topology-vue.css
import '@/assets/topology-vue/topology-vue.css';

Vue.use(topology);
import {
  defalutMenus,
  defalutUserMenus,
  defalutMaterials,
  images
} from './data';

export default {
  name: 'DesignTool',
  data: function () {
    return {
      refleshKey: false,
      content: null,
      topologyConfigs: {
        license: {
          key: 'le5le',
          value: 'le5le'
        },
        logo: {
          img: require('./墨书.png'),
          target: '_blank'
        },
        menus: defalutMenus,
        loginUrl: 'https://account.le5le.com',
        signupUrl: 'https://account.le5le.com',
        userMenus: defalutUserMenus,
        dataOptionsFn: (pen, key, value) => {
          console.log(pen, key, value);
          const keys = ['aaa', 'bbb'];
          const values = [
            {
              value: 111,
              label: '111'
            },
            {
              value: 222,
              label: '222'
            }
          ];
          return {
            keys,
            // value: 80,
            values
          };
        }
      },
      user: {
        username: ''
      },
      materials: {
        system: defalutMaterials,
        user: [],
        images,
        uploadUrl: '/api/file',
        uploadHeaders: {
          Authorization: 'your token'
        },
        uploadParams: {
          mydata: 1
        }
      },
      data: {}
    };
  },
  beforeRouteLeave (to, from, next) {
    // 这里需要elementui的支持，如果使用其他界面组件自行替换即可
    console.log('leaveDesignTool!')
    next()
  },
  deactivated() {
  },
  activated() {
    let data = new FormData()
    data.append('username',localStorage.getItem('username'))
    data.append('authorization',localStorage.getItem('authorization'))
    data.append('axureID',this.$route.params.axureID)
    let self = this
    this.$axios({
      method: 'post',
      url: '/ProjectManager/viewAxure/',
      data: data
    }).then(res => {
      if(res.data.error===0) {
        self.content = res.data.axureContent
        //console.log(res.data.axureContent)
        //console.log('content:',res.data.data.axureContent)
        //console.log(JSON.parse(res.data.axureContent))
        if(self.content)
          window.topology.open(res.data.axureContent)
      }
      else {
        self.$message.error(res.data.msg)
      }
    })
  },
  mounted() {
    let data = new FormData()
    data.append('mailbox',this.$store.state.mailbox)
    data.append('axureID',this.$store.state.prototypeid)
    let self = this
    this.$axios({
      method: 'post',
      url: '/project/viewaxure/',
      data: data
    }).then(res => {
      if(res.data.errno===0) {
        self.$store.state.prototypeid = res.data.axureID;
        self.content = res.data.axureContent
        //console.log(res.data.axureContent)
        //console.log('content:',res.data.data.axureContent)
        //console.log(JSON.parse(res.data.axureContent))
        if(self.content)
        window.topology.open(res.data.axureContent)
      }
      else {
        self.$message.error(res.data.msg)
      }
    })
    // 请确保 7777777(类似数字).js 和 rg.js已下载，正确加载
    if (window.registerTools) {
      window.registerTools();
      if (window.topologyTools) {
        this.materials.system[0].list = window.topologyTools;
      }
      //确保从预览页面返回是时清空存储
      const json = sessionStorage.getItem('topologyData');
      if (!this.$route.query.id && json) {
        this.data = JSON.parse(json);
        setTimeout(() => {
          // 读到后清除对应 session
          sessionStorage.removeItem('topologyData');
        }, 200);
      }
    }
  },
  methods: {
    nani() {
      console.log('?')
      this.$emit('?')
    },
    saveAxure() {
      let data = new FormData()
      data.append('mailbox',this.$store.state.mailbox)
      data.append('axureID',this.$store.state.prototypeid)
      data.append('axureData',JSON.stringify(window.topology.data))
      let self = this
      this.$axios({
        method: 'post',
        url: '/project/axureSave/',
        data: data
      }).then(res => {
        console.log(res)
        if(res.data.errno === 0) {
          self.$message.success("保存成功")
        }
        else {
          self.$message.error("保存失败")
        }
      })
    },
    onEvent(e) {
      switch (e.name) {
        case 'logout':
          // 退出登录
          this.user = null;
          // Do sth.
          break;

        case 'openMaterialGroup':
          // 展开/折叠图标工具栏分组
          console.log('openMaterialGroup', e.params);
          // Do sth.
          break;

        case 'addMaterial':
          // 添加“我的组件”
          // Do sth. For example:
          this.$router.push({
            path: '/',
            query: {component: '1'}
          });
          break;

        case 'editMaterial':
          // 编辑“我的组件”
          // Do sth. For example:
          this.$router.push({
            path: '/',
            query: {id: e.params.id, component: '1'}
          });
          break;

        case 'open':
          // 导航菜单configs.menus里面定义的action
          // 比如这里表示打开文件
          break;
        case 'Share':
          console.log('share')
              break;
        case 'save':
          // 导航菜单configs.menus里面定义的action
          console.log(window.topology.data)
            this.saveAxure()
          // window.topology.open(this.content)
          // 比如这里表示保存文件
          break;
        case 'saveAs' :
          //
          break
        case 'addImageUrl':
          // 在“我的图片”里面添加了一张新图片
          // this.addImageUrl(e.params);
          break;
        case 'deleteImage':
          // 在“我的图片”里面删除了一张图片
          // this.deleteImage(e.params);
          break;
        case 'preview':
          // 点击工具栏“预览”

          // 点击工具栏“预览”

          // 保存当前编辑数据到sessionStorage
          sessionStorage.setItem(
              'topologyData',
              JSON.stringify(window.topology.pureData())
          );
          this.$router.push({
            path: '/preview',
            query: {id: '114', r: '1'}
          });
          break;

          // ...
          // ...
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.design-tool {
  height: 95vh;
  width: 180vh;
}
</style>
