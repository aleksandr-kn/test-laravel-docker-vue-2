<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <v-toolbar-title>Elcom Laravel Vue</v-toolbar-title>

            <v-spacer />

            <v-btn icon @click="logout" title="Выйти">
                <v-icon>mdi-logout</v-icon>
            </v-btn>
        </v-app-bar>

        <v-main>
            <v-container fluid>
                <router-view />
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: 'DefaultLayout',
    methods: {
        async logout() {
            try {
                await this.$store.dispatch('auth/logout');
            } finally {
                this.$router.push('/login').catch(() => {});
            }
        }
    }
};
</script>
