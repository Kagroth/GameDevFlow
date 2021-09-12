import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import("@/views/Home")
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/project/:projectName',
    name: 'ProjectView',
    component: () => import("@/views/Project"),
    children: [
      {
        path: 'design-board',
        name: 'DesignBoard',
        component: () => import("@/views/ProjectNestedViews/DesignBoard")
      },
      {
        path: 'dev-board',
        name: 'DevBoard',
        component: () => import("@/views/ProjectNestedViews/DevBoard")
      },
      {
        path: 'stats-board',
        name: 'StatsBoard',
        component: () => import("@/views/ProjectNestedViews/StatsBoard")
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
