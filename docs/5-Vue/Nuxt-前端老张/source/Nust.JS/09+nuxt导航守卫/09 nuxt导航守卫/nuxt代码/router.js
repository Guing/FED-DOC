import Vue from "vue";
import VueRouter from "vue-router";

import Home from "~/pages/Home.vue";
import About from "~/pages/About.vue";
import News from "~/pages/News.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/news",
    name: "News",
    component: News,
    beforeEnter(to,from,next){
        next();
    }
  },
];

let router = new VueRouter({
    mode: 'history',
    routes
})

// router.beforeEach((to,from,next)=>{
//   if( to.name =='Home' ){
//     next('/news')
//   }else{
//     next();
//   }
// })

export function createRouter() {
  return router;
}