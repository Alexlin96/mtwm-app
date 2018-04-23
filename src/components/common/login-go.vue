<template>
  <mt-tab-container >
      <!-- 登录 -->
      <mt-tab-container-item >
        <mt-field label="电话号码" placeholder="请输入电话号码" v-model="login_phone"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="login_password" ></mt-field>


        <mt-button type="primary" size="large"  @click.native="login" >登录</mt-button>

      </mt-tab-container-item>
     </mt-tab-container>
</template>
<script>

import axios from "axios";
import router from "../../router";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      login_phone: "",
      login_password: ""
    };
  },
  methods: {
    login() {
      var phone = this.login_phone;
      var password = this.login_password;
      if (!phone) {
        // 用户名
        MessageBox({
          title: "登录失败",
          message: "请输入手机号",
          showCancelButton: true
        });
        return;
      } else if (!password) {
        // 密码
        MessageBox({
          title: "登录失败",
          message: "请输入密码",
          showCancelButton: true
        });
        return;
      } else {
        console.log("验证成功"); //在这里做请求数据判断     
          axios.post("/login", {
            phone,
            password
          }).then(res => {         
            if (res.data.islogin==1) {
               console.log("登录成功");
                router.push("/");
            }else{
               console.log("登录失败");
                MessageBox({
                title: "用户不存在或者密码错误",
                message: "请重新输入",
                showCancelButton: true
              });
                
            }
          });

      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>


