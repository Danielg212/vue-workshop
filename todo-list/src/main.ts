import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

import HeaderComponent from '@/components/layout/Header.vue';
import '@/assets/styles/styles.scss';

Vue.config.productionTip = false

Vue.component('tl-header', HeaderComponent);
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
