<template>
    <v-container fluid>
        <v-card>
            <v-card-title>
                Пользователи
                <v-spacer />
                <v-btn color="primary" @click="exportToExcel">
                    Экспорт в Excel
                </v-btn>
            </v-card-title>

            <v-data-table
                :headers="headers"
                :items="users"
                :items-per-page="perPage"
                :page.sync="page"
                :server-items-length="total"
                :loading="loading"
                class="elevation-1"
                loading-text="Загрузка пользователей..."
                @update:page="onPageChange"
                :footer-props="{ itemsPerPageOptions: [] }"
            >
                <template #item.actions="{ item }">
                    <v-icon small class="mr-2" @click="editUser(item)">
                        mdi-pencil
                    </v-icon>
                    <v-icon small color="red" @click="deleteUser(item.id)">
                        mdi-delete
                    </v-icon>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Редактировать пользователя</span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="editedUser.last_name" label="Фамилия" />
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="editedUser.first_name" label="Имя" />
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="editedUser.middle_name" label="Отчество" />
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="editedUser.phone" label="Телефон" />
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="editedUser.email" label="Email" />
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer />
                    <v-btn color="blue darken-1" text @click="dialog = false">Отмена</v-btn>
                    <v-btn color="blue darken-1" text @click="saveUser">Сохранить</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import userApiService from '../api/users';

export default {
    name: 'Dashboard',

    data() {
        return {
            dialog: false,
            editedUser: {
                id: null,
                last_name: '',
                first_name: '',
                middle_name: '',
                phone: '',
                email: '',
            },
            headers: [
                { text: 'ID', value: 'id', sortable: false },
                { text: 'Фамилия', value: 'last_name', sortable: false },
                { text: 'Имя', value: 'first_name', sortable: false },
                { text: 'Отчество', value: 'middle_name', sortable: false },
                { text: 'Телефон', value: 'phone', sortable: false },
                { text: 'Email', value: 'email', sortable: false },
                { text: 'Действия', value: 'actions', sortable: false },
            ],
        };
    },

    computed: {
        users() {
            return this.$store.getters['users/allUsers'];
        },
        loading() {
            return this.$store.getters['users/isLoading'];
        },
        total() {
            return this.$store.getters['users/totalUsers'];
        },
        perPage() {
            return this.$store.getters['users/perPage'];
        },
        page: {
            get() {
                return this.$store.getters['users/currentPage'];
            },
            set(val) {
                this.$store.commit('users/SET_CURRENT_PAGE', val);
            },
        },
    },

    methods: {
        async onPageChange(page) {
            await this.$store.dispatch('users/fetchUsers', { page });
        },
        async deleteUser(id) {
            if (confirm('Вы уверены, что хотите удалить пользователя?')) {
                await this.$store.dispatch('users/deleteUser', id);
            }
        },
        editUser(user) {
            this.editedUser = { ...user };
            this.dialog = true;
        },
        async saveUser() {
            const { id, ...data } = this.editedUser;
            await this.$store.dispatch('users/updateUser', { id, data });
            this.dialog = false;
        },
        async exportToExcel() {
            try {
                await userApiService.exportUsersExcel();
                console.log('Экспорт успешно выполнен');
            } catch (error) {
                console.error('Ошибка при экспорте', error);
                // можно показать пользователю уведомление об ошибке
            }
        },
    },

    mounted() {
        this.$store.dispatch('users/fetchUsers');
    },
};
</script>
