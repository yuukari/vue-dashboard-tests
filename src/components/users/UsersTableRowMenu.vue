<template>
    <n-dropdown :options="actions">
        <n-button :bordered="false">
            <template #icon>
                <n-icon>
                    <EllipsisVertical/>
                </n-icon>
            </template>
        </n-button>
    </n-dropdown>
</template>


<script>
import { defineComponent } from 'vue';
import { EllipsisVertical, OpenOutline, TrashOutline, PencilOutline } from '@vicons/ionicons5';
import { useIcon } from '@/hooks/helpers';

const actions = [
    {
        label: 'Перейти',
        key: 'view',
        icon: useIcon(OpenOutline)
    },
    {
        label: 'Изменить',
        key: 'edit',
        icon: useIcon(PencilOutline)
    },
    {
        label: 'Удалить',
        key: 'delete',
        icon: useIcon(TrashOutline)
    }
];

export default defineComponent({
    name: 'UsersTableRowMenu',
    components: { EllipsisVertical },
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    methods: {},
    setup() {
        return {
            actions
        };
    }
});
</script>