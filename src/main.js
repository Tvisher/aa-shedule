import { createApp } from 'vue';
import { createPinia } from 'pinia';
import '@vuepic/vue-datepicker/dist/main.css';
import 'vue-skeletor/dist/vue-skeletor.css';
// if (import.meta.env.DEV) {
import('./assets/css/aos.css');
import('./assets/css/fancybox.css');
import('./assets/css/main.min.css');
import('./assets/css/normalize.min.css');
import('./assets/css/overlayscrollbars.min.css');
import('./assets/css/plyr.css');
import('./assets/css/swiper-bundle.css');
// }
import './style.scss'
import App from './App.vue'

createApp(App)
    .use(createPinia())
    .mount('#modalApp')
