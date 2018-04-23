 <template>
	<div>
		<div class="category">
			<ul class="foodKinds">
				<li v-for="data,index in foodList" :key="data.id" v-if="data.name!='全部商家'" @click="getIndex(index)">
					<span :class="current==index?'active':''">{{data.name}}</span>
					<span>{{data.count}}</span>
				</li>
			</ul>
			<ul class="allKinds">
				<li v-for="data,index in foodList[current].sub_categories" :key="data.id" @click="getKindsIndex(index)">
					<span class="img"><img :src="getSrc(data.image_url)"/></span>
					<span :class="kindsCur==index?'allMenu':''">{{data.name}}</span>
					<span>{{data.count}}</span>
				</li>
			</ul>
		</div>
		<div class="mask"></div>
	</div>

</template>

<script type="text/javascript">	
	import axios from "axios";
	import { Indicator } from 'mint-ui';
	export default {
		data(){
		    return {
		    	foodList:[],
		    	current:1,
		    	kindsCur:0
		    }
		},
		mounted(){
			Indicator.open('加载中...');
	  		Promise.all([axios.get("/restapi/shopping/v2/restaurant/category?latitude=29.53571&longitude=106.48629")
			]).then(res=>{
				this.foodList = res[0].data;
				Indicator.close();
			}).catch(err=>{
	  			console.log(err);
	  		})
		},
		methods:{
			getSrc(src){
				if(src.slice(-3)=='png'){
					return 'https://fuss10.elemecdn.com/'+ src.slice(0,1) + '/' + src.slice(1,3)+'/'+src.slice(3)+'.png'
				}else{
					return 'https://fuss10.elemecdn.com/'+ src.slice(0,1) + '/' + src.slice(1,3)+'/'+src.slice(3)+ '.jpeg'
				}
			},
			getIndex(index){
				console.log(this.foodList[this.current],this.current);
				this.current = index;
				this.kindsCur = 0;
			},
			getKindsIndex(index){
				Indicator.open('加载中...');
				this.kindsCur = index;

			  	Promise.all([axios.get(`/restapi/shopping/v3/restaurants?latitude=29.53571&longitude=106.48629&keyword=&offset=0&limit=8&extras[]=activities&extras[]=tags&terminal=h5&rank_id=&restaurant_category_ids[]=${this.foodList[this.current].ids[index]}`)
  				]).then(res=>{
  					//console.log(res[0].data.items);
  					//console.log(this.foodList[this.current])
  					//console.log(this.foodList[this.current].ids[index])
  					this.$store.commit("kerwinList",res[0].data.items);
  					this.$store.commit("kerwinCategory",!this.$store.state.isShowCategor);
  					Indicator.close();
  				}).catch(err=>{
  		  			console.log(err);
  		  		})
			}
		}
	}

</script>

<style type="text/css" lang="scss" scoped>
	.category{
		position: absolute;
		left: 0;
		top: 0.85rem;
		z-index: 9;
		width: 100%;
		height: 3.4rem;
		font-size: 0.14rem;
		color: #666;
		background: #fff;
		display: flex;
		.foodKinds{
			overflow: auto;
			li{
				width: 1.2rem;
				line-height: 0.47rem;
				padding-right: 0.1rem;
				border-bottom: 1px solid #f5f5f5;
				span:nth-of-type(1){
					padding-left: 0.2rem;
				}
				span:nth-of-type(2){
					float:right;
					font-size: 0.12rem;
				}
				.active{
					border-left: 0.04rem solid #2395ff;
				}
			}
		}
		.allKinds{
			flex: 1;			
			overflow: auto;
			li{
				padding: 0 0.15rem 0 0.2rem;
				line-height: 0.47rem;
				border-bottom: 1px solid #fff;
				.img{
					display: inline-block;
					width: 0.37rem;
					height: 0.37rem;
					vertical-align: middle;
					img{
						width: 100%;
						height: 100%;
					}
				}
				span:nth-of-type(3){
					float: right;
					font-size: 0.12rem;
				}
				.allMenu{
					font-weight: 800;
					color: #2395ff;
				}
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