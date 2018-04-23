<template>
	<div id="user-bar-wrap">
		<div class="user-bar">
			<router-link to="/" tag="a" class="user-bar-btn" activeClass ="user-bar-btn-focus">
				<i class="iconfont icon-smile"></i>
				<span class="user-bar-btn-txt">首页</span>
			</router-link>
	
			<router-link to="/order" tag="a" class="user-bar-btn" activeClass ="user-bar-btn-focus">
				<i class="iconfont icon-smile"></i>
				<span class="user-bar-btn-txt">订单</span>
			</router-link>
	
			<router-link to="/my" tag="a" class="user-bar-btn" activeClass ="user-bar-btn-focus">
				<i class="iconfont icon-smile"></i>
				<span class="user-bar-btn-txt">我的</span>
			</router-link>
		</div>
	</div>
</template>

<script>
	export default{
	}
</script>

<style scoped="scoped" lang="scss">
	a{
		text-autospace: none;
	}
	
	#user-bar-wrap {
		  width: 100%;position: fixed;bottom: 0;z-index:20;font-size: 0.1rem;
		  
		  .user-bar { 
			width: 100%; height: 0.35rem; border-top: 0.005rem solid #b6b6b6; background-color: rgba(246,246,246,0.95); 
			text-align: center; z-index: 10; padding-top:0.06rem;
			
			.user-bar-btn {
			  display: inline-block;height: 100%;width: 32%;color: #999;
			}
			
			.user-bar-btn-focus {
		    	color: #333;
			}
			
			i{
				display: block;
			}
			
			.user-bar-btn-txt {
			    display: block;
			}
		}
	}
</style>