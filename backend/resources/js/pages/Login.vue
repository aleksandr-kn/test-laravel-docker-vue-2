<template>
    <v-container
        fill-height
        fluid
        class="d-flex justify-center align-center"
    >
        <v-card
            class="pa-6"
            max-width="400"
            outlined
        >
            <v-card-title class="justify-center">Войти</v-card-title>

            <v-form @submit.prevent="submitLogin">
                <v-text-field
                    v-model="email"
                    label="Email"
                    type="email"
                    :rules="[rules.required, rules.email]"
                    required
                />

                <v-text-field
                    v-model="password"
                    label="Пароль"
                    type="password"
                    :rules="[rules.required]"
                    required
                />

                <v-btn
                    type="submit"
                    color="primary"
                    :loading="isLoading"
                    :disabled="isLoading"
                    block
                    class="mt-4"
                >
                    Войти
                </v-btn>

                <v-alert
                    v-if="authError"
                    type="error"
                    dense
                    class="mt-3"
                >
                    {{ authError }}
                </v-alert>
            </v-form>
        </v-card>
    </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            rules: {
                required: v => !!v || 'Обязательное поле',
                email: v => /.+@.+\..+/.test(v) || 'Некорректный email',
            },
        };
    },
    computed: {
        ...mapState('auth', ['isLoading', 'error']),
        authError() {
            return this.error;
        },
    },
    methods: {
        ...mapActions('auth', ['login']),
        async submitLogin() {
            if (!this.email || !this.password) return;

            try {
                await this.login({ email: this.email, password: this.password });
                this.$router.push({ name: 'dashboard' }).catch(() => {});
            } catch {
                // Ошибка обрабатывается в store
            }
        },
    },
};
</script>
