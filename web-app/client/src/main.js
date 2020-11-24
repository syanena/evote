import "@babel/polyfill";
import ES6Promise from "es6-promise";
ES6Promise.polyfill();

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js';

import axios from "axios";

import "@/plugins/echarts";

//slider
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
//import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */ )



import Vuetify from "vuetify";
import VTooltip from 'v-tooltip'

import "vuetify/dist/vuetify.min.css";
import "vuetify/dist/vuetify.min.js";
import "material-design-icons-iconfont/dist/material-design-icons.css";
//Vue.use(Vuetify)


// MODAL
import vmodal from "vue-js-modal";
Vue.use(vmodal);
Vue.use(Vuetify);
Vue.use(VTooltip);
Vue.directive('tooltip', VTooltip.VTooltip)
Vue.directive('close-popover', VTooltip.VClosePopover)
Vue.component('v-popover', VTooltip.VPopover)
// Vue.prototype.$axios = axios


Vue.config.productionTip = false

new Vue({
  vuetify: new Vuetify(),
  render: function (h) { return h(App) },
  router,
  store
}).$mount('#app')

