<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2022-02-24 17:56:55
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-12 17:40:31
-->
<template>
  <div class="dynamic">
    <div class="text">
      <van-field
        v-model="message"
        rows="5"
        label="内容"
        type="textarea"
        maxlength="50"
        placeholder="请输入内容"
        show-word-limit
      />
    </div>
    <div class="imgae">
      <van-uploader
        v-model="fileList"
        :after-read="afterRead"
        multiple
        :max-count="1"
      />
    </div>
    <div class="footer" style="width: 100%">
      <van-button round @click="btn(0)" type="default" style="width: 80px"
        >清空</van-button
      >
      <van-button round @click="btn(1)" type="primary" style="width: 80px"
        >发布</van-button
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { policy } from "../../api/file";
import { insertDynamic } from "../../api/dynamic";
export default {
  data() {
    return {
      message: "",
      fileList: [],
      video_url: "",
      client: null,
      file: null,
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
  },
  methods: {
    btn(e) {
      if (e) {
        /* console.log({ message: this.message, fileList: this.fileList }); */
        if (
          this.file == null ||
          this.file == "" ||
          this.file == undefined ||
          this.file == []
        ) {
          insertDynamic({
            dynamicContent: this.message,
            userName: localStorage.getItem("userName"),
            dynamicType: 2,
            dynamicPort: localStorage.getItem("userPort"),
            dynamicDianzan: 0,
            dynamicComment: 0,
          });
          this.$router.push({ path: "/homePage" });
          this.$toast("发布完成");
          this.message = "";
          this.fileList = [];
          return;
        }
        if (this.fileList[0].file.type == "image/jpeg") {
          this.uploadFile(this.file, "image/");
          insertDynamic({
            dynamicContent: this.message,
            userName: localStorage.getItem("userName"),
            dynamicUrl: `https://kwf-macro-oss.oss-cn-guangzhou.aliyuncs.com/%E6%AF%95%E8%AE%BE/image/${this.file.file.name}`,
            dynamicType: 1,
            dynamicPort: localStorage.getItem("userPort"),
            dynamicDianzan: 0,
            dynamicComment: 0,
          });

          this.$router.push({ path: "/homePage" });
          this.$toast("发布完成");
        } else if (this.fileList[0].file.type == "video/mp4") {
          this.uploadFile(this.file, "video/");
          insertDynamic({
            dynamicContent: this.message,
            userName: localStorage.getItem("userName"),
            dynamicUrl: `https://kwf-macro-oss.oss-cn-guangzhou.aliyuncs.com/%E6%AF%95%E8%AE%BE/video/${this.file.file.name}`,
            dynamicType: 0,
            dynamicPort: localStorage.getItem("userPort"),
            dynamicDianzan: 0,
            dynamicComment: 0,
          });

          this.$router.push({ path: "/homePage" });
          this.$toast("发布完成");
        } else {
          this.$toast("目前不支持上传改文件格式");
        }
      }
      this.message = "";
      this.fileList = [];
    },
    afterRead(file) {
      console.log(file.file);
      this.file = file;
    },
    async uploadFile(file, filePath) {
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
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dynamic {
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f7f8fa;
  padding: 15px 0px;
}
.imgae {
  width: 100%;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.footer {
  width: 100%;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
