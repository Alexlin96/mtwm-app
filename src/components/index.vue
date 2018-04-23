<template>
  <div class="index">
  	<header id="header" class="home-header">
    	<router-link tag="a" to="/map" class="header-loc" href="#">
        <i class="iconfont icon-map"></i>
    		<span class="j-header-loc-txt header-loc-txt">
        	<span class="j-header-loc-txt-marquee header-loc-txt-marquee" data-address="" >重庆市</span>
    		</span>
        <i class="iconfont icon-more"></i>
    	</router-link>
	
	    <router-link tag="a" to="/search" class="j-search-icon-wrap search-icon-wrap">
	    	<i class="iconfont icon-search"></i>
	    	<span class="search-text">鸡排</span>
	    </router-link>
		</header>

  	<div id="bnrs-wrap" class="bnrs-wrap">
  		<div id="bnrs" class="bnrs">
  			<a class="baitem" href="javascript:;" data-app="1">
  				<img src="../assets/banner.jpg"/>
  			</a>
  		</div>
  		
  		<div id="bnrs-indic-wrap" class="bnrs-indic-wrap">
  		</div>
  	</div>
  	
  	<div class="j-rmd-types rmd-types" id="primary_item_bar_new">
  		<router-link to = "/meishi" tag="a">
  			<img class="logoIcon" src="../assets/meishi.png"/>
  			<span>美食</span>
  		</router-link>
  		
  		<router-link to = "/shop" tag="a">
  			<img class="logoIcon" src="../assets/shop.png"/>
  			<span>美团超市</span>
  		</router-link>
  		
  		<router-link to = "/shuiguo" tag="a">
  			<img class="logoIcon" src="../assets/shuiguo.png"/>
  			<span>生鲜果蔬</span>
  		</router-link>
  		
  		<router-link to = "/meituanzhuansong" tag="a">
  			<img class="logoIcon" src="../assets/zhuansong.png"/>
  			<span>美团专送</span>
  		</router-link>
  		
  		<router-link to = "/kuaishijiancan" tag="a">
  			<img class="logoIcon" src="../assets/kuaishijiancan.png"/>
  			<span>快食简餐</span>
  		</router-link>
  
  		<router-link to = "/breakfast" tag="a">
  			<img class="logoIcon" src="../assets/breakfast.png"/>
  			<span>午餐优选</span>
  		</router-link>
  		
  		<router-link to = "/tandianyinpin" tag="a">
  			<img class="logoIcon" src="../assets/disert.png"/>
  			<span>甜点饮品</span>
  		</router-link>
  		
  		<router-link to = "/jiachangcai" tag="a">
  			<img class="logoIcon" src="../assets/jiachangcai.png"/>
  			<span>家常菜</span>
  		</router-link>
  	</div>
  	
  	
		<div class="top-placeholder" v-if="datalist">
  		<div class="top-placeholder-inner">推荐商家</div>
  		
  		<ul v-if="datalist"   v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
  			<li v-for="data in datalist" @click="handle(data)">
  				<div class="index-top">
  					<div class="index-top-left">
  						<img :src="data.restaurant.image_path.slice(data.restaurant.image_path.length-3)==='png'?'https://fuss10.elemecdn.com'+'/'+ data.restaurant.image_path.slice(0,1) + '/' +data.restaurant.image_path.slice(1,3)+'/'+data.restaurant.image_path.slice(3)+ '.png':'https://fuss10.elemecdn.com'+'/'+ data.restaurant.image_path.slice(0,1) + '/' +data.restaurant.image_path.slice(1,3)+'/'+data.restaurant.image_path.slice(3)+ '.jpeg'" />
  					</div>
  					<div class="index-top-right">
  						<section class="index-p-1">
  							<h3>
									<!--有问题-->
									<i content="品牌" class="index-i" v-if="data.restaurant.is_premium"></i>
									{{data.restaurant.name}}
  							</h3>
  						</section>
  		
  						<section class="index-p-2">
  							<div class="index-hui">
  								<img :src="hui" />
  							</div>
  		
  							<div class="index-liang" :style="{'width':data.restaurant.rating/5*100 + '%'}">
  								<img :src="liang" />
  							</div>
  						</section>
  		
  						<div class="index-wen">
  							<span>{{data.restaurant.rating}} 月售{{data.restaurant.recent_order_num}}单</span>
  						</div>
  		
  						<section class="index-p-3">
  							<div class="index-p-3-left">
  								￥{{data.restaurant.float_minimum_order_amount}}起送 夜间配送费￥{{data.restaurant.float_delivery_fee}}
  							</div>
  							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
  							<div class="index-p-3-right">
  								{{data.restaurant.distance}}m|{{data.restaurant.order_lead_time}}分钟
  							</div>
  						</section>
  					</div>
  				</div>
  		
  				<div class="index-bottom">
  					<p class="index-bottom-1"><span>{{data.restaurant.activities[0].icon_name}}</span> {{data.restaurant.activities[0].tips}}</p>
  					<p class="index-bottom-2" v-if="data.restaurant.activities[1]"><span>{{data.restaurant.activities[1].icon_name}}</span> {{data.restaurant.activities[1].tips}}</p>
  				</div>
  			</li>
  		</ul> 		
  	</div>
  </div>
</template>

<script>
	import axios from "axios";
	
	import { InfiniteScroll } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import Vue from "vue";
	import router from "../router";
	Vue.use(InfiniteScroll);
	
	import Vuex from "vuex";
	
	export default {
	  data () {
	  	return { 
	  		datalist:null,
	  		loading:false,
	  		current:0,
	  		total:1134,
	  		hui:'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTU0LjAxNyA4LjA3MmwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMNTMuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0tNDggMEwzLjQ2NSA5LjYzM2MtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w1LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBMNy41NSAzLjM1MmwyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNkw4LjQ5NyA2LjI2OWwuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0xMiAwbC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0wxNy42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bTEyIDBsLTIuNTUyIDEuNTYxYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDI5LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBsMS4xNDYgMi43NjMgMi45ODIuMjM3Yy41NTYuMDQ0LjY3LjM2OC4yNC43MzZsLTIuMjc0IDEuOTQ0LjY5NiAyLjkxYy4xMy41NDItLjE0My43NS0uNjI2LjQ1NGwtMi41NTEtMS41NnptMTIgMGwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMNDEuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2eiIgZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+', 
	  		liang:'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIwJSIgeTE9IjUwJSIgeTI9IjUwJSIgaWQ9ImEiPjxzdG9wIHN0b3AtY29sb3I9IiNGRkRFMDAiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjRkZCMDAwIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNNTQuMDE3IDguMDcybC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w1My42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bS00OCAwTDMuNDY1IDkuNjMzYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDUuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMEw3LjU1IDMuMzUybDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2TDguNDk3IDYuMjY5bC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bTEyIDBsLTIuNTUyIDEuNTYxYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDE3LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBsMS4xNDYgMi43NjMgMi45ODIuMjM3Yy41NTYuMDQ0LjY3LjM2OC4yNC43MzZsLTIuMjc0IDEuOTQ0LjY5NiAyLjkxYy4xMy41NDItLjE0My43NS0uNjI2LjQ1NGwtMi41NTEtMS41NnptMTIgMGwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMMjkuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0xMiAwbC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w0MS42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6IiBmaWxsPSJ1cmwoI2EpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=' }
	  },
	  
	  mounted(){
	  	Indicator.open('加载中...');
	  	
		/*	if(this.$store.state.indexList.length == 0){
	  		//进行action数据请求
	  		this.$store.dispatch("getIndexList");
	  	}
	  	*/
	  	axios.get("/restapi/shopping/v3/restaurants?latitude=29.502272&longitude=106.510676&offset=0&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&rank_id=&terminal=h5").then(res => {
	  		console.log(res.data.items);
	  		this.datalist = res.data.items;
	  		
	  		Indicator.close();
	  	});
	  	/*datalist = this.$store.state.indexList;*/
	  },
	  
	  
/*	  computed:{
	  	datalist(){
	  		if(this.dataList == null){
	  			this.dataList = this.$store.state.indexList;
	  		}
	  		
	  		console.log(this.dataList);
	  		Indicator.close();
	  		
	  		return this.dataList;
	  	}
	  },*/
	  
	  methods:{
	  	loadMore() { 
		 		Indicator.open('加载中...');
	  		
	  		if(this.current > this.total){  			
	  			return;
	  		}
	  		
	  		this.current = this.current + 1;
	  		
	  		axios.get(`/restapi/shopping/v3/restaurants?latitude=29.502272&longitude=106.510676&offset=${this.current}&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&rank_id=&terminal=h5`).then(res => {
	  			//console.log(res.data.items);
	  			this.datalist = [...this.datalist,...res.data.items];
	  			
	  			Indicator.close();
	  		});
	  	},
	  	
	  	handle(data){
	  		/*console.log(index);*/
	  		console.log(data.restaurant.id);
	  		router.push(`/list?id=${data.restaurant.id}`);
	  	}
	  }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped="scoped" lang="scss">
	img{
		width: 100%;
		border: none;
	}
	
	li{
		list-style: none;
	}
	
	a{
		text-decoration: none;outline: none;
	}
	
	.index{
		background-color: #F4F4F4;position: relative;min-height: 100%;color: #2f2f2f;
		
		#header{
			position: absolute; left: 0; top: 0; width: 100%; z-index: 2; text-align: center;display:flex;
			
			.header-loc { 
				display: inline-block; height: 0.2rem;padding: 0 0.025rem; color: #ffffff; font-size: 0.1rem; background: rgba(0,0,0,0.3);
				border-radius:0.065rem; margin-left: 0.05rem;  max-width: 40%; margin-right: 0.06rem; margin-top: 0.1rem;
			}
			
			.header-loc-txt { 
				box-sizing: border-box; display: inline-block; max-width: 100%; overflow: hidden; vertical-align: middle; padding: 0 0.1rem;
				height: 0.2rem;
			}
			
			.search-icon-wrap{
				display: inline-block;height: 0.2rem;line-height:0.2rem;padding-top: 0.02rem;box-sizing: border-box;border-radius: 0.065rem;font-size: 0.1rem;
    		margin-top: 0.05rem;margin-right: 0.05rem;width: 45%;background: #fff;text-align: left;
    		margin-left: 0.8rem;margin-top: 0.1rem;
    		
    		span{
    			  font-size: 0.1rem;color: #333;
    		}
			}
		}
		
		.rmd-types {
		  overflow: hidden;background: #fff;padding-bottom: 0.15rem;position: relative;
		  
		  a{
		  	  float: left;width: 25%;padding-top: 0.07rem;
		  	  
		  	  .logoIcon {
					  display: block;margin: 0 auto 0.06rem;width: 0.235rem;
					}
					
					span {
					  display: block;line-height: 1em;text-align: center;font-size: 0.1rem;color: #2f2f2f;
					}
		  }
		}
		
		.top-placeholder{
			background: #fff;margin-top: 0.26666667rem;
			
			.top-placeholder-inner{
				position: relative; height: 0.4rem; line-height: 0.4rem; color: #333; font-weight: bold;
				font-size: 0.2rem;text-align: center;
			}
			
			.top-placeholder-inner:before { 
				left: 0.5rem; content: '';position: absolute;top: 0.2rem;width: 1rem;height: 0;
    		font-size: 0;border-top: 0.005rem solid #333;transform: scaleY(0.5);
    	}
    	
    	.top-placeholder-inner:after { 
    		right: 0.5rem;content: '';position: absolute;top: 0.2rem;width: 1rem;height: 0;
    		font-size: 0;border-top: 0.005rem solid #333; transform: scaleY(0.5);
    	}
    	
    	ul{
    		li{
					position: relative;background-color: #fff;color: #666;padding: 0.15rem 0;border-bottom: 0.005rem solid #eee;list-style: none;
					font-size: 0.1rem;padding: 0.15rem 0;
				
				.index-top{
					display:flex;padding:0 0.15rem;
						
					.index-top-left{
						width: 0.65rem;height: 0.65rem;flex: none;
						
						img{
							width: 100%;height: 100%;border: 0.005rem solid rgba(0,0,0,.08);
						}
					}
					
					.index-top-right{
						display: flex;justify-content: space-between;overflow: hidden;padding-left: 0.1rem;
						
						.index-p-1{
							height: 0.2rem;
							
							h3{
								color: #333;font-weight: 700;font-size: 0.14rem;
								
								.index-i{
									position: relative;margin-right: 0.2rem;padding: 0.01rem 0.025rem;color: transparent;
    								text-align: center;white-space: nowrap;font-weight: 700;font-size: 0.08rem;font-style: normal;
    								top:-0.016rem;
								}
								
								.index-i:after{
									display: block;position: absolute;left: 0;top: 0;z-index: 1;content: attr(content);transform-origin: 0 0;
									padding: 0.025rem 0.01rem;color: #6f3f15; font-weight: 700;background-image: linear-gradient(-139deg,#fff100,#ffe339);
								}
							}
						}
						
						.index-p-2{
							position: absolute;display: flex;top:0.4rem;width: 0.6rem;
							
							.index-liang{
								position: absolute;overflow: hidden;top:-0.01rem;left:0.05rem;
							}
						}
						
						.index-wen{
							position: absolute;top:0.4rem;left:1.6rem;
						}
						
						.index-p-3{
							position: absolute;top:0.6rem;width: 75%;display: flex;justify-content: space-between;
						}
					}
				}
				
				.index-bottom{
					margin-left: 0.88rem;margin-top: 2%;
					
					.index-bottom-1{
						span{
							background-color: rgb(112, 188, 70);color: #fff;	
						}
					}
					
					.index-bottom-2{
						margin-top: 2%;
						
						span{
							background-color: rgb(241, 136, 79);color: #fff;
						}
					}
				}
			}
    	}
		}
	}
</style>