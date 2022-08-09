<template>
  <div style="position:relative;">
    <el-container>
      <el-header style="height:80px;line-height:normal;">
        <div style="margin-top:20px;float:left;">
          <el-button type="danger" icon="el-icon-back" @click="returnd">返回</el-button>
          <el-button type="primary" @click="saveword" style="float: right">保存</el-button>
        </div>
        <div style="margin-top:23px;margin-left:80px;float:left">
          <h1 style="display:inline;font-size:24px;">文档编辑</h1>
        </div>
      </el-header>
      <el-main style="padding:0;">
        <div style="border: 5px outset gray;line-height:0;">
          <div id="post">
            <el-card>
              <div>
                <div slot="header" id="postHead">
                  <el-input placeholder="请输入标题" v-model="title" clearable></el-input>
                </div>
              </div>
              <div style="border: 1px solid #ccc;">
                <Toolbar
                    style="border-bottom: 1px solid #ccc"
                    :editor="editor"
                    :defaultConfig="toolbarConfig"
                    :mode="mode"
                />
                <Editor
                    style="height: 700px; overflow-y: hidden;"
                    v-model="html"
                    :defaultConfig="editorConfig"
                    :mode="mode"
                    @onChange="onChange"
                    @onCreated="onCreated"
                />
              </div>
            </el-card>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style src="@wangeditor/editor/dist/css/style.css">
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
</style>
<script>
let socket = null
import qs from "qs";
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'

export default {
  components: {Editor, Toolbar},
  data() {
    return {
      title: "",
      textarea: "",
      editor: null,
      html: '',
      toolbarConfig: {},
      editorConfig: {placeholder: '请输入内容...'},
      mode: 'default', // or 'simple'
    };
  },
  created() {
    this.$axios({
      method: "get" /* 指明请求方式，可以是 get 或 post */,
      url: "/api/project/word/",
      params: {
        wordid: this.$store.state.wordid,
        projectid: this.$store.state.projectid,
      }
    }).then((res) => {
      switch (res.data.errno) {
        case 0:
          if (this.$store.state.wordid == 0) {
            this.$message.success("新建文档成功");
          } else {
            this.$message.success("打开文档成功");
          }
          this.$store.state.wordid = res.data.wordid;
          this.title = res.data.title;
          this.html = res.data.html;
          break;
      }
    });
  },
  mounted(){
      this.openSocket()
  },
  methods: {
      openSocket() {
      if(typeof(WebSocket) == 'undefined') {
        console.log('不支持Websocket')
      }
      else {
        var self = this
        console.log('支持Websocket')
        var socketUrl = "http://localhost:8000/word/" + this.$store.state.wordid
        socketUrl = socketUrl.replace("https", "ws").replace("http", "ws")//这个没看明白
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
        socket.onopen = function() {
          const msg = JSON.stringify({
            type: 'login',
            message: '',
            wordid:this.$store.state.wordid
          })
          socket.send(msg)
          console.log("websocket打开")
        }
        console.log('set onopen',socket)
      }
      socket.onmessage = function(msg){//用于监听服务器的数据
        const msg2 = JSON.parse(msg.data)
        console.log('接收数据')
        console.log(msg2.type==='message')
        if(msg2.type==='message' && msg2.wordid === this.$store.state.wordid)
        {
          console.log(JSON.parse(msg2.message))
          let rcv = JSON.parse(msg2.message)
            self.html = rcv.html
            self.title = rcv.title
        }
      }
      // 关闭
      socket.close = function () {
        const msg = JSON.stringify({
          type: 'logout',
          message: '',
          wordid:this.$store.state.wordid
        })
        socket.send(msg)
        console.log("websocket断开")
      }
    },
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    returnd: function () {
      this.$router.back();
    },
    saveword: function () {
      this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
        url: "/api/project/word/" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        data: qs.stringify({
          /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          wordid: this.$store.state.wordid,
          projectid: this.$store.state.projectid,
          title: this.title,
          html: this.html,
        }),
      }).then((res) => {
        switch (res.data.errno) {
          case 0:
            this.$message.success("保存成功");
            break;
        }
      });
    }
  },
  onChange(editor) {
      console.log("onChange", editor.getHtml()); // onChange 时获取编辑器最新内容
      let sendData = {html: editor.getHtml(),title:this.title,mailbox:this.$store.state.mailbox,wordid:this.$store.state.wordid}
      const msg = JSON.stringify({
        type: 'message',
        message: JSON.stringify(sendData)
      })
      //sendData.fromUser = this.curUser
      if(socket.readyState===1)
      socket.send(msg)
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },
}
</script>