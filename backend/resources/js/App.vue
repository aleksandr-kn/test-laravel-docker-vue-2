<template>
    <component :is="layout">
        <router-view />
    </component>
</template>

<script>
import DefaultLayout from './components/layouts/DefaultLayout.vue';
import EmptyLayout from './components/layouts/EmptyLayout.vue';

export default {
    name: 'App',
    components: { DefaultLayout, EmptyLayout },
    computed: {
        layout() {
            const layout = this.$route.meta.layout || 'default';
            return layout === 'empty' ? 'EmptyLayout' : 'DefaultLayout';
        }
    }
};
</script>

<style>
html, body, #app {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
}
</style>
