<template>
    <div>
        <!-- 搜索框-->
        <div id="searchBox">
            <input id="tipinput" type="input" placeholder="请输入关键字搜索" v-model="adress" />
            <div id="clearSearchBtn" @click="del1">
                <div class="del">&#10005;</div>
            </div>
        </div>
        <!-- 地图 -->
       
             <baidu-map class="bm-view" ak="LRSCvPxgT0U5RV6FuGrc5IRwyaW11nrY" :zoom="15"  center='重庆' >
                 <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"  ></bm-navigation>
                 <bm-local-search :keyword="adress" :auto-viewport="true"></bm-local-search>
           <bm-geolocation anchor="BMAP_ANCHOR_TOP_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
        </baidu-map>
       
    </div>
        
</template>
<script>
import BaiduMap from 'vue-baidu-map/components/Map/Map.vue'
import {BmGeolocation} from 'vue-baidu-map'
import {BmLocalSearch} from 'vue-baidu-map'
import {BmNavigation} from 'vue-baidu-map'
export default {
    data () {
        return {
            adress:'',
        }
    },
  components: {
    BaiduMap,
    BmGeolocation,
    BmLocalSearch,
    BmNavigation,
  },
  methods: {
      del1(){
          this.adress = ''
      },
  }
}
</script>
 
<style lang="scss" scoped>
.bm-view {
  width: 100%;
  height: 8rem;
  overflow: hidden;
}
 #searchBox {
     position: fixed;
     width: 70%;
     margin: 0 auto;
     left: 0;
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
 


</style>
