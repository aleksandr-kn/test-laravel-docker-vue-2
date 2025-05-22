import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

// Подключаем Vuetify плагин к Vue
Vue.use(Vuetify);

// Импортируем компонент
import ExampleComponent from './components/ExampleComponent.vue';

// Создаём экземпляр Vuetify
const vuetify = new Vuetify();

const app = new Vue({
    el: '#app',
    vuetify,
    components: {
        ExampleComponent
    }
});
