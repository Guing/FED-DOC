import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import user from './modules/user';
import caseInfomation from './modules/caseInfomation.js';

const store = ()=> new Vuex.Store({
  	modules: {
	  	user,
      	caseInfomation
  	}
});

export default store;
