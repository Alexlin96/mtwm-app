<!-- 登录注册 组件 -->

<template>
  <div class="login">
   <div class="head"><span class="back" @click="back" >&lt</span>登录注册页</div>
    <mt-navbar v-model="selected" >   
      <mt-tab-item id="go">登录</mt-tab-item>
      <mt-tab-item id="register"  >注册</mt-tab-item> 
   </mt-navbar> 
    <router-view></router-view>
  </div>
</template>

<script>
import router from "../../router";
export default{
  data(){
    return { 
      selected : 'go',
     
      }
  },
  watch: {
    selected: function (val, oldVal) {
        // 这里就可以通过 val 的值变更来确定
        router.push(`/login/login-${val}`);
    }
},
  methods: {
    back:function(){
      router.push(`/my`);
    },
  }
}
</script>

<style lang="scss" scoped>
.back{
  float: left;
  margin-left: 0.2rem;
  font-size: 0.2rem;
}
.head{
  height: 0.5rem;
  line-height: 0.5rem;
    text-align: center;
}
.alexactive{
  border-bottom: 3px solid skyblue;
  color: skyblue;
}
</style>
