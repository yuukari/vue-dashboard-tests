<template>
    <n-space vertical>
        <n-button @click="toggle">
            <template #icon>
                <n-icon>
                    <CaretDownOutline v-if="!open"/>
                    <CaretUpOutline v-if="open"/>
                </n-icon>
            </template>

            {{ open ? 'Закрыть фильтры' : 'Открыть фильтры' }}
        </n-button>
        <n-collapse-transition :show="open">
            <UsersTableFiltersForm/>
        </n-collapse-transition>
    </n-space>
</template>

<script>
import { defineComponent } from 'vue';
import { NButton, NCollapseTransition, NSpace, NIcon } from 'naive-ui';
import { CaretDownOutline, CaretUpOutline } from '@vicons/ionicons5';
import UsersTableFiltersForm from '@/components/users/UsersTableFiltersForm.vue';

export default defineComponent({
    name: 'UsersTableFilters',
    components: {
        UsersTableFiltersForm,
        NButton,
        NCollapseTransition,
        NSpace,
        NIcon,
        CaretDownOutline,
        CaretUpOutline
    },
    props: {
        filters: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            open: false
        };
    },
    methods: {
        toggle() {
            this.open = !this.open;
        }
    }
});
</script>