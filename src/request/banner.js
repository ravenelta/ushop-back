import axios from '../utils/http'

// 分类列表
export function bannerList(){
    let res = axios.get('/bannerlist')
    return res
}

// 添加分类
export function addBanner(data){
    let res = axios.post('/banneradd',data)
    return res
}

// 删除分类
export function delBanner(id) {
    let res = axios.post('/bannerdelete',{id:id})
    return res
}

// 编辑分类
export function editBanner(data) {
    let res = axios.post('/banneredit',data)
    return res
}