import axios from '../utils/http'


//规格列表
export function specsList(params) {
  let res = axios.get('/specslist', {
    params: params
  })
  return res
}
//添加规格
export function addSpecs(data) {
  let res = axios.post('/specsadd', data)
  return res
}
//编辑规格
export function editSpecs(data) {
  let res = axios.post('/specsedit', data)
  return res
}

// 删除规格
export function delSpecs(id) {
  let res = axios.post('/specsdelete', {
    id: id
  })
  return res
}

// 规格总数
export function specsCount() {
  let res = axios.get('/specscount')
  return res
}
