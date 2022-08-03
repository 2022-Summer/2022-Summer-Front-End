import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: HomeView
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },{
    path: '/register',
    name: 'register',
    component: () => import('../views/register.vue')
  },
  {
    path: '/findback',
    name: 'findback',
    component: () => import( '../views/findback.vue')
  },{
    path: '/project',
    name: 'project',
    component: () => import( '../views/project.vue')
  },{
    path: '/word',
    name: 'word',
    component: () => import( '../views/word.vue')
  },{
    path: '/team',
    name: 'team',
    component: () => import( '../views/Team.vue')
  },{
    path: '/test',
    name: 'test',
    component: () => import( '../views/test.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
