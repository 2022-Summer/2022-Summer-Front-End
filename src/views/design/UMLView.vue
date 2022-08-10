<template>
  <div style="display: flex">
    <div class="UML-leftnav">
      <el-menu
          mode="vertical"
          default-active="0"
          style="width: 30vh"
      >
        <div v-for="(item,index1) in UMLList" v-bind:key="index1+''">
          <el-menu-item :index="index1+''" @click="changeUML(item.UMLid,item.content)">
            <i class="el-icon-document"></i>
            {{ item.title }}
          </el-menu-item>
        </div>
        <el-menu-item index="newUML"><i class="el-icon-plus"></i>新建页面</el-menu-item>
      </el-menu>
    </div>
    <div style="width: auto">
      <UMLTool :UMLcontent="curUML" :UMLid="curUMLID" @UMLChange="handleUMLChange"></UMLTool>
    </div>
  </div>
</template>

<script>
import UMLTool from "@/components/UMLDrawer/UMLTool";
export default {
  name: "DesignView",
  components: {
    UMLTool
  },
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      curUML: '',
      curUMLID: '1',
      UMLList: this.list
    }
  },
  methods: {
    handleUMLChange(content,UMLID){
      //console.log('gotchange')
      let index = null
      // console.log(UMLID)
      for(index=0; index<this.UMLList.length; index++){
        if(this.UMLList[index].UMLid === UMLID){
          //console.log('nani')
          this.UMLList[index].content=content
          // console.log('UMLID ',index,' ischange')
        }
      }
    },
    changeUML(UMLID,content){
      this.curUML=content,
          this.curUMLID=UMLID
    }
  }
}
</script>

<style scoped>
.UML-leftnav {
  border-right: solid 1px #e6e6e6;
}

.UML-butbar {
  display: flex;
}

.el-menu-item {
  text-align: left;
}

.baricon {
  width: 30px;
  height: 25px;
  text-align: center;
}
.baricon:hover {
  background-color: #ccc;
}
</style>
