<template>
	<div v-if="info">
		<div class="shopHeader">
			<div class="shopHeaderBG">
				<i class="iconfont icon-back" @click="goBack()"></i>
				<p><img :src="getSrc(info.image_path)"></p>
			</div>
			<div class="shopHeaderTitle">
				<h2>{{info.name}}</h2>
				<p class="shopRating">
					<span>{{info.rating}}&nbsp;</span>
					<span>月售{{info.recent_order_num}}单&nbsp;</span>
					<span>商家配送 约{{info.order_lead_time}}分钟&nbsp;</span>
					<span>距离{{info.distance}}m</span>
				</p>
				<p class="promotion_info">{{info.promotion_info}}</p>
				<ul class="activities" v-if="info.activities.length>1">				
					<li>
						<span class="btn" @click="handleClick()">
							{{info.activities.length}}个活动
						</span>	
						<span class="icon_name" :style="{'background':'#'+info.activities[0].icon_color}">{{info.activities[0].icon_name}}</span>
						<span class="tips">{{info.activities[0].tips}}</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="shopTab">
			<ul>
				<li><span class="current">点餐</span></li>
				<li><span>评价</span></li>
				<li><span>商家</span></li>
			</ul>
		</div>
		<div class="menu">
			<ul class="menuNav">
				<li v-for="data in navList">
					<img :src="getSrc(data.icon_url)" v-if="data.icon_url != '' "/>
					{{data.name}}
				</li>
			</ul>
			<ul class="foods">
				<li v-for="data in navList">
					<p class="title"><b>{{data.name}}</b> {{data.description}}</p>
					<div class="menuFood" v-for="item in data.foods">
						<div class="foodImg">
							<img :src="getSrc(item.image_path)" v-if="item.image_path != '' "/>
							<div class="foodDetail">
								<h3>{{item.name}}</h3>
								<p>{{item.description}}</p>
								<p>月售{{item.month_sales}} 好评率{{item.satisfy_rate}}%</p>
								<p class="price">
									<span>¥</span>
									{{item.specfoods[0].price}}
									<span class="num">+</span>
								</p>
							</div>

						</div>
						
					</div>
				</li>
			</ul>
		</div>
	</div>

</template>

<script type="text/javascript">
	import axios from "axios";
	import { Indicator } from 'mint-ui';
	export default {
		data(){
			return {
				info:null,
				navList:[],
			}
		},
		mounted(){
			Indicator.open('加载中...');
			Promise.all([axios.get(`/restapi/shopping/restaurant/${this.$route.params.id}?extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&extras[]=qualification&terminal=h5&latitude=29.53571&longitude=106.48629`),
			axios.get(`/restapi/shopping/v2/menu?restaurant_id=${this.$route.params.id}`)
			]).then(res=>{
				//console.log(res[1].data);

				this.info = res[0].data;
				this.navList = res[1].data;
				Indicator.close();
			}).catch(err=>{
	  			console.log(err);
	  		})
		},
		methods:{
			goBack(){
				window.history.back();
			},
			getSrc(src){
				if(src!=null){
					if(src.slice(-3)=='png'){
						return 'https://fuss10.elemecdn.com/'+ src.slice(0,1) + '/' + src.slice(1,3)+'/'+src.slice(3)+'.png'
					}else if(src.slice(-3)=='gif'){
						return 'https://fuss10.elemecdn.com/'+ src.slice(0,1) + '/' + src.slice(1,3)+'/'+src.slice(3)+ '.gif'
					}else{
						return 'https://fuss10.elemecdn.com/'+ src.slice(0,1) + '/' + src.slice(1,3)+'/'+src.slice(3)+ '.jpeg'
					}
				}
				
			}
		}
	}

</script>

<style type="text/css" lang="scss" scoped>
	.shopHeader{
		padding-bottom: 0.1rem;
		.shopHeaderBG{
			height:0.7rem;
			background: skyblue;
			i{
				font-size: 0.34rem;
				padding: 0 0.3rem 0 0.08rem;
				line-height: 0.44rem;
				color: #fff;
			}
			p{
				width: 0.65rem;
				height: 0.65rem;
				margin: 0 auto;
				img{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.shopHeaderTitle{
		padding: 0.5rem 0.15rem 0 0.15rem;
		text-align: center;
		h2{
			font-size: 0.2rem;
		}
		.shopRating{
			font-size: 0.12rem;
			margin-top: 0.07rem;
		}
		.promotion_info{
			font-size: 0.12rem;
			margin: 0.08rem 0 0.1rem 0;
			color: #999;
			width: 2rem;
			height: 0.16rem;
			white-space: nowrap;
			overflow: hidden;
    		text-overflow: ellipsis;
    		margin: 0 auto; 
		}
		.activities{
			font-size: 0.12rem;
			text-align: left;
			.btn{
				position: absolute;
				top: 0.05rem;
				right: 0;
			}
			li{
				position: relative;
				padding: 0.05rem 0.08rem;
				.tips{
					display: inline-block;
					width: 2rem;
					white-space: nowrap;
					overflow: hidden;
		    		text-overflow: ellipsis;
				}
			}
		}
	}
	.shopTab{
		ul{
			display: flex;
			li{
				flex: 1;
				text-align: center;
				line-height: 0.4rem;
				border-bottom: 1px solid #ddd;
				.current{
					display: inline-block;
					line-height: 0.4rem;
					border-bottom: 1px solid #2395ff;
				}
			}
		}
	}
	.menu{
		display:flex;
		.menuNav{
			background: #fff;
			//width: 0.62rem;
			font-size: 0.12rem;
			padding: 0 0.08rem;
			color: #333;
			li{
				width: 0.62rem;
				padding: 0.18rem 0;
				word-wrap: break-word;
				img{
					width: 0.13rem;
					height: 0.13rem;
				}
			}
		}
		.foods{
			flex: 1;
			font-size: 0.12rem;
			.title{
				padding: 0.07rem 0.3rem 0.07rem 0;
				color: #999;
				b{
					color: #666;
				}
			}
			.menuFood{
				padding: 0.1rem 0.1rem 0.1rem 0;
				.foodImg{
					img{
						width: 0.76rem;
						height: 0.76rem;
					}
					.foodDetail{
						display: inline-block;
						width: 1.8rem;
    					margin-left: 0.1rem;
    					h3{
    						font-size: 0.16rem;
    						width: 1.8rem;
    						word-wrap: break-word;
    					}
    					p:nth-of-type(1){
    						color: #999;
    						width: 1.8rem;
    						white-space: nowrap;
							overflow: hidden;
    						text-overflow: ellipsis;
    					}
    					.price{
    						font-size: 0.2rem;
    						color: #f60;
    						span{
    							font-size: 0.16rem;
    						}
    						.num{
    							display: inline-block;
    							float: right;
    							width: 0.2rem;
    							height: 0.2rem;
    							font-size: 0.2rem;
    							color: #fff;
    							text-align: center;
    							line-height: 0.2rem;
    							background: #3199e8;
    						}
    					}
					}
				}
			}
		}
	}

</style>