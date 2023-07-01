<template>
    <PageContainer initial-margin>
        <template #content>
            <n-h1>Пользователи</n-h1>

            <UsersTable/>
        </template>
    </PageContainer>
</template>

<script>
import { NH1 } from 'naive-ui';
import PageContainer from '@/components/common/PageContainer.vue';
import UsersTable from '@/components/users/UsersTable.vue';

export default {
    name: 'UsersView',
    components: { UsersTable, NH1, PageContainer }
};
</script>