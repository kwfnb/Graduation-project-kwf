/*
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-04-06 00:41:28
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-06 11:24:28
 */
import request from "../util/axios"

export function updateUser(data) {
 return request({
        url:"/user/updateUser",
        method: 'post',
        data:data,
    })  
}

export function mailSend(data) {
 return request({
        url:"/mail/send",
        method: 'post',
        data:data,
    })  
}