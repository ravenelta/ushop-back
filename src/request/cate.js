import axios from '../utils/http'

// 分类列表
export function cateList(){
    let res = axios.get('/catelist?istree=1')
    return res
}

// 添加分类
export function addCate(data){
    let res = axios.post('/cateadd',data)
    return res
}

// 删除分类
export function delCate(id) {
    let res = axios.post('/catedelete',{id:id})
    return res
}

// 编辑分类
export function editCate(data) {
    let res = axios.post('/cateedit',data)
    return res
}