import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import auth from './modules/auth';
import users from './modules/users';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        auth,
        users
    },
    plugins: [createPersistedState({
        paths: ['auth'],
    })],
});

// Восстановление токена авторизации
const token = store.state.auth.token;
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default store;
