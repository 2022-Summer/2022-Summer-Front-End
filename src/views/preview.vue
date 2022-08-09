<template>
    <el-container>
        <el-aside width="30%">
            <el-tree :data="Prototypes" :expand-on-click-node="false">
                <span class="custom-tree-node" slot-scope="{ node, data }"
                    @click="show(data.url)">{{node.label}}</span>
            </el-tree>
        </el-aside>
        <el-main>
            <el-image style="" :src="URLshow"></el-image>
        </el-main>
    </el-container>
</template>

<style>
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }

</style>

<script>
export default {
    data(){
        return{
            URLshow:'https://img0.baidu.com/it/u=3261662076,707083065&fm=253&fmt=auto&app=138&f=JPEG?w=650&h=366',
            //默认图片链接，改样式的时候再换
            Prototypes:[
                {
                    proID:1,
                    label:'原型1',
                    url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
                },
                {
                    proID:2,
                    label:'原型2',
                    url:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
                },
                {
                    proID:3,
                    label:'原型3',
                    url:'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
                },
            ]
        }
    },
    methods:{
        show(val){
            this.URLshow=val;
        }
    }
}
</script>