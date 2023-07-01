<template>
    <UsersTableFilters/>
    <n-data-table
        :columns="columns"
        :data="data !== undefined ? data.rows : []"
        :loading="loading"
        :paginate-single-page="false"
        max-height="600"

        @update-sorter="handleSortChange"
    >
        <template #empty>
            <n-empty description="Нет данных"/>
        </template>
    </n-data-table>
    <n-space justify="center" style="margin-top: 15px">
        <n-pagination
            :page="pagination.page"
            :page-count="pagination.pageCount"
            :page-size="pagination.pageSize"
            show-size-picker
            :page-sizes="[10,25,50,100]"
            :disabled="loading"

            @update-page="handlePageChange"
            @update-page-size="handlePageSizeChange"
        />
    </n-space>
</template>

<script>
import { defineComponent, h, reactive, ref, watch } from 'vue';
import UsersTableRowMenu from '@/components/users/UsersTableRowMenu.vue';
import UsersTableFilters from '@/components/users/UsersTableFilters.vue';
import useSWRV from 'swrv';

const idColumn = reactive({ title: 'ID', key: 'id', sorter: true, sortOrder: false });
const columns = ref([
    idColumn,
    { title: 'E-Mail', key: 'email' },
    { title: 'Фамилия', key: 'last_name' },
    { title: 'Имя', key: 'first_name' },
    { title: 'Зарегистрирован', key: 'created_at' },
    { title: 'Последнее действие', key: 'updated_at' },
    {
        key: 'actions',
        render(row) {
            return h(UsersTableRowMenu, {
                id: row.id
            }, { default: () => 'Действия' });
        }
    }
]);
const pagination = reactive({
    page: 1,
    pageCount: 1,
    pageSize: 10
});

const handleSortChange = (sort) => {
    idColumn.sortOrder = sort.order;
};

const handlePageChange = (page) => {
    pagination.page = page;
};

const handlePageSizeChange = (pageSize) => {
    pagination.pageSize = pageSize;
};

export default defineComponent({
    name: 'UsersTable',
    components: { UsersTableFilters },

    setup() {
        const { data: tableLayout, error: layoutError } = useSWRV(`/api/users/layout`);
        const { data: tableData, error: dataError, isValidating: loading, mutate: refresh } = useSWRV(() => `/api/users?page=${pagination.page}&pageSize=${pagination.pageSize}`);

        watch(tableData, (tableData) => {
            if (tableData === undefined) {
                return;
            }

            pagination.pageCount = tableData.pagination.pageCount;
        });

        watch(() => pagination.page, () => refresh());
        watch(() => pagination.pageSize, () => {
            pagination.page = 1;
            refresh();
        });

        return {
            columns,

            layout: tableLayout,
            layoutError,

            data: tableData,
            dataError,
            loading,
            refresh,
            pagination: pagination,

            handleSortChange,
            handlePageChange,
            handlePageSizeChange
        };
    }
});
</script>