import axios from '../utils/http'

// 分类列表
export function seckillList(){
    let res = axios.get('/seckilllist?istree=1')
    return res
}

// 添加分类
export function addSeckill(data){
    let res = axios.post('/seckilladd',data)
    return res
}

// 删除分类
export function delSeckill(id) {
    let res = axios.post('/seckilldelete',{id:id})
    return res
}

// 编辑分类
export function editSeckill(data) {
    let res = axios.post('/seckilledit',data)
    return res
}