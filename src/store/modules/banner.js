import {bannerList} from '../../request/banner'
export default {
    // 命名空间
    namespaced:true,
    state:{
        bannerList:[]
    },
    getters:{

    },
    mutations:{
        setBannerList(state,list){
            state.bannerList = list
        }
    },
    actions:{
        getBannerListAction({commit}){
            bannerList().then(res=>{
                commit('setBannerList',res.list)
            })
        }
    }
}