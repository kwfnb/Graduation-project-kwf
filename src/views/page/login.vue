<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2021-11-22 14:20:06
 * @LastEditors: kongwf
 * @LastEditTime: 2022-04-06 00:59:54
-->
<template>
  <div class="loginView">
    <transition name="startPage">
      <startPage class="startPage" v-if="show"></startPage>
    </transition>
    <div class="loginPage" inset>
      <div class="text">
        <div class="topText" style="font-size: 24px; margin-bottom: 20px">
          用户登录/注册
        </div>
        <div class="topText" style="font-size: 16px">
          发展<span class="point">体育事业和产业</span>
        </div>
        <div class="topText" style="font-size: 16px">
          是<span class="point">提高</span>中华民族<span class="point"
            >身体素质</span
          >和<span class="point">健康水平</span>的<span class="point"
            >必然要求</span
          >。
        </div>
        <div class="topText" style="text-align: right">——国务院</div>
      </div>
      <input
        type="text"
        class="loginUser"
        v-model="username"
        placeholder="请输入账号"
      />
      <input
        type="password"
        class="loginUser"
        v-model="password"
        placeholder="请输入密码"
        style="margin-top: 30px"
      />
      <div class="footer">
        <button class="loginStyle" @click="login()">登录</button>
        <span @click="register()" class="ljStyle">注册，我是新用户</span>
      </div>
    </div>
  </div>
</template>

<script>
import { createStore } from "../../store";
import { selectUserByName } from "../../api/login.js";
import startPage from "./startPage.vue";
export default {
  name: "login",
  data() {
    return {
      show: true,
      username: "",
      password: "",
    };
  },
  components: {
    startPage,
  },
  mounted() {
    /* Toast('欢迎来到体育云'); */
    /* setTimeout(()=>{
                this.show = !this.show;
            },3000) */
    if (this.$route.params && this.$route.params.name != "register")
      this.show = !this.show;
  },
  created() {},
  methods: {
    register() {
      this.$router.push({ path: "/register" });
    },
    login() {
      selectUserByName({ userName: this.username }).then((res) => {
        if (res.data.code === 0) {
          if (this.password == res.data.data.userPassword) {
            /* this.$store.commit(
              "isLoginUser",
              res.data.data.userName,
              res.data.data.userPort
            ); */
            /* createStore.getState(); */
            localStorage.setItem("userName", res.data.data.userName);
            localStorage.setItem("userPort", res.data.data.userPort);
            localStorage.setItem("userId", res.data.data.userId);
            localStorage.setItem("isLogin", 1);
            this.$router.push({
              path: "/homePage",
            });
          } else {
            this.$toast("密码错误");
          }
        } else {
          this.$toast("账号不存在");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.loginView {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url(../../assets/images/loginAndStart/loginImg.png);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 100%;
  .startPage {
    position: absolute;
    z-index: 10;
  }

  .loginPage {
    opacity: 100%;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    z-index: 1;

    .text {
      width: 80%;
      margin: 120px 0px 50px 0px;
      .topText {
        font-family: PingFangSC;
        font-weight: 400;
        color: #fff;
        .point {
          font-size: 22px;
          font-weight: 500;
          color: #fff;
        }
      }
    }

    .loginUser {
      background: none;
      outline: none;
      border: 1px solid #ccc;
      color: #fff;
      width: 80%;
      height: 40px;
      border-radius: 20px;
      background-color: rgba(185, 185, 185, 0.43);
      border-color: rgba(0, 0, 0, 0);
      line-height: 40px;
      text-align: center;
    }

    input::-webkit-input-placeholder {
      font-family: PingFangSC;
      font-weight: 400;
      font-size: 14px;
      color: #fff;
    }
    .loginStyle {
    }
    .ljStyle {
      text-decoration: underline;
      color: #fff;
    }
    .footer {
      margin-top: 10px;
      width: 80%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .loginStyle {
        width: 80px;
        height: 30px;
        border: none;
        background: none;
        color: #fff;
        background: #13b84b;
        border-radius: 20px;
      }
      .ljStyle {
      }
    }
  }
}

/* .startPage-enter{
        opacity: 0;
      }
      .startPage-enter-active{
        transition: opacity 3s;
      } */
.startPage-leave-to {
  opacity: 0;
}

.startPage-leave-active {
  transition: opacity 3s;
}
</style>
