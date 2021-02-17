import { createApp } from 'vue'
// import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { VueMaskDirective } from 'v-mask'


createApp(App)
    .use(store)
    .directive('mask', VueMaskDirective) 
    .mount('#app');
    // Vue.use(VueMask)