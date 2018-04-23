<template>
	<div id = "tian">
		<ul v-if = "datalist"  v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<li v-for = "data in datalist">
				<div class="tian-top">
					<div class="tian-top-left">
						<img :src="data.restaurant.image_path.slice(data.restaurant.image_path.length-3)==='png'?'https://fuss10.elemecdn.com'+'/'+ data.restaurant.image_path.slice(0,1) + '/' +data.restaurant.image_path.slice(1,3)+'/'+data.restaurant.image_path.slice(3)+ '.png':'https://fuss10.elemecdn.com'+'/'+ data.restaurant.image_path.slice(0,1) + '/' +data.restaurant.image_path.slice(1,3)+'/'+data.restaurant.image_path.slice(3)+ '.jpeg'"/>
					</div>
					<div class="tian-top-right">
						<section class="tian-p-1">
							<h3>
								<!--有问题-->
								<i content="品牌" class="tian-i" v-if="data.restaurant.is_premium"></i>
								{{data.restaurant.name}}
							</h3>
						</section>

						<section class="tian-p-2">
							<div class="tian-hui">
								<img :src="hui"/>
							</div>
							
							<div class="tian-liang" :style="{'width':data.restaurant.rating/5*100 + '%'}">
								<img :src="liang"/>
							</div>
						</section>
						
						<div class="tian-wen">
							<span>{{data.restaurant.rating}} 月售{{data.restaurant.recent_order_num}}单</span>
						</div>
						
						<section class="tian-p-3">
							<div class="tian-p-3-left">
								￥{{data.restaurant.float_minimum_order_amount}}起送 夜间配送费￥{{data.restaurant.float_delivery_fee}}
							</div>
						
							<div class="tian-p-3-right">
								{{data.restaurant.distance}}m|{{data.restaurant.order_lead_time}}分钟
							</div>
						</section>
					</div>
				</div>
				
				<div class="tian-bottom">
					<p class="tian-bottom-1"><span>{{data.restaurant.activities[0].icon_name}}</span> {{data.restaurant.activities[0].tips}}</p>
					<p class="tian-bottom-2" v-if="data.restaurant.activities[1]"><span>{{data.restaurant.activities[1].icon_name}}</span> {{data.restaurant.activities[1].tips}}</p>
				</div>
			</li>
		</ul>
		
		<div class="tian-height"></div>
	</div>
</template>

<script type="text/javascript" charset="UTF-8">
	import axios from "axios";
	import { InfiniteScroll } from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import Vue from "vue";
	Vue.use(InfiniteScroll);
	
	export default{
		data(){
			return {
				datalist:null,
				loading:false,
	  			current:0,
	  			total:740,
				hui:'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTU0LjAxNyA4LjA3MmwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMNTMuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0tNDggMEwzLjQ2NSA5LjYzM2MtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w1LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBMNy41NSAzLjM1MmwyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNkw4LjQ5NyA2LjI2OWwuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0xMiAwbC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0wxNy42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bTEyIDBsLTIuNTUyIDEuNTYxYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDI5LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBsMS4xNDYgMi43NjMgMi45ODIuMjM3Yy41NTYuMDQ0LjY3LjM2OC4yNC43MzZsLTIuMjc0IDEuOTQ0LjY5NiAyLjkxYy4xMy41NDItLjE0My43NS0uNjI2LjQ1NGwtMi41NTEtMS41NnptMTIgMGwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMNDEuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2eiIgZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+',
				liang:'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIwJSIgeTE9IjUwJSIgeTI9IjUwJSIgaWQ9ImEiPjxzdG9wIHN0b3AtY29sb3I9IiNGRkRFMDAiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjRkZCMDAwIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNNTQuMDE3IDguMDcybC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w1My42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bS00OCAwTDMuNDY1IDkuNjMzYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDUuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMEw3LjU1IDMuMzUybDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2TDguNDk3IDYuMjY5bC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bTEyIDBsLTIuNTUyIDEuNTYxYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDE3LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBsMS4xNDYgMi43NjMgMi45ODIuMjM3Yy41NTYuMDQ0LjY3LjM2OC4yNC43MzZsLTIuMjc0IDEuOTQ0LjY5NiAyLjkxYy4xMy41NDItLjE0My43NS0uNjI2LjQ1NGwtMi41NTEtMS41NnptMTIgMGwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMMjkuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0xMiAwbC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w0MS42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6IiBmaWxsPSJ1cmwoI2EpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4='
			}
		},
		
		mounted(){
			Indicator.open('加载中...'); 
			
			axios.get("/restapi/shopping/v3/restaurants?latitude=29.561669&longitude=106.467008&keyword=&offset=0&limit=8&extras[]=activities&extras[]=tags&terminal=h5&brand_ids[]=&restaurant_category_ids[]=212&restaurant_category_ids[]=234&restaurant_category_ids[]=235&restaurant_category_ids[]=237&restaurant_category_ids[]=238&restaurant_category_ids[]=240&restaurant_category_ids[]=241&restaurant_category_ids[]=242&restaurant_category_ids[]=245&restaurant_category_ids[]=249&restaurant_category_ids[]=250&restaurant_category_ids[]=273&restaurant_category_ids[]=211&restaurant_category_ids[]=229&restaurant_category_ids[]=230").then(res => {
	  			//console.log(res.data.items);
	  			this.datalist = res.data.items;
	  			
	  			Indicator.close();
	  		});
		},
		
		methods:{ 
			loadMore() { 
				Indicator.open('加载中...'); 
				
				if(this.current > this.total){ 
					return; 
				} 
				
				this.current = this.current + 1; 
				
				axios.get("/restapi/shopping/v3/restaurants?latitude=29.561669&longitude=106.467008&keyword=&offset=740&limit=8&extras[]=activities&extras[]=tags&terminal=h5&brand_ids[]=&restaurant_category_ids[]=212&restaurant_category_ids[]=234&restaurant_category_ids[]=235&restaurant_category_ids[]=237&restaurant_category_ids[]=238&restaurant_category_ids[]=240&restaurant_category_ids[]=241&restaurant_category_ids[]=242&restaurant_category_ids[]=245&restaurant_category_ids[]=249&restaurant_category_ids[]=250&restaurant_category_ids[]=273&restaurant_category_ids[]=211&restaurant_category_ids[]=229&restaurant_category_ids[]=230").then(res => {
					//console.log(res.data.items); 
					this.datalist = [...this.datalist,...res.data.items]; 
					
					Indicator.close();
				}); 
			} 
		}
	}
	///restapi/shopping/v3/restaurants?latitude=29.561669&longitude=106.467008&keyword=&offset=0&limit=8&extras[]=activities&extras[]=tags&terminal=h5&brand_ids[]=&restaurant_category_ids[]=212&restaurant_category_ids[]=234&restaurant_category_ids[]=235&restaurant_category_ids[]=237&restaurant_category_ids[]=238&restaurant_category_ids[]=240&restaurant_category_ids[]=241&restaurant_category_ids[]=242&restaurant_category_ids[]=245&restaurant_category_ids[]=249&restaurant_category_ids[]=250&restaurant_category_ids[]=273&restaurant_category_ids[]=211&restaurant_category_ids[]=229&restaurant_category_ids[]=230
</script>

<style lang="scss" scoped="scoped">
	#tian{	
		ul{
			li{
				position: relative;background-color: #fff;color: #666;padding: 0.15rem 0;border-bottom: 0.005rem solid #eee;list-style: none;
				font-size: 0.1rem;padding: 0.15rem 0;
				
				.tian-top{
					display:flex;padding:0 0.15rem;
						
					.tian-top-left{
						width: 0.65rem;height: 0.65rem;flex: none;
						
						img{
							width: 100%;height: 100%;border: 0.005rem solid rgba(0,0,0,.08);
						}
					}
					
					.tian-top-right{
						display: flex;justify-content: space-between;overflow: hidden;padding-left: 0.1rem;
						
						.tian-p-1{
							height: 0.2rem;
							
							h3{
								color: #333;font-weight: 700;font-size: 0.14rem;
								
								.tian-i{
									position: relative;margin-right: 0.2rem;padding: 0.01rem 0.025rem;color: transparent;
    								text-align: center;white-space: nowrap;font-weight: 700;font-size: 0.08rem;font-style: normal;
    								top:-0.016rem;
								}
								
								.tian-i:after{
									display: block;position: absolute;left: 0;top: 0;z-index: 1;content: attr(content);transform-origin: 0 0;
									padding: 0.025rem 0.01rem;color: #6f3f15; font-weight: 700;background-image: linear-gradient(-139deg,#fff100,#ffe339);
								}
							}
						}
						
						.tian-p-2{
							position: absolute;display: flex;top:0.4rem;width: 0.6rem;
							
							.tian-liang{
								position: absolute;overflow: hidden;
							}
						}
						
						.tian-wen{
							position: absolute;top:0.4rem;left:1.6rem;
						}
						
						.tian-p-3{
							position: absolute;top:0.6rem;width: 70%;display: flex;justify-content: space-between;
						}
					}
				}
				
				.tian-bottom{
					margin-left: 0.88rem;margin-top: 2%;
					
					.tian-bottom-1{
						span{
							background-color: rgb(112, 188, 70);color: #fff;	
						}
					}
					
					.tian-bottom-2{
						margin-top: 2%;
						
						span{
							background-color: rgb(241, 136, 79);color: #fff;
						}
					}
				}
			}
		}
	}
	
	.tian-height{
		height: 0.3rem;
	}
</style>