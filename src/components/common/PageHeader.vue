<template>
    <n-card>
        <PageContainer>
            <template #content>
                <n-page-header
                    class="page-header"
                >
                    <template #title>
                        Dashboard
                    </template>

                    <template #extra>
                        <n-menu
                            class="page-header__menu"
                            v-model:value="activeItem"
                            mode="horizontal"
                            :options="menuItems"
                        />
                    </template>
                </n-page-header>
            </template>
        </PageContainer>
    </n-card>
</template>

<script>
import { defineComponent } from 'vue';
import { NPageHeader, NMenu, NCard } from 'naive-ui';
import {
    GridOutline,
    PersonOutline,
    SettingsOutline,
    ListOutline,
    PersonAddOutline,
    LogOutOutline
} from '@vicons/ionicons5';

import { useIcon, useRouterLink } from '@/hooks/helpers';
import PageContainer from '@/components/common/PageContainer.vue';

const menuItems = [
    {
        label: useRouterLink('Главная', 'dashboard'),
        key: 'dashboard',
        icon: useIcon(GridOutline)
    },
    {
        label: 'Пользователи',
        key: 'users',
        icon: useIcon(PersonOutline),
        children: [
            {
                label: useRouterLink('Просмотр', 'users'),
                key: 'users',
                icon: useIcon(ListOutline)
            },
            {
                label: useRouterLink('Создать пользователя', 'users_create'),
                key: 'users_create',
                icon: useIcon(PersonAddOutline)
            }
        ]
    },
    {
        label: 'Настройки',
        key: 'settings',
        icon: useIcon(SettingsOutline)
    },
    {
        key: 'logout',
        icon: useIcon(LogOutOutline)
    }
];

export default defineComponent({
    name: 'PageHeader',
    components: { PageContainer, NPageHeader, NMenu, NCard },
    data() {
        return {
            activeItem: 'dashboard'
        };
    },
    setup() {
        return {
            menuItems
        };
    }
});
</script>