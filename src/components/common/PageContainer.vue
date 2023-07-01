<template>
    <div class="page-container" :class="{ 'page-container_initial-margin': initialMargin }">
        <slot name="content"/>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'PageContainer',
    props: {
        initialMargin: {
            type: Boolean,
            default: () => false
        }
    }
});
</script>

<style scoped>
.page-container {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0px 20px;
    box-sizing: border-box;
}

.page-container_initial-margin {
    margin-top: 50px;
}
</style>