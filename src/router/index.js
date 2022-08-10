import Vue from 'vue'
import VueRouter from 'vue-router'
import designTool from "@/components/InlineAxure/DesignTool";

Vue.use(VueRouter)

const routes = [
  {//欢迎界面
    path: '/',
    name: 'welcome',
    component: () => import('../views/Welcome.vue')
  },
  {//登录界面
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {//注册界面
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/preview',
    name: 'preview',
    component: () => import('../views/preview.vue')
  },
  {//主页面
    path: '/home',
    name: 'home',
    component: () => import('../views/Home/HomeView.vue'),
    children:[//除去上边栏和侧边栏的页面
      {//“我的团队”页面
        path: '/teamlist',
        name: 'teamlist',
        component: () => import('../views/Home/TeamList.vue')
      },
      {//“新建团队”页面
        path: '/buildteam',
        name: 'buildteam',
        component: () => import('../views/Home/BuildTeam.vue')
      },
      {//“组队邀请”页面
        path: '/invitation',
        name: 'invitation',
        component: () => import('../views/Home/Invitation.vue')
      },
      {//“个人信息”页面
        path: '/profile',
        name: 'profile',
        component: () => import('../views/Home/Profile.vue')
      }
    ]
  },
  {//团队界面
    path: '/team',
    name: 'team',
    component: () => import('../views/Team/TeamView.vue'),
    children:[
      {//“成员列表”页面
        path: '/memberlist',
        name: 'memberlist',
        component: () => import('../views/Team/MemberList.vue')
      },
      {//“项目列表”页面
        path: '/projectlist',
        name: 'projectlist',
        component: () => import('../views/Team/ProjectList.vue')
      },
      {//“文件中心”页面
        path: '/filecenter',
        name: 'filecenter',
        component: () => import('../views/Team/FileCenter.vue')
      },
      {//“项目回收站”页面
        path: '/recycle',
        name: 'recycle',
        component: () => import('../views/Team/Recycle.vue')
      },
      {//“团队信息”页面
        path: '/teamInfo',
        name: 'teaminfo',
        component: () => import('../views/Team/TeamInfo.vue')
      },
      {//“新建项目”页面
        path: '/buildproject',
        name: 'buildproject',
        component: () => import('../views/Team/BuildProject.vue')
      }
    ]
  },
  {//项目界面
    path: '/project',
    name: 'project',
    component: () => import('../views/Project/ProjectView.vue'),
    children:[
      {//“编辑文档”页面
        path: '/word',
        name: 'word',
        component: () => import('../views/Project/Word.vue')
      },
      {//“原型设计”页面
        path: '/prototype',
        name: 'prototype',
        component: () => import('../views/Project/Prototype.vue')
      },
      {//“图绘制”页面
        path: '/draw',
        name: 'draw',
        component: () => import('../views/Project/Draw.vue')
      },
      {//“编辑文档”编辑页面
        path: '/wordpage',
        name: 'wordpage',
        component: () => import('../views/Project/WordPage.vue')
      },
      {
        //"原型设计"编辑界面
        path: "/design",
        component: designTool,
      }, 
      {//“图绘制”编辑页面
        path: '/drawpage',
        name: 'drawpage',
        component: () => import('../views/Project/DrawPage.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
