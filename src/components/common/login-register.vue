<template>
  <mt-tab-container >
      <!-- 注册 -->
      <mt-tab-container-item>
        <mt-field label="用户名" placeholder="请输入用户名" v-model='register_username' @blur.native.capture="Verification('用户名')"></mt-field>

        <mt-field label="手机号" placeholder="请输入手机号"  v-model='register_phone'
        @blur.native.capture="Verification('手机号')"></mt-field>
        <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model='register_email' @blur.native.capture="Verification('邮箱')"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model='register_password1'  @blur.native.capture="Verification('密码')"></mt-field>
        <mt-field label="确认密码" placeholder="请确认密码" type="password" v-model='register_password2'      @blur.native.capture="Verification('确认密码')"></mt-field>


        <mt-button type="primary" size="large" @click.native="register" >注册</mt-button>
        <mt-popup v-model="popupVisible" position="top">{{message}}</mt-popup> 
      </mt-tab-container-item>
       
    </mt-tab-container>
   
</template>

<script>

// 要发送数据 ，导入axios 模块
import axios from "axios";
import { Popup } from "mint-ui";
import { MessageBox } from "mint-ui";
import router from "../../router";
import Vue from "vue";
export default {
  data() {
    return {
      register_username: "",
      register_email: "",
      register_password1: "",
      register_password2: "",
      register_phone: "",
      popupVisible: false,
      message: "",
      flag1: false,
      flag2: false,
      flag3: false,
      flag4: false,
      flag5: false
    };
  },
  methods: {
    register() {
      if (this.flag1 && this.flag2 && this.flag3 && this.flag4 && this.flag5) {
        console.log("开始注册");
        //这里提交注册信息
        var username = this.register_username;
        var password = this.register_password1;
        var email = this.register_email;
        var phone = this.register_phone;
        axios
          .post("/registerrequest", {
            username,
            password,
            email,
            phone
          })
          .then(res => {
            console.log(res.data);
            if (res.data.isregister) {
              console.log("注册成功");
              router.push("/login/login-go");
            } else {
              console.log("注册失败");
              router.push("/login/login-register");
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        MessageBox({
          title: "注册失败",
          message: "请确认注册信息是否正确",
          showCancelButton: true
        });
      }

      // var username=this.register_username;
      // var password = this.register_password1;
      // var email = this.register_email;
      // var phone = this.register_phone;

      // axios.post("/registerrequest",{
      //   username,
      //   password,
      //   email,
      //   phone

      // }).then((res)=>{
      //   console.log(res.data);
      //   if (res.data.isregister) {
      //     console.log('注册成功')

      //   } else {
      //     console.log('注册失败')
      //   }
      // }).catch((err)=>{
      //   console.log(err)
      // })
    },
    Verification(mes) {
      //这里进行表单验证
      if (mes == "用户名") {
        var pattern = /^\w{3,}$/; //用户名至少3位

        if (this.register_username.length == 0) {
          this.message = mes + "不能为空";
          this.popupVisible = true;
        } else if (!pattern.test(this.register_username)) {
          this.message = mes + "必须字母，至少3位";
          this.popupVisible = true;
        } else {
          this.flag1 = true;
        }
      }
      if (mes == "手机号") {
        var phones = /^1[34578]\d{9}$/; //手机号验证

        if (this.register_phone.length == 0) {
          this.message = mes + "不能为空";
          this.popupVisible = true;
        } else if (!phones.test(this.register_phone)) {
          this.message = mes + "不符合要求";
          this.popupVisible = true;
        } else {
          this.flag5 = true;
        }
      }
      if (mes == "邮箱") {
        var emailsl = /^\w+@\w+.\w+$/; //邮箱验证
        if (this.register_email.length == 0) {
          this.message = mes + "不能为空";
          this.popupVisible = true;
        } else if (!emailsl.test(this.register_email)) {
          this.message = mes + "不符合要求";
          this.popupVisible = true;
        } else {
          this.flag2 = true;
        }
      }
      if (mes == "密码") {
        var mimasl = /^[a-zA-Z0-9]{4,10}$/; //密码格式
        if (this.register_password1.length == 0) {
          this.message = mes + "不能为空";
          this.popupVisible = true;
        } else if (!mimasl.test(this.register_password1)) {
          this.message = mes + "密码必须为数字或字母，长度4-10";
          this.popupVisible = true;
        } else {
          this.flag3 = true;
        }
      }
      if (mes == "确认密码") {
        var mimasl = /^[a-zA-Z0-9]{4,10}$/; //密码格式
        if (this.register_password2.length == 0) {
          this.message = mes + "不能为空";
          this.popupVisible = true;
        } else if (!mimasl.test(this.register_password2)) {
          this.message = mes + "不符合要求";
          this.popupVisible = true;
        } else if (!(this.register_password1 == this.register_password2)) {
          this.message = mes + "输入不一致";
          this.popupVisible = true;
        } else {
          this.flag4 = true;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.mint-popup-top {
  width: 100%;
  font-size: 0.16rem;
  color: white;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 50;

}
</style>


