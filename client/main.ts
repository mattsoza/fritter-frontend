import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ToggleSwitch from 'vuejs-toggle-switch';
import Notifications from 'vue-notification';
import HangmanGame from 'vue-games';

import FreetPageComponent from '@/components/Pages/FreetPageComponent.vue';
import FreetComponent from '@/components/Freet/FreetComponent.vue';

Vue.config.productionTip = false;

Vue.component('FreetPageComponent', FreetPageComponent);
Vue.component('FreetComponent', FreetComponent);

Vue.use(ToggleSwitch);
Vue.use(Notifications);
Vue.use(HangmanGame);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
