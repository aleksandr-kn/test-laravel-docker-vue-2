import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index';
import Login from '../pages/Login.vue';
import Dashboard from '../pages/Dashboard.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: { guest: true, layout: 'empty' }
        },
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard,
            meta: { requiresAuth: true, layout: 'default' }
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
});

// Защита маршрутов, проверяем наличие авторизации
router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters['auth/isAuthenticated'];

    if (to.matched.some(record => record.meta.requiresAuth)) {
        // Если не авторизованы, редиректим на страницу Логина
        if (!isAuthenticated) {
            next({ name: 'login' });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        // Если уже авторизованы, редиректим на Dashboard
        if (isAuthenticated) {
            next({ name: 'dashboard' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
