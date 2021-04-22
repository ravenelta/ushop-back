import { goodsList,goodsCount } from '../../request/goods'

export default {
    namespaced: true,
    state: {
        goodsList: [],
        goodsCount: 0
    },
    getters: {

    },
    mutations: {
        setGoodsList(state, list) {
            state.goodsList = list
        },
        setGoodsCount(state, data) {
            state.goodsCount = data
        }
    },
    actions: {
        getGoodsListAction({ commit }, params) {
            goodsList(params).then(res => {
                commit('setGoodsList', res.list)
            })
            goodsCount().then(res => {
                commit('setGoodsCount',res.list[0].total)
            })
        }
    }
}