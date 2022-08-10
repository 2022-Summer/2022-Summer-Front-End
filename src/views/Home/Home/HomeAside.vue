<template>
  <div class="aside">
    <div style="padding:32px 0 0 0;">
      <el-button-group>
        <el-button type="primary" class="el_btn" icon="el-icon-back"
            @click="back"></el-button>
        <el-button type="primary" class="el_btn" icon="el-icon-refresh-right"
            @click="refresh"></el-button>
        <el-button type="primary" class="el_btn" icon="el-icon-right"
            @click="forward"></el-button>
      </el-button-group>
    </div>
    <div class="side_top" @click="backPage">
      <img src="../../assets/img/characters/mainpage.png" width="140px">
    </div>
    <el-menu background-color="#C2E8E4" text-color="#909399" active-text-color="#446D67"
        default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse">
      <el-menu-item v-for="item in menu" :key="item.name"
          :index="item.index" @click="clickMenu(item)">
          <i :class="'el-icon-' + item.icon"></i>
          <span slot="title">{{ item.label }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      menu: [
        {
          index: "1",
          name: "teamlist",
          label: "我的团队",
          icon: "user-solid",
        },
        {
          index: "2",
          name: "invitation",
          label: "团队邀请",
          icon: "s-promotion",
        },
        {
          index: "3",
          name: "profile",
          label: "个人资料",
          icon: "s-custom",
        },
        {
          index: "4",
          name: "buildteam",
          label: "新建团队",
          icon: "menu",
        }
      ],
    };
  },
  methods: {
    back(){
      this.$router.back()
    },
    refresh(){
      this.$router.go(0)
    },
    forward(){
      this.$router.forward()
    },
    backPage(){//后退一整个界面
      this.$router.push('/')
    },
    clickMenu(item) {
      this.$router.push(item.name);
    }
  }
};
</script>

<style scoped>
.aside{
  height: 100%;
  width: 100%;
    background-color: #C2E8E4;
}
.text_head {
  padding: 20px 0 20px 0;
  font-size:36px;
  font-weight:600;
  color: #4D5453;
}
.el_btn {
  font-size:24px;
  color:white;
  background-color: #7AA7A1;
  border-radius:20px;
  transition: 0.2s;
  border: 1px solid rgba(150, 169, 183, 0.413);
}
.el_btn:hover {
  box-shadow: 0 4px 6px 0 rgba(0,0,0,0.25),0 8px 16px 0 rgba(0,0,0,0.20);
}

.side_top{
  padding:40px 30px 0 0;
  transition: 0.4s;
}
.side_top:hover {
  padding:55px 0 0 0;
  cursor: pointer;
}

.el-menu {
  padding: 0;
  height: 100%;
  width: 100%;
}
.el-menu-item {
  float:left;
  outline: 1px;
  border-radius: 16px;
  margin-left: 28px;
  margin-top: 20px;
  width: 150px;
  transition: 0.5s;
  z-index: 1;
  text-align: left;
}
.el-menu-item:hover {
  backdrop-filter: blur(3px) !important;
  background-color: rgba(119, 171, 164, 0.6) !important;
  color: rgb(255, 255, 255);
  margin-top: 32px;
  margin-left: 52px;
  width: 170px;
  z-index: 1;
}
.el-menu-item:active {
  background-color: rgba(138, 220, 209, 0.4) !important;
  transition: 0.4s;
  color: rgb(255, 255, 255) !important;
  z-index: 1;
}
.el-menu-item:focus {
  background-color: rgba(91, 140, 133, 0.7) !important;
  transition: 0.4s;
  color: rgb(255, 255, 255) !important;
  z-index: 1;
}
.el-menu i{
  font-size: 28px;
  margin-right: 10px;
}
.el-menu span{
  font-size: 16px;
  font-weight: 600;
}
</style>