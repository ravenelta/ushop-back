import axios from '../utils/http'


//商品列表
export function goodsList(params) {
  let res = axios.get('/goodslist', {
    params: params
  })
  return res
}
//添加商品
export function addGoods(data) {
  let res = axios.post('/goodsadd', data)
  return res
}
//编辑商品
export function editGoods(data) {
  let res = axios.post('/goodsedit', data)
  return res
}

// 删除商品
export function delGoods(id) {
  let res = axios.post('/goodsdelete', {id: id})
  return res
}

// 商品总数
export function goodsCount() {
  let res = axios.get('/goodscount')
  return res
}
