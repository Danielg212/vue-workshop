import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Welcome from '../components/Welcome.vue'
// import TodoList from '@/components/todo-list/todo-list.component.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Dashboard,
    children:[
      {
        path:'',
        props:{msg:"I am prop from the router 🦄"},
        component: Welcome
      },
      // {
      //   path:'todo',
      //   component:TodoList
      // }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode:'hash',
  routes
})

export default router