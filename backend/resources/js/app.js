import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import router from './router';
import store from './store';

import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';

// Подключаем Vuetify плагин к Vue
Vue.use(Vuetify);

// Создаём экземпляр Vuetify
const vuetify = new Vuetify();

new Vue({
    router,
    vuetify,
    store,
    render: h => h(App)
}).$mount('#app');
