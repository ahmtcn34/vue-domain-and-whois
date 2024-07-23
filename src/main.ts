import { createApp } from 'vue';
import './assets/css/tailwind.css';
import './style.css';
import 'vue3-toastify/dist/index.css';
import 'vue-skeletor/dist/vue-skeletor.css';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import App from './App.vue';
import { router } from '@/router/index';
const app = createApp(App);
app.use(router);
app.use(Vue3Toastify, {
  autoClose: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  theme: 'dark',
  position: 'top-right',
  transition: 'bounce',
  dangerouslyHTMLString:true
} as ToastContainerOptions);
app.mount('#app');
