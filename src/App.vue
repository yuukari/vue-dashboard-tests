<template>
    <PageHeader/>
    <router-view/>
</template>

<script setup>
import PageHeader from '@/components/common/PageHeader.vue';
</script>

<style>
body {
    font-family: v-sans, v-mono, sans-serif;
}
</style>