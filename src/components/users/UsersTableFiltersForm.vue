<template>
    <n-form
        class="form-filters"
        :model="filters"
        inline
    >
        <n-form-item
            label="ID пользователя"
            path="id"
        >
            <n-input-number
                placeholder=""
                :show-button="false"
                :min="0"
            />
        </n-form-item>
        <n-form-item
            label="E-Mail"
            path="email"
        >
            <n-input
                placeholder=""
            />
        </n-form-item>

        <n-form-item>
            <n-button tertiary type="primary">
                <template #icon>
                    <n-icon>
                        <SearchOutline/>
                    </n-icon>
                </template>

                Применить
            </n-button>
        </n-form-item>

        <n-form-item>
            <n-button tertiary type="error">
                <template #icon>
                    <n-icon>
                        <Close/>
                    </n-icon>
                </template>

                Сбросить
            </n-button>
        </n-form-item>
    </n-form>
</template>

<script>
import { defineComponent } from 'vue';
import { NForm, NFormItem, NInput, NInputNumber, NButton, NIcon } from 'naive-ui';
import { SearchOutline, Close } from '@vicons/ionicons5';

// const rules = [
//     {
//         id: [
//             {
//                 validator (rule, value) {
//                     if (!/^\d*$/.test(value)) {
//                         return new Error('Значение должно быть числом')
//                     }
//                 },
//                 trigger: ['input', 'blur']
//             }
//         ]
//     }
// ]

export default defineComponent({
    name: 'UsersTableFiltersForm',
    components: { NForm, NFormItem, NInput, NInputNumber, NButton, NIcon, SearchOutline, Close },
    data() {
        return {
            filters: {
                id: '',
                email: ''
            }
        };
    }
});
</script>

<style scoped>
.form-filters {
    margin-top: 15px;
}
</style>