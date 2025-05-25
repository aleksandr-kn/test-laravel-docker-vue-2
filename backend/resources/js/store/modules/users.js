import api from '../../api/users';

export default {
    namespaced: true,

    state: {
        users: [],
        total: 0,
        perPage: 10,
        currentPage: 1,
        loading: false,
    },

    getters: {
        allUsers: (state) => state.users,
        totalUsers: (state) => state.total,
        perPage: (state) => state.perPage,
        currentPage: (state) => state.currentPage,
        isLoading: (state) => state.loading,
        totalPages: (state) => Math.ceil(state.total / state.perPage),
    },

    mutations: {
        SET_USERS(state, users) {
            state.users = users;
        },
        SET_TOTAL(state, total) {
            state.total = total;
        },
        SET_CURRENT_PAGE(state, page) {
            state.currentPage = page;
        },
        SET_LOADING(state, status) {
            state.loading = status;
        },
    },

    actions: {
        async fetchUsers({ commit, state }, { page = 1, perPage = null } = {}) {
            commit('SET_LOADING', true);
            try {
                const data = await api.fetchUsers({
                    page,
                    perPage: perPage || state.perPage,
                });

                commit('SET_USERS', data.data);
                commit('SET_TOTAL', data.meta.total);
                commit('SET_CURRENT_PAGE', data.meta.current_page);
            } finally {
                commit('SET_LOADING', false);
            }
        },

        async deleteUser({ dispatch, state }, id) {
            await api.deleteUser(id);
            const newPage = state.users.length === 1 && state.currentPage > 1
                ? state.currentPage - 1
                : state.currentPage;
            await dispatch('fetchUsers', { page: newPage });
        },

        async updateUser({ dispatch, state }, { id, data }) {
            await api.updateUser(id, data);
            await dispatch('fetchUsers', { page: state.currentPage });
        },
    },
};
