/*
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-02-25 01:07:23
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-05 02:17:34
 */

import request from "../util/axios"

export function selectByMatch(data){
    return request({
        url:"/data/searchByMatch",
        method: 'post',
        data:data,
    })
}
