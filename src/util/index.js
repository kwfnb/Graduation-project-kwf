/*
 * @Descripttion: 通用函数
 * @Author: kongwf
 * @Date: 2021-10-06 01:08:21
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-16 17:06:48
 */
import store from "../store";
import {selectUserByName,addUser,SMSverification} from "../api/login"

export const VUE_BASE_URL = "http://localhost:10010";

export function generationCode() {
      let code = document.getElementById("code");
	    // 验证码的组成
	    let moreCode = new Array(
				'1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
				'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
				'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
				'u', 'v', 'w', 'x', 'y', 'z',
				'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
				'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
				'U', 'V', 'W', 'X', 'Y', 'Z'
		);
	    let codes = '';// 重新初始化验证码
	    for (let i = 0; i < 6; i++) {
	        // 随机获取一个数组
	        let a = parseInt(Math.random() * moreCode.length);
	        codes += moreCode[a];
	    }
    return codes
}