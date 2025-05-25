import api from './api';

export default {
    async fetchUsers({ page = 1, perPage = 10 }) {
        const response = await api.get('/users', {
            params: {
                page,
                per_page: perPage,
            },
        });

        return response.data;
    },

    async deleteUser(id) {
        return await api.delete(`/users/${id}`);
    },

    async updateUser(id, data) {
        return await api.put(`/users/${id}`, data);
    },

    async exportUsersExcel() {
        const response = await api.get('/users/export', {
            responseType: 'blob',
            withCredentials: true,
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'users.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    },
};
