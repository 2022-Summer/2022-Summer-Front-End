<template>
  <el-container id="container">
    <el-header id="head">
      团队名：{{team.name}}
      <el-button id="teamInfo" type="info" icon="el-icon-tickets" size="small" circle @click="teamDetail"></el-button>

      <el-dialog
        :visible.sync="teamInfoVisible"
        width="30%"
        :before-close="handleClose">
        <el-descriptions title="团队信息">
          <el-descriptions-item label="团队名">{{team.name}}</el-descriptions-item>
          <el-descriptions-item label="发起者">{{team.belong}}</el-descriptions-item>
          <el-descriptions-item label="现人数">{{team.memberNum}}</el-descriptions-item>
          <el-descriptions-item label="简介">{{team.intro}}</el-descriptions-item>
        </el-descriptions>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="teamInfoVisible = false">确 定</el-button>
        </span>
      </el-dialog>

    </el-header>
    <el-main id="mid">
      <div>
        <el-menu id="menu" mode="horizontal" active-text-color="#ffd04b">
          <el-menu-item @click="toMembers" index="1"><i class="el-icon-user-solid"></i>成员列表</el-menu-item>
          <el-menu-item @click="toProjects" index="2"><i class="el-icon-s-cooperation"></i>项目列表</el-menu-item>
          <el-menu-item @click="toRecycle" index="3"><i class="el-icon-delete-solid"></i>项目回收站</el-menu-item>
        </el-menu>
      </div>
      <div id="memberList" v-if="teamIndex === 1">
        <el-table :data="Members" style="width: 100%">
          <el-table-column type="index"> </el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="status" label="身份"></el-table-column>
          <el-table-column prop="id" label="操作">
            <template slot-scope="scope">
              <el-button type="info" @click="memberInfo(scope.$index)">查看成员信息</el-button>
              <el-button v-if="scope.row.status==='管理员'&&myStatus==='团队发起者'" type="warning" @click="delAdmin(scope.row.id)">移除管理员</el-button>
              <el-button v-if="scope.row.status==='管理员'&&myStatus==='团队发起者'" type="danger" @click="out(scope.row.id)">移出团队</el-button>
              <el-button v-if="scope.row.status==='普通成员'&&myStatus!=='普通成员'" type="primary" @click="addAdmin(scope.row.id)">设为管理员</el-button>
              <el-button v-if="scope.row.status==='普通成员'&&myStatus!=='普通成员'" type="danger" @click="out(scope.row.id)">移出团队</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="success" class="bottomButton" v-if="myStatus!=='普通成员'" @click="addMember">邀请新成员</el-button>
        <el-dialog
          title="请输入要邀请的用户邮箱"
          :visible.sync="inviteVisible"
          width="30%"
          :before-close="handleClose">
          <el-input v-model="input1"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="inviteSure">发送邀请</el-button>
          </span>
        </el-dialog>
        <el-button type="danger" class="bottomButton" @click="quitTeam">退出团队</el-button>

        <el-dialog
          :visible.sync="memberInfoVisible"
          width="30%"
          :before-close="handleClose">
          <el-descriptions title="成员信息">
            <el-descriptions-item label="姓名">{{Members[memberSelected].name}}</el-descriptions-item>
            <el-descriptions-item label="邮箱">{{Members[memberSelected].email}}</el-descriptions-item>
          </el-descriptions>
          <div>......</div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="memberInfoVisible = false">确 定</el-button>
          </span>
        </el-dialog>
        
      </div>

      <div id="projectList" v-if="teamIndex === 2">
        <el-table :data="Projects" style="width: 100%">
          <el-table-column type="index"> </el-table-column>
          <el-table-column prop="title" label="标题" width=300px></el-table-column>
          <el-table-column prop="leader" label="负责人" width=300px></el-table-column>
          <el-table-column prop="startTime" label="创立时间" width=300px></el-table-column>
          <el-table-column prop="id" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="projectDetail(scope.row.id)">查看详情</el-button>
              <el-button type="warning" @click="renameProject(scope.row.id)">重命名项目</el-button>
              <el-button type="danger" @click="removeProject(scope.row.id)">移入回收站</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="success" class="bottomButton" @click="addProject">新建项目</el-button>
        <el-dialog
          title="请输入项目新标题"
          :visible.sync="renameVisible"
          width="30%"
          :before-close="handleClose">
          <el-input v-model="input" placeholder="请输入项目新标题"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="renameSure">确 定</el-button>
          </span>
        </el-dialog>
      </div>

      <div id="recycleList" v-if="teamIndex === 3">
        <el-table :data="Recycle" style="width: 100%">
          <el-table-column type="index"> </el-table-column>
          <el-table-column prop="title" label="标题" width=300px></el-table-column>
          <el-table-column prop="leader" label="负责人" width=300px></el-table-column>
          <el-table-column prop="startTime" label="创立时间" width=300px></el-table-column>
          <el-table-column prop="id" label="操作">
            <template slot-scope="scope">
              <el-button type="success" @click="recoverProject(scope.row.id)">恢复项目</el-button>
              <el-button type="danger" @click="delProject(scope.row.id)">删除项目</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-main>
  </el-container>
</template>

<style>
#head {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

#mid {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

#teamInfo {
  margin-left: 10px;
}

#memberList,#projectList,#recycleList {
  margin-top: 20px;
}

.bottomButton {
  float: left;
  margin-top: 20px;
  margin-left: 20px;
}
</style>

<script>
export default {
  data() {
    return {
      myStatus: "团队发起者",//当前用户在当前团队的身份
      teamIndex: 1, //不同值显示不同板块
      memberInfoVisible:false,
      teamInfoVisible:false,
      renameVisible:false,
      inviteVisible:false,
      memberSelected:0,//选择要查看信息的成员所在行数
      projectRenamed:0,//选择要重命名的项目id
      input:"",
      input1:"",
      team:{
        "id":1,
        "name":"没头发",
        "belong":"zy1",
        "foundedTime":"2020.1.1",
        "memberNum":6,
        "intro":"这是一个团队"
      },
      Members:[//成员列表
        {
          "id":1,
          "name":"zy1",
          "email":"1@qq.com",
          "status":"团队发起者"
        },
        {
          "id":2,
          "name":"zy2",
          "email":"2@qq.com",
          "status":"管理员"
        },
        {
          "id":3,
          "name":"zy3",
          "email":"3@qq.com",
          "status":"普通成员"
        }
      ],
      Projects:[//项目列表
        {
          "id":1,
          "title":"学习生活交流论坛",
          "startTime":"2020.1.1",
          "leader":"zy1"
        },
        {
          "id":2,
          "title":"CTS",
          "startTime":"2020.1.1",
          "leader":"zy2"
        }
      ],
      Recycle:[//回收站项目列表
        {
          "id":2,
          "title":"回收站项目",
          "startTime":"2020.1.1",
          "leader":"zy2"
        }
      ]
    };
  },
  methods:{
    toMembers(){//跳转成员列表
      this.teamIndex=1;
    },
    toProjects(){//跳转项目列表
      this.teamIndex=2;
    },
    toRecycle(){//跳转项目回收站
      this.teamIndex=3;
    },

    teamDetail(){//显示团队信息（发起人、建立时间、人数、简介……）
      this.teamInfoVisible=true;
    },

    memberInfo(val){//显示成员详细信息
      this.memberSelected=val;
      this.memberInfoVisible=true;
    },
    addAdmin(val){//增加管理员

    },
    delAdmin(val){//删除管理员

    },
    out(val){//移出团队
      this.$confirm('确认将该成员移出本团队?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //交互，移出成员操作
          this.$message({
            type: 'success',
            message: '移出成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消移出'
          });          
        });
    },
    addMember(){//邀请新成员
      this.inviteVisible=true;
    },
    inviteSure(){//确认发出邀请。目标邮箱为{{this.input1}}
      //交互
      this.inviteVisible=false;
      this.$message.success("已发送邀请！")
      this.input1="";
    },
    quitTeam(){//退出团队
      this.$confirm('确认退出该团队?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //退出团队交互
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
          //返回个人主页
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });          
        });
    },

    projectDetail(val){//跳转项目详情页，val为项目id

    },
    renameProject(val){//打开重命名对话框
      this.projectRenamed=val;
      this.renameVisible=true;
    },
    renameSure(){//对话框中点击确定，确认重命名
      //交互，重命名的项目id为{{this.projectRenamed}}，新名字为{{this.input}}
      this.renameVisible=false;
      this.$message.success("重命名成功！");
      this.input="";
    },
    removeProject(val){//项目移入回收站

    },
    addProject(){//新建项目

    },

    recoverProject(val){//恢复项目

    },
    delProject(val){//彻底删除项目
      this.$confirm('此操作将彻底删除项目，无法恢复，是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //删除操作，交互
          
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
  }
};
</script>
