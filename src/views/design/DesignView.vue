<template>
  <div style="display: flex">
    <div class="axure-leftnav">
      <el-menu
          mode="vertical"
          default-active="0"
          style="width: 30vh;height: 100vh"
      >
        <div v-for="(item,index1) in axureList" v-bind:key="index1+''">
          <el-menu-item :index="index1+''" @click="changeAxure(item.axureid,item.content)">
            <i class="el-icon-document"></i>
            {{ item.title }}
          </el-menu-item>
        </div>
        <el-menu-item index="newAxure" @click="newAxureDialogVisible = true"><i class="el-icon-plus"></i>新建页面</el-menu-item>
      </el-menu>
      <el-dialog title="新建页面" :visible.sync="newAxureDialogVisible">
        <el-input v-model="newAxureName" placeholder="页面名称"></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="newAxureDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="newAxure">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div style="width: auto">
      <DesignTool :axurecontent="curAxure" :axureid="curAxureID" @axureChange="handleAxureChange"></DesignTool>
    </div>
  </div>
</template>

<script>
import DesignTool from "@/components/InlineAxure/DesignTool";
export default {
  name: "DesignView",
  components: {
    DesignTool
  },
  props: {
    list: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  },
  data() {
    return {
      curAxure: '{"pens":[{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"atlassian.x","tags":[],"visible":true,"rect":{"x":87,"y":23,"width":100,"height":100,"center":{"x":137,"y":73},"ex":187,"ey":123},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"65d339cb","zRotate":0,"borderRadius":0,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":0,"paddingBottom":0,"paddingLeft":0,"paddingRight":0,"children":[],"type":0,"animateType":"","paddingLeftNum":0,"paddingRightNum":0,"paddingTopNum":0,"paddingBottomNum":0,"textRect":{"x":87,"y":98,"width":100,"height":25,"center":{"x":137,"y":110.5},"ex":187,"ey":123},"fullTextRect":{"x":87,"y":23,"width":100,"height":100,"center":{"x":137,"y":73},"ex":187,"ey":123},"iconRect":{"x":87,"y":23,"width":100,"height":75,"center":{"x":137,"y":60.5},"ex":187,"ey":98},"fullIconRect":{"x":87,"y":23,"width":100,"height":100,"center":{"x":137,"y":73},"ex":187,"ey":123},"fontColor":"#222222","fontFamily":"\\"Hiragino Sans GB\\", \\"Microsoft YaHei\\", \\"Helvetica Neue\\", Helvetica, Arial","fontSize":12,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","tmp":null,"whiteSpace":"","evs":{"x":550,"y":138}},{"imageRatio":true,"points":[],"manualAnchors":[],"animateDuration":0,"animateFrames":[],"animateFrame":0,"name":"atlassian.x","tags":[],"visible":true,"rect":{"x":392,"y":23,"width":100,"height":100,"center":{"x":442,"y":73},"ex":492,"ey":123},"fontStyle":"normal","fontWeight":"normal","textBackground":"","textDecoration":"","textDecorationDash":0,"textDecorationColor":"","events":[],"dash":0,"lineDashOffset":0,"lineWidth":1,"strokeStyle":"#222222","fillStyle":"","globalAlpha":1,"rotate":0,"offsetRotate":0,"textMaxLine":0,"textOffsetX":0,"textOffsetY":0,"animatePos":0,"id":"aa8414a","zRotate":0,"borderRadius":0,"imageAlign":"center","gradientAngle":0,"gradientRadius":0.01,"paddingTop":0,"paddingBottom":0,"paddingLeft":0,"paddingRight":0,"children":[],"type":0,"animateType":"","paddingLeftNum":0,"paddingRightNum":0,"paddingTopNum":0,"paddingBottomNum":0,"textRect":{"x":392,"y":98,"width":100,"height":25,"center":{"x":442,"y":110.5},"ex":492,"ey":123},"fullTextRect":{"x":392,"y":23,"width":100,"height":100,"center":{"x":442,"y":73},"ex":492,"ey":123},"iconRect":{"x":392,"y":23,"width":100,"height":75,"center":{"x":442,"y":60.5},"ex":492,"ey":98},"fullIconRect":{"x":392,"y":23,"width":100,"height":100,"center":{"x":442,"y":73},"ex":492,"ey":123},"fontColor":"#222222","fontFamily":"\\"Hiragino Sans GB\\", \\"Microsoft YaHei\\", \\"Helvetica Neue\\", Helvetica, Arial","fontSize":12,"lineHeight":1.5,"textAlign":"center","textBaseline":"middle","tmp":null,"whiteSpace":"","evs":{"x":854,"y":157}}],"lineName":"curve","fromArrow":"","toArrow":"triangleSolid","scale":1,"locked":0,"x":0,"y":0,"websocket":"","mqttUrl":"","mqttOptions":{"clientId":"c719732"}}',
      curAxureID: '1',
      axureList: this.list,
      newAxureName: '',
      newAxureWidth: {default: 0},
      newAxureHeight: {default: 0},
      newAxureDialogVisible: false,
    }
  },
  mounted() {
    let tmp =
      {
        "pens": [
          {
            "imageRatio": true,
            "points": [],
            "manualAnchors": [],
            "animateDuration": 0,
            "animateFrames": [],
            "animateFrame": 0,
            "name": "square",
            "tags": [],
            "visible": true,
            "rect": {
              "x": 100,
              "y": 100,
              "width": 640.0000000000001,
              "height": 480.00000000000006,
              "center": {
                "x": 340.00000000000006,
                "y": 260
              },
              "ex": 580.0000000000001,
              "ey": 420.00000000000006
            },
            "fontStyle": "normal",
            "fontWeight": "normal",
            "textBackground": "",
            "textDecoration": "",
            "textDecorationDash": 0,
            "textDecorationColor": "",
            "events": [],
            "dash": 0,
            "lineDashOffset": 0,
            "lineWidth": 0.40000000000000036,
            "strokeStyle": "#FFFFFFFF",
            "fillStyle": "#FFFFFFFF",
            "globalAlpha": 1,
            "rotate": 0,
            "offsetRotate": 0,
            "textMaxLine": 0,
            "textOffsetX": 0,
            "textOffsetY": 0,
            "animatePos": 0,
            "id": "400c6ac7",
            "zRotate": 0,
            "borderRadius": 0,
            "imageAlign": "center",
            "gradientAngle": 0,
            "gradientRadius": 0.01,
            "paddingTop": 4.000000000000003,
            "paddingBottom": 4.000000000000003,
            "paddingLeft": 4.000000000000003,
            "paddingRight": 4.000000000000003,
            "children": [],
            "text": "",
            "iconColor": "#2f54eb",
            "type": 0,
            "animateType": "",
            "paddingLeftNum": 4.000000000000003,
            "paddingRightNum": 4.000000000000003,
            "paddingTopNum": 4.000000000000003,
            "paddingBottomNum": 4.000000000000003,
            "textRect": {
              "x": 104,
              "y": 338.00000000000006,
              "width": 472.0000000000001,
              "height": 78.00000000000001,
              "center": {
                "x": 340.00000000000006,
                "y": 377.00000000000006
              },
              "ex": 576.0000000000001,
              "ey": 416.00000000000006
            },
            "fullTextRect": {
              "x": 104,
              "y": 104,
              "width": 472.0000000000001,
              "height": 312.00000000000006,
              "center": {
                "x": 340.00000000000006,
                "y": 260
              },
              "ex": 576.0000000000001,
              "ey": 416.00000000000006
            },
            "iconRect": {
              "x": 104,
              "y": 104,
              "width": 472.0000000000001,
              "height": 232.00000000000006,
              "center": {
                "x": 340.00000000000006,
                "y": 220.00000000000003
              },
              "ex": 576.0000000000001,
              "ey": 336.00000000000006
            },
            "fullIconRect": {
              "x": 104,
              "y": 104,
              "width": 472.0000000000001,
              "height": 312.00000000000006,
              "center": {
                "x": 340.00000000000006,
                "y": 260
              },
              "ex": 576.0000000000001,
              "ey": 416.00000000000006
            },
            "fontColor": "#222222",
            "fontFamily": "\"Hiragino Sans GB\", \"Microsoft YaHei\", \"Helvetica Neue\", Helvetica, Arial",
            "fontSize": 4.800000000000006,
            "lineHeight": 1.5,
            "textAlign": "center",
            "textBaseline": "middle",
            "whiteSpace": "",
            "evs": {
              "x": 862,
              "y": 271
            },
            "oldRect": {
              "x": 250.45555284288184,
              "y": 72.44444444444444,
              "width": 600.0000000000001,
              "height": 400.00000000000006,
              "center": {
                "x": 550.4555528428818,
                "y": 272.44444444444446
              },
              "ex": 850.455552842882,
              "ey": 472.4444444444445
            },
            "z": 0,
            "iconSize": 0,
            "locked": true
          }
        ],
        "lineName": "curve",
        "fromArrow": "",
        "toArrow": "triangleSolid",
        "scale": 0.4,
        "locked": 0,
        "x": 0,
        "y": 0,
        "websocket": "",
        "mqttUrl": "",
        "mqttOptions": {
          "clientId": "c719732"
        },
        "grid": true,
        "gridColor": "#00000033",
        "rule": true,
        "dbIndex": 60
      }
    tmp.pens[0].rect.width=1800*0.4
    tmp.pens[0].rect.height=1080*0.4
    window.topology.open(tmp)},
  methods: {
    handleAxureChange(content,axureID){
      //console.log('gotchange')
      let index = null
     // console.log(axureID)
      for(index=0; index<this.axureList.length; index++){
        if(this.axureList[index].axureid === axureID){
          //console.log('nani')
          this.axureList[index].content=content
         // console.log('axureID ',index,' ischange')
        }
      }
    },
    changeAxure(axureID,content){
      this.curAxure=content,
          this.curAxureID=axureID
    },
    newAxure() {
      this.newAxureDialogVisible = false;
    }
  }
}
</script>

<style scoped>
.axure-leftnav {
  border-right: solid 1px #e6e6e6;
}

.axure-butbar {
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
