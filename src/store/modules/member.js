import {memberList} from '../../request/member'
export default{
    namespaced:true,
    state:{
        memberList:[]
    },
    getters:{},
    mutations:{
        setMemberList(state,list){
            state.memberList = list
        }
    },
    actions:{
        getMemberListAction({commit}){
            memberList().then(res=>{
                commit('setMemberList',res.list)
            })
        }
    }
}