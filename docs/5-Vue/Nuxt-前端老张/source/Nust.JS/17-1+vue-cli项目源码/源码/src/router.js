import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home.vue';
import Course from '@/views/course/Course.vue';
import CourseInfo from '@/views/course/CourseInfo.vue'
import CoursePlay from '@/views/course/CoursePlay.vue'
import Member from '@/views/Member.vue';
import About from '@/views/about/About.vue';
import MyCourse from '@/views/about/components/MyCourse.vue';
import Collean from '@/views/about/components/Collean.vue';
import Order from '@/views/about/components/Order.vue';
import Message from '@/views/about/components/Message.vue';
import User from '@/views/user/User.vue';
import Setbindsns from '@/views/user/components/Setbindsns.vue';
import Setprofile from '@/views/user/components/Setprofile.vue';
import Setavator from '@/views/user/components/Setavator.vue';
import Cart from '@/views/cart/Cart.vue';
import ConfirmOrder from '@/views/cart/ConfirmOrder.vue';
import  Loading from '@/views/loading/index.vue'
import PaySuccess from '@/views/paySuccess/index.vue'
import PayFail from '@/views/payFail/index.vue'
import VipSuccess from '@/views/vipSuccess/index.vue'
import Agreement from '@/views/agreement/index.vue'

Vue.use(Router);

const routes = [
  { path: '/',component: Home},
  { path: '/home', component: Home ,name:'home'},
  { path: '/course', component: Course ,name:'course'},
  { path:'/course-info/:courseId',component:CourseInfo,name:'course-info'},
  {path: '/loading',component: Loading,name: 'loading'},
  { path:'/course-play/:courseId/:chapterId',component:CoursePlay,name:'course-play',meta:{ requiresAuth : false }},
  { path: '/member', component: Member ,name:'member'},
  { path:'*',component:Home},
  { path: '/agreement', component: Agreement ,name:'agreement'},
  {
    path: '/about', component: About, name: 'about',
    redirect: '/about/my-course',
    meta:{ requiresAuth : true },
    children: [
      {
        path: 'my-course',
        name: 'my-course',
        meta:{ requiresAuth : true },
        component: MyCourse,
      },
      {
        path: 'collean',
        name: 'collean',
        meta:{ requiresAuth : true },
        component: Collean,
      },
      {
        path: 'order',
        name: 'order',
        meta:{ requiresAuth : true },
        component: Order,
      },
      {
        path: 'message',
        name: 'message',
        meta:{ requiresAuth : true },
        component: Message,
      },
    ]
  },
  {
    path: '/user', component: User,
    redirect: '/user/setbindsns',
    meta:{ requiresAuth : true },
    name:'user',
    children: [
      {
        path: 'setbindsns',
        name:'setbindsns',
        meta:{ requiresAuth : true },
        component: Setbindsns,
      },
      {
        path: 'setprofile',
        name:'setprofile',
        meta:{ requiresAuth : true },
        component: Setprofile,
      },
      {
        path: 'setavator',
        name:'setavator',
        meta:{ requiresAuth : true },
        component: Setavator,
      }
    ]

  },
  {path: '/cart', component: Cart,name:'cart',meta:{ requiresAuth : true }},
  {path: '/confirmOrder', component: ConfirmOrder,name:'confirmOrder',meta:{ requiresAuth : true }},
  {path:'/paySuccess',component: PaySuccess,name:'paySuccess'},
  {path:'/payFail',component: PayFail,name:'payFail'},
  {path:'/vipSuccess',component: VipSuccess,name:'vipSuccess'},

];


const router = new Router({
  mode: "history",
  routes,
});



export default router;

