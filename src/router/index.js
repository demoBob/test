import {createRouter,createWebHashHistory} from 'vue-router'

import Demo1 from '../views/demo1.vue'
import Demo2 from '../views/demo2.vue'

const routes = [
  {
    path:'/',
    name:'demo1',
    component:Demo1,
  },
  {
    path:'/demo2',
    name:'demo2',
    component:Demo2
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router