import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui'
let Login = () => import('../pages/Login')
let Layout = () => import('../pages/Layout')
let Menu = () => import('../pages/Menu/Index')
let Home = () => import('../pages/Home/Index')
let Role = () => import('../pages/Role/Index')
let User = () => import('../pages/User/Index')
let Cate = () => import('../pages/Cate/Index')
let Specs = () => import('../pages/Specs/Index')
let Goods = () => import('../pages/Goods/Index')
let Member = () => import('../pages/Member/Index')
let Banner = () => import('../pages/Banner/Index')
let Seckill = () => import('../pages/Seckill/Index')

Vue.use(Router)
// 解决跳转到登录页报错问题，重复点击导航
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}


let router = new Router({
  routes: [{
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [{
          path: '/home',
          component: Home,
          meta: {
            title: '首页'
          }
        },
        {
          path: '/menu',
          component: Menu,
          meta: {
            title: '菜单'
          }
        },
        {
          path: '/role',
          component: Role,
          meta: {
            title: '角色'
          }
        },
        {
          path: '/user',
          component: User,
          meta: {
            title: '用户'
          }
        },
        {
          path: '/cate',
          component: Cate,
          meta: {
            title: '分类'
          }
        },
        {
          path: '/specs',
          component: Specs,
          meta: {
            title: '规格'
          }
        },
        {
          path: '/goods',
          component: Goods,
          meta: {
            title: '商品管理'
          }
        },
        {
          path: '/member',
          component: Member,
          meta: {
            title: '会员管理'
          }
        },
        {
          path: '/banner',
          component: Banner,
          meta: {
            title: '轮播图管理'
          }
        },
        {
          path: '/seckill',
          component: Seckill,
          meta: {
            title: '秒杀活动'
          }
        },
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})

//全局前置守卫
router.beforeEach((to, from, next) => {
  //判断localstroage里是否有缓存
  let userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  if(to.path !='/login'){
    if(!userInfo.token){
      return next('/login')
    }
  }
  // 判断是否有路由权限
  if(to.path!='/login' && to.path !='/home'){
    if(userInfo.menus_url.indexOf(to.path)== -1){
      //弹窗
      Message({
        message: '权限不足！',
        type: "error",
      })
      // 2.跳转到home页
      return next('/home')
    }
  }
  document.title = to.meta.title + '-小U商城'
  next()
})

export default router
