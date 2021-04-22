import { specsList,specsCount } from '../../request/specs'

export default {
    namespaced: true,
    state: {
        specsList: [],
        specsCount: 0
    },
    getters: {

    },
    mutations: {
        setSpecsList(state, list) {
            state.specsList = list
        },
        setSpecsCount(state, data) {
            state.specsCount = data
        }
    },
    actions: {
        getSpecsListAction({ commit }, params) {
            specsList(params).then(res => {
                commit('setSpecsList', res.list)
            })
            specsCount().then(res => {
                commit('setSpecsCount',res.list[0].total)
            })
        }
    }
}