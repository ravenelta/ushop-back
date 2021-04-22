import {cateList} from '../../request/cate'
export default {
    // 命名空间
    namespaced:true,
    state:{
        cateList:[]
    },
    getters:{

    },
    mutations:{
        setCateList(state,list){
            state.cateList = list
        }
    },
    actions:{
        getCateListAction({commit}){
            cateList().then(res=>{
                commit('setCateList',res.list)
            })
        }
    }
}