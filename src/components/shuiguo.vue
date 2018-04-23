<template>
	<div>
		<navbar></navbar>
		<div class="">
			<ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="false" infinite-scroll-distance="0">
				<li v-for="data,index in getDataList" @click="toDetail(data.restaurant.id)">					
					<div class="container">
						<div class="shopInfo">
							<div class="pic">
								<img class="logo-logo_3S1eSkn_0" :src="getSrc(data.restaurant.image_path)"/>
							</div>
							<div class="info">
								<h3>{{data.restaurant.name}}</h3>
								<div class="wrap">
									<section class="tian-p-2">
										<div class="tian-hui">
											<img :src="hui"/>
										</div>
										<div class="tian-liang" :style="{'width':data.restaurant.rating/5*100 + '%'}">
											<img :src="liang"/>
										</div>
									</section>
									<div class="tian-wen">
										<span>{{data.restaurant.rating}}</span>
										<span>月售{{data.restaurant.recent_order_num}}单</span> 
									</div>
								</div>
								
								<p class="fee">
									<span class="delivery">¥{{data.restaurant.float_minimum_order_amount}}起送 | 配送费¥{{data.restaurant.float_delivery_fee}}</span> 
									<span class="distance">{{data.restaurant.distance}}m | {{data.restaurant.order_lead_time}}分钟</span>
								</p>
							</div>
						</div>
						<div class="activity" :class="isShow?'normal':''">
							<ul>
								<span class="btn" v-if="data.restaurant.activities.length>2" @click.stop="getActivities(index)">
									{{data.restaurant.activities.length}}个活动
								</span>						
								<li v-for="item in data.restaurant.activities">
									<span :style="{'background':'#'+item.icon_color}">{{item.icon_name}}</span>
									<span>{{item.tips}}</span>
								</li>
							</ul>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/javascript">
	import navbar from "./common/navbar";
	import router from  "../router";
	import axios from "axios";
	import { Indicator } from 'mint-ui';

	import { InfiniteScroll } from 'mint-ui';
	import Vue from "vue";
	Vue.use(InfiniteScroll);

	export default {
	  	data(){
	    	return {
	    		//datalist:[],
	    		isShow:true,
	    		loading:false,
	    		current:0,
	    		num:-1,

	    		hui:'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTU0LjAxNyA4LjA3MmwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMNTMuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0tNDggMEwzLjQ2NSA5LjYzM2MtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w1LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBMNy41NSAzLjM1MmwyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNkw4LjQ5NyA2LjI2OWwuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0xMiAwbC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0wxNy42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bTEyIDBsLTIuNTUyIDEuNTYxYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDI5LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBsMS4xNDYgMi43NjMgMi45ODIuMjM3Yy41NTYuMDQ0LjY3LjM2OC4yNC43MzZsLTIuMjc0IDEuOTQ0LjY5NiAyLjkxYy4xMy41NDItLjE0My43NS0uNjI2LjQ1NGwtMi41NTEtMS41NnptMTIgMGwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMNDEuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2eiIgZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+',
				liang:'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIwJSIgeTE9IjUwJSIgeTI9IjUwJSIgaWQ9ImEiPjxzdG9wIHN0b3AtY29sb3I9IiNGRkRFMDAiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjRkZCMDAwIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNNTQuMDE3IDguMDcybC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w1My42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bS00OCAwTDMuNDY1IDkuNjMzYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDUuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMEw3LjU1IDMuMzUybDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2TDguNDk3IDYuMjY5bC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bTEyIDBsLTIuNTUyIDEuNTYxYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDE3LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBsMS4xNDYgMi43NjMgMi45ODIuMjM3Yy41NTYuMDQ0LjY3LjM2OC4yNC43MzZsLTIuMjc0IDEuOTQ0LjY5NiAyLjkxYy4xMy41NDItLjE0My43NS0uNjI2LjQ1NGwtMi41NTEtMS41NnptMTIgMGwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMMjkuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0xMiAwbC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w0MS42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6IiBmaWxsPSJ1cmwoI2EpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4='
	    	}	    	
	  	},
	  	components:{
	    	navbar
	  	},
	  	mounted(){
	  		Indicator.open('加载中...');
	    	axios.get(`/restapi/shopping/v3/restaurants?latitude=29.53571&longitude=106.48629&keyword=&offset=${this.current}&limit=8&extras[]=activities&extras[]=tags&terminal=h5&rank_id=c04bddf2397044749bc44ae0ac748ade&brand_ids[]=&restaurant_category_ids[]=209&restaurant_category_ids[]=212&restaurant_category_ids[]=213&restaurant_category_ids[]=214&restaurant_category_ids[]=215&restaurant_category_ids[]=216&restaurant_category_ids[]=217&restaurant_category_ids[]=219&restaurant_category_ids[]=265&restaurant_category_ids[]=266&restaurant_category_ids[]=267&restaurant_category_ids[]=268&restaurant_category_ids[]=269&restaurant_category_ids[]=221&restaurant_category_ids[]=222&restaurant_category_ids[]=223&restaurant_category_ids[]=224&restaurant_category_ids[]=225&restaurant_category_ids[]=226&restaurant_category_ids[]=227&restaurant_category_ids[]=228&restaurant_category_ids[]=231&restaurant_category_ids[]=232&restaurant_category_ids[]=263&restaurant_category_ids[]=218&restaurant_category_ids[]=234&restaurant_category_ids[]=235&restaurant_category_ids[]=236&restaurant_category_ids[]=237&restaurant_category_ids[]=238&restaurant_category_ids[]=211&restaurant_category_ids[]=229&restaurant_category_ids[]=230&restaurant_category_ids[]=264`).then(res=>{
	  			//console.log(res.data.items);
	  			this.datalist = res.data.items;
	  			this.$store.commit("kerwinList",res.data.items);
	  			Indicator.close();
	  		}).catch(err=>{
	  			console.log(err);
	  		})
	  		
		},
		computed:{
			getDataList(){
				return this.$store.state.datalist;
			}
		},
		methods:{
		  	getActivities(index){
		  		this.isShow = !this.isShow;
		  		this.num = index;
		  	},
		  	toDetail(id){
		  		router.push({name:"kerwindetail",params:{id}})
		  	},
		  	getSrc(src){
				if(src.slice(-3)=='png'){
					return 'https://fuss10.elemecdn.com/'+ src.slice(0,1) + '/' + src.slice(1,3)+'/'+src.slice(3)+'.png'
				}else{
					return 'https://fuss10.elemecdn.com/'+ src.slice(0,1) + '/' + src.slice(1,3)+'/'+src.slice(3)+ '.jpeg'
				}
			},
			loadMore(){		
				Indicator.open('加载中...');		
				this.current +=8;

				axios.get(`/restapi/shopping/v3/restaurants?latitude=29.53571&longitude=106.48629&keyword=&offset=${this.current}&limit=8&extras[]=activities&extras[]=tags&terminal=h5&rank_id=c04bddf2397044749bc44ae0ac748ade&brand_ids[]=&restaurant_category_ids[]=209&restaurant_category_ids[]=212&restaurant_category_ids[]=213&restaurant_category_ids[]=214&restaurant_category_ids[]=215&restaurant_category_ids[]=216&restaurant_category_ids[]=217&restaurant_category_ids[]=219&restaurant_category_ids[]=265&restaurant_category_ids[]=266&restaurant_category_ids[]=267&restaurant_category_ids[]=268&restaurant_category_ids[]=269&restaurant_category_ids[]=221&restaurant_category_ids[]=222&restaurant_category_ids[]=223&restaurant_category_ids[]=224&restaurant_category_ids[]=225&restaurant_category_ids[]=226&restaurant_category_ids[]=227&restaurant_category_ids[]=228&restaurant_category_ids[]=231&restaurant_category_ids[]=232&restaurant_category_ids[]=263&restaurant_category_ids[]=218&restaurant_category_ids[]=234&restaurant_category_ids[]=235&restaurant_category_ids[]=236&restaurant_category_ids[]=237&restaurant_category_ids[]=238&restaurant_category_ids[]=211&restaurant_category_ids[]=229&restaurant_category_ids[]=230&restaurant_category_ids[]=264`)
				.then(res=>{
					//console.log(res.data.items,this.current);
					//this.datalist = [...this.datalist,...res.data.items];					
					this.$store.commit("kerwinList",[...this.$store.state.datalist,...res.data.items]);
					Indicator.close();
				})
			}
		} 
	}
</script>

<style type="text/css" lang="scss" scoped>
	.container{
	    font-size: 0.12rem;
	    color: #666;
	    border-bottom: 1px solid #eee;
	    padding: 0.15rem 0;
	    .shopInfo{
	    	padding:0 0.1rem;
	    	overflow: hidden;
	    	margin-bottom:0.1rem;
	    	h3{
	    		font-size: 0.15rem;
	    	}
	    	.pic{
	    		float:left;
		    	width: 0.65rem;
		    	height: 0.65rem;
		    	.logo-logo_3S1eSkn_0{
		    		width: 100%;
		    	}
		    }

		    .info{
		    	float: left;
		    	width: 100%;
		    	margin-left: 0.1rem;
		    	position: absolute;
			    left: -0.1rem;
			    text-indent: 85px;
		    	.fee{
		    		position: relative;
		    		width:100%;
		    		.distance{
			    		position: absolute;
			    		top: 0;
			    		right: 0.1rem;
			    	}	
		    	}	    	
		    }
	    }
	    .activity{
	    	margin-left: 0.8rem;	    	
	    	ul{
	    		position:relative;
	    		li{
	    			margin-bottom: 0.05rem;
	    			width:1.8rem;
	    			overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
	    			span:nth-of-type(1){
	    				color:#fff;
	    				font-size: 0.12rem;
	    			}
	    		}
	    		.btn{
	    			position:absolute;
	    			top: 0;
	    			right: 0.1rem;
	    		}
	    	}
	    	
	    }
	    .normal{
	    	max-height: 0.42rem;
	    	overflow:hidden;
	    }
	    .wrap{
	    	height:0.16rem;
    	    .tian-p-2{
    			position: absolute;clear: both;
    			.tian-liang{ 
    				position: absolute;
    				top: 0;
    				left: 0;
    				z-index: 2;
    				overflow: hidden;
    			}	
    		}
    		.tian-wen{
    			font-size: 0.08rem;
    			position: absolute;
    			top:0.2rem;
    			left: 0.7rem;
    		}
	    }
	    
	}
</style>
