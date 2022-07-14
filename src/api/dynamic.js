/*
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-02-28 03:36:40
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-07 10:51:18
 */
import request from "../util/axios"

export function insertDynamic(data){
    return request({
        url:"/dynamic/insertDynamic",
        method: 'post',
        data:data,
    })
}

export function selectCommentById(params){
    return request({
        url:"/dynamic/selectCommentById",
        method: 'post',
        params:params,
    })
}

export function insertComment(data){
    return request({
        url:"/dynamic/insertComment",
        method: 'post',
        data:data,
    })
}

export function updateDynamicComment(params){
    return request({
        url:"/dynamic/updateDynamicComment",
        method: 'post',
        params:params,
    })
}

export function selectDynamicByName(params){
    return request({
        url:"dynamic/selectDynamicByName",
        method: 'post',
        params:params,
    })
}

export function deleteDynamic(params){
    return request({
        url:"/dynamic/deleteDynamic",
        method: 'post',
        params:params,
    })
}

export function insertReport(data){
    return request({
        url:"/dynamic/insertReport",
        method: 'post',
        data:data,
    })
}