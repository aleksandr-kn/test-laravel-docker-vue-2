import axios from 'axios';

const state = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

const getters = {
    isAuthenticated: state => state.isAuthenticated,
    isLoading: state => state.isLoading,
    authError: state => state.error,
    currentUser: state => state.user,
    userToken: state => state.token,
    userName: state => state.user?.name || '',
    userEmail: state => state.user?.email || '',
};

const mutations = {
    AUTH_REQUEST(state) {
        state.isLoading = true;
        state.error = null;
    },
    AUTH_SUCCESS(state, { user, token }) {
        state.isLoading = false;
        state.user = user;
        state.token = token;
        state.isAuthenticated = true;
    },
    AUTH_ERROR(state, error) {
        state.isLoading = false;
        state.error = error;
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
    },
    LOGOUT(state) {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
    }
};

const actions = {
    async login({ commit }, credentials) {
        commit('AUTH_REQUEST');
        try {
            const response = await axios.post('/api/login', credentials);
            const { token, user } = response.data;
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            commit('AUTH_SUCCESS', { user, token });
        } catch (err) {
            commit('AUTH_ERROR', err.response?.data?.message || 'Login failed');
        }
    },
    async logout({ commit }) {
        try {
            await axios.post('/api/logout');
        } finally {
            delete axios.defaults.headers.common['Authorization'];
            commit('LOGOUT');
        }
    },
    async fetchUser({ commit }) {
        commit('AUTH_REQUEST');
        try {
            const response = await axios.get('/api/user');
            commit('AUTH_SUCCESS', { user: response.data, token: state.token });
        } catch (err) {
            commit('AUTH_ERROR', err.response?.data?.message || 'Fetch user failed');
        }
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
