import { createRouter,createWebHashHistory } from 'vue-router'

import Editor from '../views/Editor.vue'
import TemplateDetail from '../views/TemplateDetail.vue'
const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path: '/',
            name: 'index',
            component: () => import('../views/Index.vue'),
            children: [
              {
                path: '',
                name: 'home',
                component: () => import('../views/Home.vue')
              },
              {
                path: 'template/:id',
                name: 'template',
                component: () => import('../views/TemplateDetail.vue')
              }
            ]
          },
        {
            path:'/editor',
            name:'editor',
            component:Editor
        }
    ]
})

export default router