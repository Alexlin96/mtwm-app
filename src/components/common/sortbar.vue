<template>
	<div>
		<div class="sort">
			<ul>
				<li v-for="data,index in sortList" :key="data.index" :class="current==index?'active':''" @click="getSortIndex(index)">
					<span>{{data}}</span>
					<i class="iconfont icon-selected activeRi" v-if="current==index"></i>
				</li>
			</ul>
		</div>
		<div class="mask"></div>
	</div>

</template>

<script type="text/javascript">	
	export default {
	  data(){
	    return {
	    	sortList:["综合排序","销量最高","起送价最低","配送最快"],
	    	current:-1
	    }
	  },
	  methods:{
	  	getSortIndex(index){
	  		this.current = index;
	  	}
	  }  
	}

</script>


<style type="text/css" lang="scss" scoped>

	.sort{
		position: absolute;
		left: 0;
		top: 0.85rem;
		z-index: 9;
		width: 100%;
		max-height: 3.4rem;
		background: #fff;
		li{
			height: 0.5rem;
			line-height: 0.5rem;
			padding-left: 0.2rem;
			border-bottom: 1px solid #e9e9e9;
			color: #2f2f2f;
		}
		.active{
			color: #3190e8;
			font-weight: 800;
		}
		.activeRi{
			float: right;
			font-size: 0.3rem;
			font-weight: 800;
			margin-right: 0.1rem;
		}
	}
	.mask{
		position: absolute;
		left: 0;
		top: 0.85rem;
		z-index: 5;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.3);
	}
</style>