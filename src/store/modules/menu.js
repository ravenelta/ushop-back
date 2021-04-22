import {menuList} from '../../request/menu'
export default {
    // 命名空间
    namespaced:true,
    state:{
        menuList:[]
    },
    getters:{

    },
    mutations:{
        setMenuList(state,list){
            state.menuList = list
        }
    },
    actions:{
        getMenuListAction({commit}){
            menuList().then(res=>{
                commit('setMenuList',res.list)
            })
        }
    }
}