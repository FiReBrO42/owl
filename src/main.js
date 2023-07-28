
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 匯入 material icons
import 'material-icons/iconfont/material-icons.css';
// 匯入bootstrap
import './assets/all.scss'

// 匯入 vue-axios
import axios from 'axios'
import VueAxios from 'vue-axios'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
const options = {
  confirmButtonColor: '#BB8D74',
  cancelButtonColor: '#919191',
};


import App from './App.vue'
import router from './router'

const app = createApp(App)

// 插件引入axios VueAxios
app.use(VueAxios, axios)
app.use(createPinia())
app.use(VueSweetalert2,options);
app.use(router)

router.beforeEach((to, from, next) => {
    const background = to.meta.background;
    
    if (background) {
      document.getElementById('app').style.backgroundImage = `url(${background})`;
    } else {
      document.getElementById('app').style.backgroundImage = '';
    }
    next();
  });

app.mount('#app')

