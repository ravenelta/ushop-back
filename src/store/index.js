import Vue from 'vue'
import Vuex from 'vuex'

// 导入子模块
import menu from './modules/menu'
import role from './modules/role'
import user from './modules/user'
import cate from './modules/cate'
import specs from './modules/specs'
import goods from './modules/goods'
import member from './modules/member'
import banner from './modules/banner'
import seckill from './modules/seckill'

// 注册
Vue.use(Vuex)

// 创建实例对象
let store = new Vuex.Store({
    state:{},
    getters:{},
    mutations:{},
    actions:{},
    modules:{
        menu,role,user,cate,specs,goods,member,banner,seckill
    }
})

// 导出
export default store