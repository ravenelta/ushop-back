import {seckillList} from '../../request/seckill'
export default {
    // 命名空间
    namespaced:true,
    state:{
        seckillList:[]
    },
    getters:{

    },
    mutations:{
        setSeckillList(state,list){
            state.seckillList = list
        }
    },
    actions:{
        getSeckillListAction({commit}){
            seckillList().then(res=>{
                commit('setSeckillList',res.list)
            })
        }
    }
}