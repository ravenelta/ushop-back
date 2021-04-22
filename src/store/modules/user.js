import { userList,userCount } from '../../request/user'

export default {
    namespaced: true,
    state: {
        userList: [],
        userCount: 0
    },
    getters: {

    },
    mutations: {
        setUserList(state, list) {
            state.userList = list
        },
        setUserCount(state, data) {
            state.userCount = data
        }
    },
    actions: {
        getUserListAction({ commit }, params) {
            userList(params).then(res => {
                commit('setUserList', res.list)
            })
            userCount().then(res => {
                commit('setUserCount',res.list[0].total)
            })
        }
    }
}