import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';

import store from './store/store';
import cli from './components/cli.vue';

Vue.use(VueResource);
Vue.url.options.params.base = 'localhost:3000';

Vue.component('cli', cli);

new Vue ({
	store,
	el: '#app',
	render: h => h(App)
});
