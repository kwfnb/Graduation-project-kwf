/*
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-02-25 01:07:23
 * @LastEditors: kongwf
 * @LastEditTime: 2022-03-22 16:12:22
 */

import request from "../util/axios"

export function selectUserByName(data){
    return request({
        url:"/user/selectUserByName",
        method: 'post',
        data:data,
    })
}

export function insertUser(data){
    return request({
        url:"/user/insertUser",
        method: 'post',
        data:data,
    })
}

export function selectSystemMessage(params){
    return request({
        url:"/user/selectSystemMessage",
        method: 'post',
        params:params,
    })
}

export function insertSystemMessage(data){
    return request({
        url:"/user/insertSystemMessage",
        method: 'post',
        data:data,
    })
}

export function SMSverification(params){
    return request({
        url:"/user/SMSverification",
        method: 'post',
        params:params,
    })
}