import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
	state:{
		datalist:[],
		isShowCategor:false
	},
	mutations:{
		kerwinList(state,payload){
			//console.log(payload);
			state.datalist = payload;
		},
		kerwinCategory(state,payload){
			state.isShowCategor = payload;
		}
	}
})

export default store;