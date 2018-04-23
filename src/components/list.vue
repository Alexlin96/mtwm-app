<template>
	<div id = "list">
		<div class = "list-top" v-if="topList">
			<div class="list-top-top">
				<router-link to = "/" tag="i" class="iconfont icon-back"></router-link>
			</div>
			<div class="list-top-cen">
				<img :src="topList.image_path.slice(topList.image_path.length-3)==='png'?'https://fuss10.elemecdn.com'+'/'+ topList.image_path.slice(0,1) + '/' +topList.image_path.slice(1,3)+'/'+topList.image_path.slice(3)+ '.png':'https://fuss10.elemecdn.com'+'/'+ topList.image_path.slice(0,1) + '/' + topList.image_path.slice(1,3)+'/'+topList.image_path.slice(3)+ '.jpeg'"/>
				
				<div class="list-top-cen-bottom">
					<h2>
						<span content="品牌" v-if="topList.is_premium" class="h2-span-1">品牌</span>
						<span class="h2-span-2">{{topList.name}}</span>
						<i class="iconfont icon-favorites" @click="handleMessage"></i>
					</h2>
				</div>
			</div>
		</div>
		
		<div class="mint-msgbox" v-if="topList" v-show="isShow" @click="handleMessage">
			<div class="mint-msgbox-header">
				<div class="mint-msgbox-title">
					<h2>
						<span content="品牌" v-if="topList.is_premium" class="h2-span-1">品牌</span>
						<span class="h2-span-2">{{topList.name}}</span>
					</h2>
				</div>
			</div> 
			<div class="mint-msgbox-content">
				<div class="mint-msgbox-message">
					<ul>
						<li><h3>{{topList.rating}}</h3><p>评分</p></li>
						<li><h3>{{topList.recent_order_num}}单</h3><p>月售</p></li>
						<li><h3>商家配送</h3><p>约{{topList.order_lead_time}}分钟</p></li>
						<li><h3>{{topList.float_delivery_fee}}元</h3><p>配送费</p></li>
						<li><h3>{{topList.distance/1000}}km</h3><p>距离</p></li>
					</ul>
					
					<h3 class="mint-mih">
						<span>公告</span>
					</h3>
					
					<div class="mint-div">温馨提示:{{topList.promotion_info}}</div>
				</div> 
				<div class="mint-msgbox-input" style="display: none;">
					<input placeholder="" type="text"/> 
					<div class="mint-msgbox-errormsg" style="visibility: hidden;">		
					</div>
				</div>
			</div> 
			<div class="mint-msgbox-btns">
				<button class="mint-msgbox-btn mint-msgbox-cancel " style="display: none;">取消</button> 
				<button class="mint-msgbox-btn mint-msgbox-confirm " style="display: none;">确定</button>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript" charset="UTF-8">
	import axios from "axios";
	import { MessageBox } from 'mint-ui';
	
	export default{
		data(){
			return {
				topList:null,
				isShow:false
			}
		},
		
		mounted(){
			//Indicator.open('加载中...');
//https://h5.ele.me/restapi/shopping/restaurant/2127268?extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&extras[]=qualification&terminal=h5&latitude=29.564916&longitude=106.468822
		  	//https://h5.ele.me/restapi/shopping/v2/menu?restaurant_id=2127268
	/*	  	axios.get(`/restapi/shopping/v2/menu?restaurant_id=${this.$route.query.id}`).then(res => {
		  		console.log(res.data);
		  		//this.datalist = res.data.items;
		  		
		  		//Indicator.close();
		  	});*/
		  	
		  	Promise.all([axios.get(`/restapi/shopping/restaurant/${this.$route.query.id}?extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&extras[]=qualification&terminal=h5&latitude=29.564916&longitude=106.468822`),axios.get(`/restapi/shopping/v2/menu?restaurant_id=${this.$route.query.id}`)]).then((res)=>{
		  		//console.log(res[0].data);
		  		this.topList = res[0].data;
		  		console.log(this.topList);
		  	});

		},
		
		methods:{
			handleMessage(){
				this.isShow =! this.isShow;
			}
		}
	}
</script>

<style type="text/css" lang="scss" scoped="scoped">
	#list{
		.list-top{
			position: relative;background-color: #fff;color: #333;padding-bottom:1rem;
			
			.list-top-top{
				padding: 0.04rem 0.1rem;height: 0.6rem;
				background-image: url("https://fuss10.elemecdn.com/c/ce/b8bbdedfbd891220992acb96a3cc9png.png?imageMogr/format/webp/thumbnail/!40p/blur/50x40/");
				.icon-back{
					position: absolute;top: 0.05rem;left: 0.05rem;width: 0.25rem;height: 0.25rem;color: white;
				}
			}
			
			.list-top-cen{
				padding: 0.3rem 0.15rem 0;position: relative;display: flex;background-color: #fff;text-align: center;

				img{
					width: 0.65rem;height: 0.65rem;border-radius: .053333rem;box-shadow: 0 0 0.04rem 0 rgba(0,0,0,.2);position: absolute;
   					top: 0;left: 50%;margin-left: -0.32rem;margin-top: -0.32rem;
				}
				
				.list-top-cen-bottom{
					flex: 1;width: 3.45rem;margin-top: 5%;
					
					h2{
						font-weight: 700;white-space: nowrap;position: relative;display: flex;justify-content: center;align-items: center;padding-right: 0.1rem;
						width: 3.35rem;height: 0.245rem;
						
						.h2-span-1{
							margin-right: 0.06rem;border-radius: .026667rem;background-image: linear-gradient(90deg,#fff100,#ffe339);width: 0.36rem;height: 0.18rem;
							position: relative;color: transparent;white-space: nowrap;font-size: 0.1rem;line-height: 0.18rem;
							color: #6a3709;font-style: normal;font-weight: 700;position: absolute;left: 0;top: 15%;
						}
						
						.h2-span-2{
							font-size: 0.2rem;margin-left: 0.2rem;
						}
					}
				}
			}
		}
		
		.mint-msgbox{
			z-index: 12;
			
			h2{
				font-weight: 700;white-space: nowrap;position: relative;display: flex;justify-content: center;align-items: center;padding-right: 0.1rem;
				width: 3.35rem;height: 0.245rem;
				
				.h2-span-1{
					margin-right: 0.06rem;border-radius: .026667rem;background-image: linear-gradient(90deg,#fff100,#ffe339);width: 0.36rem;height: 0.18rem;
					position: relative;color: transparent;white-space: nowrap;font-size: 0.1rem;line-height: 0.18rem;
					color: #6a3709;font-style: normal;font-weight: 700;position: absolute;left: 2%;top: 15%;
				}
				
				.h2-span-2{
					font-size: 0.2rem;margin-left: 0.2rem;
				}
			}
			
			.mint-msgbox-content{
				ul{
					display:flex;
					
					li{
						list-style: none;width: 20%;text-align: center;
						
						h3{
							font-weight: 600;color: #333;font-size: 0.13rem;
						}
						
						p{
							color: #999;font-size: 0.12rem;margin-top: -0.1rem;
						}
					}
				}
				
				.mint-mih{
					position: relative;text-align: center;margin: 0.05rem auto 0.05rem;width: 0.76rem;background-image: linear-gradient(90deg,#fff,#333 50%,#fff);
					background-size: 100% 0.005rem;background-position: 50%;background-repeat: no-repeat;
					
					span{
						color: #999;background-color: #fff;font-size: 0.1rem;padding: 0 0.04rem;
					}
				}
				
				.mint-div{
					font-size: 0.1rem;color: #333;
				}
			}
		}
		
		.v-modal{
			z-index: 10;
		}
	}
</style>