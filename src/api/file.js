/*
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-03-14 10:43:18
 * @LastEditors: kongwf
 * @LastEditTime: 2022-03-16 05:36:40
 */
import request from "../util/axios"

export function policy(){
    return request({
        url:"/oss/policy",
        method: 'get',
    })
}
