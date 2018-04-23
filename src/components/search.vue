<template>
	<div>
		<div id="searchBox">
				<a class="search-back-wrap" @click="backnow"></a>
            <input id="tipinput" type="input" placeholder="请输入商家或商品名称" v-model="data1" />
            <div id="clearSearchBtn" @click="del1">
                <div class="del">&#10005;</div>
            </div>
			<button class="btn" @click="searchnow">搜索</button>
        </div>
		<ul>
			<li v-for=" data in datalist1">
				<img :src="data.image_path.slice(data.image_path.length-3)=='png'?'https://fuss10.elemecdn.com'+'/'+ data.image_path.slice(0,1) + '/' +data.image_path.slice(1,3)+'/'+data.image_path.slice(3)+ '.png':'https://fuss10.elemecdn.com'+'/'+ data.image_path.slice(0,1) + '/' +data.image_path.slice(1,3)+'/'+data.image_path.slice(3)+ '.jpeg'"/>
				<div class="shop-txt">
						<p class="shop-name">
							<span>{{data.name}}</span>
						</p>
						<p class="shop-score">评价{{data.rating}}</p>
				</div>
			</li>
		</ul>
	</div>
	
</template>

<script>
import axios from "axios";
import router from '../router'
	export default{
		data () {
			return {
				data1:'',
				datalist1:[],
			}
		},
		methods:{
			backnow(){
				console.log(5555)
				router.push('/');
			},
			searchnow(){
				let _this = this;
					axios.get(`/restapi/shopping/v1/typeahead?kw=${this.data1}&latitude=29.53581&longitude=106.486032&city_id=44`,).then(function (res) { 
						console.log(res.data.restaurants);
						_this.datalist1 = res.data.restaurants;
					 }).catch(function (err) { 
						 console.log(err);
					  })
				},
				del1(){
          			this.data1 = ''
      			},
		}
	}
</script>

<style lang="scss" scoped>
 #searchBox {
     position: fixed;
     width: 60%;
     margin: 0 auto;
     left: -0.2rem;
     right: 0;
     z-index: 999;
     top: 0.15rem;
     height: 0.3rem;
 }
 
 #tipinput {
     width: 100%;
     height: 0.3rem;
     border: 1px solid #ccc;
     border-radius: 0.05rem;
     font-size: 0.16rem;
     line-height: 0.3rem;
     padding: 0 0.07rem;
     box-sizing: border-box;
 }
 
 #clearSearchBtn {
     position: absolute;
     right: 0;
     top: 0;
     margin: auto;
     width: 0.2rem;
     height: 0.2rem;
     padding: 0.05rem;
     text-align: center;
     vertical-align: middle;
     font-size: 0.14rem;
     color: #999;
 }
 
 #clearSearchBtn .del {
     background: #eee;
     border-radius: 0.12rem;
     width: 100%;
     height: 100%;
 }
 
 #page.searching #clearSearchBtn {
     display: none;
 }
 .search-back-wrap{
	position: absolute;
	top: 0.023rem;
	left: -0.4rem;
	width: 0.2rem;
	height:0.18rem;
	border: 0.02rem solid #333;
	border-width: 0 0 0.02rem 0.02rem ;
	-webkit-transform: rotate(45deg);
	-moz-transform: rotate(45deg);
	transform: rotate(45deg);
}
.btn{
	position: absolute;
	top: -0rem;
	right:-0.7rem; 
	text-align: center;
    width: 0.5rem;
    height: 0.3rem;
    line-height: 0.3rem;
    font-size: 0.14rem;
	border: none;
    color: #333;
    background: #FFD161;
    -webkit-border-radius: 0.02rem;
    -moz-border-radius:0.02rem;
    border-radius: 0.02rem;
}
ul{
	margin-top: 0.5rem;
	list-style: none;
	padding: 0 10%;
	li{
		display: flex;
		align-items: center;
		height: 0.8rem;
		line-height: 0.8rem;
		vertical-align: middle;
		justify-content: space-around;
		img{
			display: block;
			height: 0.5rem;
			width: 0.5rem;
		}
		.shop-txt{
			overflow: hidden;
			margin-left: 0.2rem;
			height: 0.35rem;
			line-height: 0.35rem;
			p{
				width: 1.5rem;
				font-size: 0.12rem;
				float: left;
			}
			.shop-score{
				width: 0.6rem;
				float: right;
			}
		}
	}
	li:hover{
		background: #f8f8f8;
	}
}
</style>
