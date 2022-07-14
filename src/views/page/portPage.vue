<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-04-06 21:48:40
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-12 17:49:36
-->
<template>
  <van-sticky>
    <van-nav-bar
      title="头像信息"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  /></van-sticky>
  <div class="content">
    <van-image
      width="100%"
      height="250px"
      fit="contain"
      :src="portUrl"
    ></van-image>
    <van-uploader :after-read="afterRead" style="margin-top: 10px">
      <van-button icon="user-circle-o" type="primary">修改头像</van-button>
    </van-uploader>
  </div>
</template>

<script>
import { policy } from "../../api/file.js";
import { updateUser } from "../../api/mine.js";
import axios from "axios";
export default {
  data() {
    return {
      portUrl: "",
      url: "",
      client: {
        OSSAccessKeyId: "",
        policy: "",
        Signature: "",
        dir: "",
        host: "",
        expire: "",
        key: "",
      },
    };
  },
  mounted() {
    policy()
      .then((res) => {
        this.client = {
          OSSAccessKeyId: res.data.accessid,
          policy: res.data.policy,
          Signature: res.data.signature,
          dir: res.data.dir,
          host: res.data.host,
          expire: res.data.expire,
        };
      })
      .catch((e) => {
        console.log(e);
      });
    this.portUrl = localStorage.getItem("userPort");
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    afterRead(file) {
      this.url = `https://kwf-macro-oss.oss-cn-guangzhou.aliyuncs.com/%E6%AF%95%E8%AE%BE/portrait/${file.file.name}`;
      localStorage.setItem("userPort", this.url);
      this.uploadFile(file, "portrait/");
      updateUser({
        userId: localStorage.getItem("userId"),
        userPort: this.url,
      });
    },
    uploadFile(file, filePath) {
      let Files = new FormData();
      Files.append("key", `${this.client.dir}${filePath}` + "${filename}"); //key 唯一值  即相对路径
      Files.append("policy", this.client.policy); //服务器返回的policy
      Files.append("OSSAccessKeyId", this.client.OSSAccessKeyId); //服务器返回的accessId
      Files.append("success_action_status", "200"); //定义成功为200
      Files.append("signature", this.client.Signature); //服务器返回的signature
      Files.append("name", file.file.name); //文件名
      Files.append("file", file.file); //文件对象
      Files.append("callback", "http://localhost:10010/");
      console.log(Files);
      axios({
        url: this.client.host,
        method: "post",
        data: Files,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => {
        this.portUrl = this.url;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  min-width: 100%;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
