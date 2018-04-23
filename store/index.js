import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { Indicator } from 'mint-ui';

Vue.use(Vuex);//注册

const store = new Vuex.Store({
	state:{
		indexList:[],
		tianList:[]
	},
	
	
	actions:{
		getIndexList(state){
			axios.get("/restapi/shopping/v3/restaurants?latitude=29.502272&longitude=106.510676&offset=0&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&rank_id=&terminal=h5").then(res => {			
				store.commit("changeIndexList",res.data.items);
			});
		}
	},
	
	mutations:{
		changeIndexList(state,payload){
			state.indexList = payload;
			
			//console.log(payload);
			Indicator.close();
		}
	},
	
	getters:{
		
	}
});

export default store;
