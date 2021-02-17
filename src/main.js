// import Vue from 'vue'

import { createApp, ref } from 'vue'
import App from './App.vue'
import store from './store'
import Equal from 'equal-vue'
import 'equal-vue/dist/style.css'
// import { ref, createApp } from 'vue'
import VueSelect from 'vue-next-select'
// import 'equal-vue/dist/equal.css'
// import * as mdb from 'mdb-vue-ui-kit'; // lib
// import { Input } from 'mdb-ui-kit'; // module
// import 'mdb-vue-ui-kit/css/mdb.min.css'
// import VueEvaInput from 'vue-eva-input'
// import PhoneInput from "./components/PhoneInput.vue"
const app = createApp(App);
// app.config = 
    app.use(store)
    .use(Equal)
    .use(ref)
    .component('vue-select', VueSelect)
    // .use(PhoneInput)
    // .component('phone-input', PhoneInput)
    .directive('phone', {
        beforeMount(el) {
          el.oninput = function validReg(e) {
            if (!e.isTrusted) {
              return
            }
      
            const x = this.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/)
    
            if (!x[2] && x[1] !== '') {
              this.value = x[1] === '8' ? x[1] : '8' + x[1]
            } else {
                this.value = !x[3] ? x[1] + x[2] : x[1] + '(' + x[2] + ')' + x[3] + (x[4] ? '-' + x[4] : '')
            }
          }
        

        el.onblur = function validReg(e) {
          if (!e.isTrusted) {
            return
          }
    
          const x = this.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/)
  
          if (!x[2] && x[1] !== '') {
            this.value = x[1] === '8' ? x[1] : '8' + x[1]
          } else {
              this.value = !x[3] ? x[1] + x[2] : x[1] + '(' + x[2] + ')' + x[3] + (x[4] ? '-' + x[4] : '')
          }
        }
      }
      })
    .mount('#app');
