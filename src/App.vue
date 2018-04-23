<template>
  <div id="app">
    <router-view></router-view>
    <myfooter></myfooter>
  </div>
</template>

<script>
	import myfooter from "./components/common/myfooter";
	
	export default {
	  name: 'App',
	  
	  components:{
	  		myfooter
	  },
	}
</script>

<style lang="scss">
	
	body{
		font-size: 12px;
	}
	li{
		list-style: none;
	}
	a{
		text-decoration: none;
	}

</style>
