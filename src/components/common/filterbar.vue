<template>
	<div>
		<div class="filter">
			<div class="grouping">
				<p>优惠活动</p>
				<ul>
					<li v-for="data,index in activityList" :key="data.id" :class="current==index?'active':''" @click="getActivityIndex(index)">
						<b :style="{'background': '#'+data.icon_color}" v-if="current!=index">{{data.icon_name}}</b>
						<i class="iconfont icon-selected" v-if="current==index"></i>
						{{data.name}}
					</li>
				</ul>
			</div>
			<div class="grouping">
				<p>人均消费</p>
				<ul>
					<li v-for="data,index in averageList" :key="data.id" :class="currentAver==index?'average':''" @click="getAverageIndex(index)">
						<i class="iconfont icon-selected" v-if="currentAver==index"></i>
						{{data.description}}
					</li>
				</ul>
			</div>
			<div class="btn">
				<span class="clear" @click="clear()" :class="flag?'clear':'empty'">清空</span>
				<span class="sure">确定</span>
			</div>
		</div>
		<div class="mask"></div>
	</div>

</template>

<script type="text/javascript">	
	import axios from "axios";
	export default {
	  data(){
	    return {
	    	current:-1,
	    	currentAver:-1,
	    	flag: false,
	    	activityList:[],
	    	averageList:[]
	    }
	  },
	  mounted(){
	    	axios.get("/restapi/shopping/v1/restaurants/filter-bar/attributes?latitude=29.53571&longitude=106.48629&terminal=h5"
	    	).then(res=>{
	  			//console.log(res.data.activity_types);
	  			this.activityList = res.data.activity_types;
	  			this.averageList = res.data.average_costs;
	  		}).catch(err=>{
	  			console.log(err);
	  		})
		},
		methods:{
			getActivityIndex(index){
				this.current = index;
				this.flag = true;
			},
			getAverageIndex(index){
				this.currentAver = index;
				this.flag = true;
			},
			clear(){
				this.current = -1;
				this.currentAver = -1;
				this.flag = false;
			}
		}
	}

</script>

<style type="text/css" lang="scss" scoped>


	.filter{
		position: absolute;
		left: 0;
		top: 85px;
		z-index: 9;
		width: 100%;
		max-height: 3.4rem;
		background: #fff;
		.grouping{
			p{
				line-height : 0.3rem;
				padding: 0 0.15rem;
				background: #fafafa;
			}
			ul{
				display: flex;
				flex-wrap: wrap;
				font-size: 0.12rem;
				li{
					flex: 0 0 33.33%;
					box-sizing: border-box;
					text-indent: 0.15rem;
					line-height : 0.35rem;
					border-right: 1px solid #eee;
					border-bottom: 1px solid #eee;
					b{
						font-weight: 500;
    					color: #fff;
    					margin-right: 0.05rem;
    					font-size: 0.14rem;
					}
					i{
						font-size: 0.14rem;
					}
				}
				.active,.average{
					color: #3190e8;
					background: #edf5ff;
				}
			}
		}
		.btn{
			display: flex;
			line-height: 0.43rem;			
			text-align: center;
			.clear{
				flex: 1;
				border-right: 1px solid #eee;	
			}
			.sure{
				flex: 1;
				background: #00d762;
				color: #fff;
			}
			.empty{
				color: #ddd;
			}
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