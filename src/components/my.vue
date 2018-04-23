<template>
	<div class="my">
		<div class="ucenter-user">
			<img src="../assets/headpic.png" class="ucenter-usernimg" >
			<router-link to="/login/login-go" >
				<div class="ucenter-username">海底之心363<i class="iconfont icon-more"></i></div>	
			</router-link>	
		</div>
		<div class="ucenter-content">
			<div class="ucenter-content-item">
				<a href="##" class="ucenter-field ucenter-field-addr">收货地址管理<i class="iconfont icon-more"></i></a>
				<a href="##" class="ucenter-field ucenter-field-coupon">商家代金券<i class="iconfont icon-more"></i></a>
			</div>
			<div class="ucenter-content-item">
				<a href="##" class="ucenter-field ucenter-field-advice">意见反馈<i class="iconfont icon-more"></i></a>
				<a href="##" class="ucenter-field ucenter-field-problem">常见问题<i class="iconfont icon-more"></i></a>
			</div>
			<div class="service">
				<div class="service-wrap">
					<a href="##">客服电话：<label>101-097-77</label></a>
				</div>
			</div>
			<div class="service-time">服务时间：9:00-23:00</div>
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss" scoped>
*{
	margin: 0;
	padding: 0;
}
	.my{
		position: relative;
		min-height: 100%;
		background-color: #eee;
		color: #2f2f2f;
		.ucenter-user{
			height: 1.6rem;
			background: url('//xs01.meituan.net/waimai_i/img/user-banner.8c03fc75.png') no-repeat center;
			background-size: cover;
			position: relative;
			img{
				width: 0.72rem;
				height: 0.72rem;
				border: 3px solid rgba(255,255,255,0.4);
				border-radius: 50%;
				position: absolute;
				top: 0.28rem;
				left: 50%;
				margin-left: -0.36rem;
			}
			.ucenter-username{
				font-size: 0.16rem;
				color: #333333;
				padding-top: 1.18rem;
				padding-left: 0.24rem;
				text-align: center;
				i{
					margin-top: 0.02rem;
					width: 0.06rem;
					display: inline-block;
					text-indent: -0.09rem;
					font-size: 0.12rem;
					margin-left: 0.12rem;
					color: #333;
				}
			}
		}
		.ucenter-content{
			background: #ffffff;
			.ucenter-content-item{
				border-bottom: 0.1rem solid #eee;
				.ucenter-field-addr{
					background-image: url("//xs01.meituan.net/waimai_i/img/user-addr-icon.192fb37b.png");
					
				}
				.ucenter-field-coupon{
					background-image: url("//xs01.meituan.net/waimai_i/img/user-coupon-icon.0e96acbe.png");
				}
				.ucenter-field-advice{
					background-image: url("//xs01.meituan.net/waimai_i/img/user-advice-icon.58a5f6d2.png");
				}
				.ucenter-field-problem{
					background-image: url("//xs01.meituan.net/waimai_i/img/user-problem-icon.df29eb73.png");
				}
			}
			.service{
			    height: 0.45rem;
				line-height: 0.45rem;
				margin-top: 0;
				font-size: 0.14rem;
				.service-wrap{
					text-align: center;
					font-size: 0.14rem;
					a{
						font-size: 0.15rem;
						color: #ffb000;
						
					}
				}
			}
			.service-time{
				background: #eee;
				padding-top: 0.08rem;
				text-align: center;
				font-size: 0.14rem;
				color: #999;
			}
		}		
	}
a{
	text-decoration: none;
	outline: none;
}
.ucenter-field{
	font-size: 0.14rem;
    display: block;
    height: 0.44rem;
    line-height: 0.44rem;
    background: #fff no-repeat left center;
    -webkit-background-size: 0.16rem;
    background-size: 0.16rem;
    border-bottom: 1px solid #E4E4E4;
    color: #333;
    margin-left: 0.15rem;
    padding-right: 0.09rem;
	padding-left: 0.27rem;
	i{
		float: right ;
		height: 0.4rem;
		line-height: 0.44rem;
		font-size: 0.12rem;
		color: #aaa;
	}
}
</style>

