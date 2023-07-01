<template>
    <n-row>
        <n-col span="6">
            <n-statistic
                label="Пользователей"
                value="294"
            >
                <template #prefix>
                    <n-icon>
                        <PersonOutline/>
                    </n-icon>
                </template>
            </n-statistic>
        </n-col>

        <n-col span="6">
            <n-statistic
                label="Отзывов"
                value="183"
            >
                <template #prefix>
                    <n-icon>
                        <ChatbubbleEllipsesOutline/>
                    </n-icon>
                </template>
            </n-statistic>
        </n-col>

        <n-col span="6">
            <n-statistic
                label="Пользователей"
                value="294"
            >
                <template #prefix>
                    <n-icon>
                        <PersonOutline/>
                    </n-icon>
                </template>
            </n-statistic>
        </n-col>

        <n-col span="6">
            <n-statistic
                label="Пользователей"
                value="294"
            >
                <template #prefix>
                    <n-icon>
                        <PersonOutline/>
                    </n-icon>
                </template>
            </n-statistic>
        </n-col>

    </n-row>
</template>

<script>
import { defineComponent } from 'vue';
import { NRow, NCol, NStatistic, NIcon } from 'naive-ui';
import { PersonOutline, ChatbubbleEllipsesOutline } from '@vicons/ionicons5';

export default defineComponent({
    name: 'DashboardStatistics',
    components: { NRow, NCol, NStatistic, NIcon, PersonOutline, ChatbubbleEllipsesOutline }
});
</script>
