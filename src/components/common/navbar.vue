<template>
	<div>
		<nav>
			<div class="navTop">
				<router-link tag="i" to="/" class="iconfont icon-back"></router-link>
				<h1>{{getTitle}}</h1>
			</div>
			<div class="navBottom">
				<a href="#" @click="category()">
					{{getTitle}}
					<i class="iconfont icon-moreunfold" v-if="iconFlagCategory"></i>
					<i class="iconfont icon-less" v-else></i>
				</a>
				<a href="#" @click="sort()">综合排序
					<i class="iconfont icon-moreunfold" v-if="iconFlagSort"></i>
					<i class="iconfont icon-less" v-else></i>
				</a>
				<a href="#" @click="filter()">筛选
					<i class="iconfont icon-filter"></i>
				</a>
			</div>
		</nav>
		<categorybar v-show="getIsShowCategor"></categorybar>
		<sortbar v-show="isShowSort"></sortbar>
		<filterbar v-show="isShowFilte"></filterbar>
	</div>
	
</template>

<script type="text/javascript" >
	import categorybar from "./categorybar";
	import sortbar from "./sortbar";
	import filterbar from "./filterbar";
	export default {

		data(){
			return {
				title:{meishi:"美食",shop:"美团超市",shuiguo:"生鲜果蔬",meituanzhuansong:"美团专送",kuaishijiancan:"快食简餐",breakfast:"午餐优选",tiandianyinpin:"甜点饮品",jiachangcai:"家常菜"},
				iconFlagCategory:true,
				iconFlagSort:true,
				isShow:false,
				//isShowCategor:false,
				isShowSort:false,
				isShowFilte:false,
			}	
		},
		components:{
	    	categorybar,
	    	sortbar,
	    	filterbar
	  	},
	  	computed:{
			getIsShowCategor(){
				return this.$store.state.isShowCategor;
			},
			getTitle(){
				var str = this.$route.name;
				return this.title[str];
			}
		},
		methods:{
			category(){
				this.iconFlagCategory = ! this.iconFlagCategory;
				this.iconFlagSort = true;
				//this.isShowCategor = !this.isShowCategor;
				this.$store.commit("kerwinCategory",!this.$store.state.isShowCategor);
				this.isShowSort = false;
				this.isShowFilte = false;
			},
			sort(){
				this.iconFlagCategory = true;
				this.iconFlagSort = !this.iconFlagSort;
				this.isShowCategor = false;
				this.isShowSort = !this.isShowSort;
				this.isShowFilte = false;
			},
			filter(){
				this.iconFlagCategory = true;
				this.iconFlagSort = true;
				this.isShowCategor = false;
				this.isShowSort = false;
				this.isShowFilte = !this.isShowFilte;
			}
		}
	}

</script>


<style type="text/css" lang="scss" scoped>



	.navTop{
		height: 0.42rem;
		line-height: 0.44rem;
		font-size: 0.17rem;
		background: #fff;
		border-bottom: 1px solid #f8f8f8;
		border-top: 1px solid #f8f8f8;
		h1{
			width: 100%;
			text-align: center;
			font-size: 0.17rem;
			color: #333;
			float:left;
		}
		i{
			position: absolute;
		    top: 0;
		    left: 0;
		    padding: 0 0.3rem 0 0.08rem;
		    font-size: 0.24rem;
    		color: #333;
		}

	}
	.navBottom{
		height: 0.39rem;
		border: 1px solid #e4e4e4;
		border-width: 1px 0;
		position: relative;
		a{
			display: inline-block;
			box-sizing: border-box;
			width: 33%;
			float: left;
			height: 0.17rem;
			line-height: 0.17rem;
			margin-top: 0.11rem;
			padding: 0 1px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			font-size: 0.13rem;
			color: #2f2f2f;
			border-right: 1px solid #dddddd;
			text-align: center;
		}
		a:nth-of-type(3){
			border-right: 0;
		}
	}

</style>