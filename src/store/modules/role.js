import {roleList} from '../../request/role'
export default{
    namespaced:true,
    state:{
        roleList:[]
    },
    getters:{},
    mutations:{
        setRoleList(state,list){
            state.roleList = list
        }
    },
    actions:{
        getRoleListAction({commit}){
            roleList().then(res=>{
                commit('setRoleList',res.list)
            })
        }
    }
}