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
var socket = null
export default {
  name: 'DesignTool',
  props: {
    axureid: {
      type: String,
      default: ''
    },
    axurecontent: {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      curUser: '',
      data: {},
      preContent: '',
      newContent: '',
      timer: null,
      refleshKey: false,
      content: '{"pens":[{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"atlassian.x","tags":[],"visible":true,"rect":{"x":87,"y":23,"width":100,"height":100,"center":{"x":137,"y":73},"ex":187,"ey":123},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"65d339cb","zRotate":0,"borderRadius":0,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":0,"paddingBottom":0,"paddingLeft":0,"paddingRight":0,"children":[],"type":0,"animateType":"","paddingLeftNum":0,"paddingRightNum":0,"paddingTopNum":0,"paddingBottomNum":0,"textRect":{"x":87,"y":98,"width":100,"height":25,"center":{"x":137,"y":110.5},"ex":187,"ey":123},"fullTextRect":{"x":87,"y":23,"width":100,"height":100,"center":{"x":137,"y":73},"ex":187,"ey":123},"iconRect":{"x":87,"y":23,"width":100,"height":75,"center":{"x":137,"y":60.5},"ex":187,"ey":98},"fullIconRect":{"x":87,"y":23,"width":100,"height":100,"center":{"x":137,"y":73},"ex":187,"ey":123},"fontColor":"#222222","fontFamily":"\\"Hiragino Sans GB\\", \\"Microsoft YaHei\\", \\"Helvetica Neue\\", Helvetica, Arial","fontSize":12,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","tmp":null,"whiteSpace":"","evs":{"x":550,"y":138}},{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"atlassian.x","tags":[],"visible":true,"rect":{"x":392,"y":23,"width":100,"height":100,"center":{"x":442,"y":73},"ex":492,"ey":123},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"aa8414a","zRotate":0,"borderRadius":0,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":0,"paddingBottom":0,"paddingLeft":0,"paddingRight":0,"children":[],"type":0,"animateType":"","paddingLeftNum":0,"paddingRightNum":0,"paddingTopNum":0,"paddingBottomNum":0,"textRect":{"x":392,"y":98,"width":100,"height":25,"center":{"x":442,"y":110.5},"ex":492,"ey":123},"fullTextRect":{"x":392,"y":23,"width":100,"height":100,"center":{"x":442,"y":73},"ex":492,"ey":123},"iconRect":{"x":392,"y":23,"width":100,"height":75,"center":{"x":442,"y":60.5},"ex":492,"ey":98},"fullIconRect":{"x":392,"y":23,"width":100,"height":100,"center":{"x":442,"y":73},"ex":492,"ey":123},"fontColor":"#222222","fontFamily":"\\"Hiragino Sans GB\\", \\"Microsoft YaHei\\", \\"Helvetica Neue\\", Helvetica, Arial","fontSize":12,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","tmp":null,"whiteSpace":"","evs":{"x":854,"y":157}}],"lineName":"curve","fromArrow":"","toArrow":"triangleSolid","scale":1,"locked":0,"x":0,"y":0,"websocket":"","mqttUrl":"","mqttOptions":{"clientId":"c719732"}}',
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
    };
  },
  beforeRouteLeave (to, from, next) {
    // 这里需要elementui的支持，如果使用其他界面组件自行替换即可
   // console.log('leaveDesignTool!')
    next()
  },
  mounted() {
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
     // console.log('mounted')
        window.topology.open(this.axurecontent)
    }
    this.settimer()
    this.curUser=localStorage.getItem('userID')
    this.init()
  },
  beforeDestroy() {
    if (this.timer !== null)
      clearInterval(this.timer)
    socket.close()
    this.timer=null;
  },
  watch: {
    axurecontent(newval){
      window.topology.open(newval)
    },
  },
  methods: {
    openSocket() {
      if(typeof(WebSocket) == 'undefined') {
        console.log('不支持Websocket')
      }
      else {
        console.log('支持Websocket')
        //var socketUrl = "http://43.138.86.76:9000/axure/"
        var socketUrl = "http://localhost:8000/project/viewaxure"
        socketUrl = socketUrl.replace("https", "ws").replace("http", "ws")
        console.log(socketUrl)
        if(socket!==null){
          console.log(socket)
          socket=null
        }
        try{
          socket = new WebSocket(socketUrl)
        } catch (e) {
          console.log('error:',e)
        }
         var self = this
        // 打开事件
        socket.onopen = function() {
          const msg = JSON.stringify({
            type: 'login',
            message: ''
          })
          if(socket.readyState===1){
            socket.send(msg)}
          // console.log("websocket打开")
          // socket.send("客户端消息: 用户" + this.userId + location.href + new Date())
          // socket.send('用户登录')
        }
        console.log('set onopen',socket)
      }
      socket.onmessage = function(msg){
        const msg2 = JSON.parse(msg.data)
        if(msg2.type==='message')
        {
          let rcv = JSON.parse(msg2.message)
          self.$emit('axureChange',rcv.content,rcv.axureID)
          if(rcv.axureID === self.axureid){
            window.topology.open(rcv.content)
            self.content=JSON.stringify(window.topology.pureData())
            self.preContent=self.content
          }
        }
      }
      // 关闭
      socket.close = function () {
        const msg = JSON.stringify({
          type: 'logout',
          message: ''
        })
        socket.send(msg)
        console.log("websocket断开")
      }
    },
    init() {
      this.openSocket()
    },
    settimer() {
      console.log('timer set')
      if(this.timer==null){
        this.timer = setInterval(this.settime, 200);
      }
    },
    settime(){
      //console.log(this.preContent)
      //console.log(window.topology.pureData().pens)
      this.newContent=JSON.stringify(window.topology.pureData())
      //console.log(this.preContent === this.newContent)
      if(this.preContent !== this.newContent && window.topology.pureData().pens.length > 0){
       // console.log('send')
        this.preContent=this.newContent
        let sendData = {content: this.newContent,fromUser: this.curUser,axureID: this.axureid}
        const msg = JSON.stringify({
          type: 'message',
          message: JSON.stringify(sendData)
        })
        //console.log(msg)
        if(socket.readyState===1) {
          socket.send(msg)
          this.preContent = this.newContent
          this.$emit('axureChange',this.newContent,this.axureid)
        }
      }
    },
    nani() {
    //  console.log('click!')
      this.$emit('fuck')
    },
    saveAxure() {
      let data = new FormData()
      data.append('mailbox',this.$store.state.mailbox)
      data.append('axurename',this.$store.state.axurename)
      data.append('axureID',this.$store.state.prototypeid)
      data.append('axureData',JSON.stringify(window.topology.data))
      let self = this
      this.$axios({
        method: 'post',
        url: '/project/axuresave/',
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
        //  console.log(window.topology.data)
            this.saveAxure()
          // 比如这里表示保存文件
          break;
        case 'saveAs' :
          console.log('fuck')
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