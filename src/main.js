import Vue from 'vue';
import App from './App.vue';

import store from './store/store';
import cli from './components/cli.vue'

Vue.component('cli', cli);

new Vue({
	store,
	el: '#app',
	render: h => h(App)
});
