<template>
  <el-container id="publish">
      <el-header>
          <h1>文档编辑</h1>
      </el-header>
          <el-header>
        <div type="top">
        <span style="float:left">
            <el-button type="danger" icon="el-icon-back" @click="returnd">返回</el-button>
        </span>
        </div>
    </el-header>
    <el-main id="main">
        <div id="post">
          <el-card>
            <div>
    <div slot="header" id="postHead">  
                <el-input
  placeholder="请输入标题"
  v-model="title"
  clearable>
</el-input>
            </div>
      </div>
      <h1></h1>
          <div style="border: 1px solid #ccc;">
        <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editor"
            :defaultConfig="toolbarConfig"
            :mode="mode"
        />
        <Editor
            style="height: 500px; overflow-y: hidden;"
            v-model="html"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="onCreated"
        />
    </div>
        </el-card>
        </div>
    </el-main>
    <el-footer >
        <el-button type="primary" @click="saveword" style="float: right">保存</el-button>
    </el-footer>
  </el-container>
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
import qs from "qs";
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
export default {
    components: { Editor, Toolbar },
    data() {
        return {
            title: "",
            textarea: "",
            editor: null,
            html: '',
            toolbarConfig: { },
            editorConfig: { placeholder: '请输入内容...' },
            mode: 'default', // or 'simple'
        };
    },
    created() {
        this.$axios({
            method: "get" /* 指明请求方式，可以是 get 或 post */,
            url: "/api/project/word/",
            params: {
                wordid: this.$store.state.wordid,
                projectid:this.$store.state.projectid,
            }
        }).then((res) => {
            switch (res.data.errno) {
                case 0:
                    if(this.$store.state.wordid == 0){
                        this.$message.success("新建文档成功");
                    }
                    else{
                        this.$message.success("打开文档成功");
                    }
                    this.$store.state.wordid = res.data.wordid;
                    this.title = res.data.title;
                    this.html = res.data.html;
                    break;
            }
        });
        
    },
    methods: {
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
                    wordid:this.$store.state.wordid,
                    projectid:this.$store.state.projectid,
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
beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    },
}
</script>