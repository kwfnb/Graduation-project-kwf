/*
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-02-25 22:50:58
 * @LastEditors: kongwf
 * @LastEditTime: 2022-03-25 06:00:26
 */


import request from "../util/axios"

export function selectArticle(){
    return request({
        url:"/homePage/selectArticle",
        method: 'post',
    })
}

export function selectDynamic(data){
    return request({
        url:"/homePage/selectDynamic",
        method: 'post',
        data:data
    })
}

export function updateDianzan(params){
    return request({
        url:"/dynamic/updateDianzan",
        method: 'post',
        params:params,
    })
}

export function selectGive(data){
    return request({
        url:"/dynamic/selectGive",
        method: 'post',
        data:data,
    })
}

export function insertGive(data){
    return request({
        url:"/dynamic/insertGive",
        method: 'post',
        data:data,
    })
}