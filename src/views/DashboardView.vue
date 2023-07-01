<template>
    <PageContainer initial-margin>
        <template #content>
            <n-h1>Главная</n-h1>

            <DashboardStatistics/>
        </template>
    </PageContainer>
</template>

<script>
import { NH1 } from 'naive-ui';
import PageContainer from '@/components/common/PageContainer.vue';
import DashboardStatistics from '@/components/dashboard/DashboardStatistics.vue';

export default {
    name: 'DashboardView',
    components: { DashboardStatistics, PageContainer, NH1 }
};
</script>