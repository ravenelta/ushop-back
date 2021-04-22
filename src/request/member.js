import axios from '../utils/http'
//角色列表
export function memberList() {
    let res = axios.get('/memberlist')
    return res
}


//编辑角色
export function editMember(data) { 
    let res = axios.post('/memberedit',data)
    return res
 }