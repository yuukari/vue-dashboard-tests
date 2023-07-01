<template>
    <UsersTableFilters/>
    <n-data-table
        :columns="columns"
        :data="rows"
        :loading="loading"
        :paginate-single-page="false"
        max-height="600"

        @update-sorter="handleSortChange"
    >
        <template #empty>
            <n-empty description="Нет данных"/>
        </template>
    </n-data-table>
    <n-space justify="center" style="margin-top: 15px" v-if="rows.length > 0">
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
import { defineComponent, watch, computed, h } from 'vue';
import { useStore } from 'vuex';
import useSWRV from 'swrv';

// import UsersTableRowMenu from '@/components/users/UsersTableRowMenu.vue';
import UsersTableFilters from '@/components/users/UsersTableFilters.vue';
import UsersTableRowMenu from '@/components/users/UsersTableRowMenu.vue';

const tableName = 'users';

// const idColumn = reactive({ title: 'ID', key: 'id', sorter: true, sortOrder: false });
// const columns = ref([
//     idColumn,
//     { title: 'E-Mail', key: 'email' },
//     { title: 'Фамилия', key: 'last_name' },
//     { title: 'Имя', key: 'first_name' },
//     { title: 'Зарегистрирован', key: 'created_at' },
//     { title: 'Последнее действие', key: 'updated_at' },
//     {
//         key: 'actions',
//         render(row) {
//             return h(UsersTableRowMenu, {
//                 id: row.id
//             }, { default: () => 'Действия' });
//         }
//     }
// ]);

// const handleSortChange = (sort) => {
//     console.log(sort);
//
//     // for (const i in layoutColumns.value) {
//     //     const layoutColumn = layoutColumns.value[i];
//     //     if (layoutColumn.key === sort.key) {
//     //         layoutColumns.value[i].sortOrder = sort.order;
//     //     }
//     // }
//
//     // console.log(layoutColumns.value);
//
//     // idColumn.sortOrder = sort.order;
// };

const registerStore = (store) => {
    store.registerModule(`${tableName}Table`, {
        namespaced: true,
        state: () => ({
            layout: {},
            rows: [],
            pagination: {
                page: 1,
                pageCount: 1,
                pageSize: 10
            }
        }),
        mutations: {
            setLayout(state, payload) {
                state.layout = payload;
            },
            setData(state, payload) {
                state.rows = payload.rows;
                state.pagination.pageCount = payload.pagination.pageCount;
            },

            setPage(state, payload) {
                state.pagination.page = payload
            },
            setPageSize(state, payload) {
                state.pagination.pageSize = payload
            }
        }
    });
}

export default defineComponent({
    name: 'UsersTable',
    components: { UsersTableFilters },

    setup() {
        const store = useStore();
        registerStore(store);

        const columns = computed(() => {
            if (store.state[`${tableName}Table`].layout.columns === undefined) {
                return [];
            }

            const columns = [];

            for (const layoutColumn of store.state[`${tableName}Table`].layout.columns) {
                let column = {
                    key: layoutColumn.key,
                    title: layoutColumn.title
                }

                if (layoutColumn.sorting) {
                    column.sorter = true;
                    column.sortOrder = false;
                }

                columns.push(column);
            }

            columns.push({
                key: 'actions',
                render(row) {
                    return h(UsersTableRowMenu, {
                        id: row.id
                    }, { default: () => 'Действия' });
                }
            })

            return columns;
        });
        const rows = computed(() => store.state[`${tableName}Table`].rows);
        const pagination = computed(() => store.state[`${tableName}Table`].pagination);

        const { data: tableLayout, error: layoutError } = useSWRV(`/api/users/layout`, undefined, {
            revalidateOnFocus: false
        });
        const { data: tableData, error: dataError, isValidating: loading, mutate: refresh } = useSWRV(() => `/api/users?page=${pagination.value.page}&pageSize=${pagination.value.pageSize}`, undefined, {
            revalidateOnFocus: false
        });

        watch(tableLayout, (tableLayout) => {
            if (tableLayout === undefined) {
                return;
            }
            store.commit(`${tableName}Table/setLayout`, tableLayout);
        });

        watch(tableData, (tableData) => {
            if (tableData === undefined) {
                return;
            }
            store.commit(`${tableName}Table/setData`, {
                rows: tableData.rows,
                pagination: tableData.pagination
            });
        });

        watch(() => store.state[`${tableName}Table`].pagination.page, () => refresh());
        watch(() => store.state[`${tableName}Table`].pagination.pageSize, () => {
            refresh();
        });

        return {
            columns,
            layoutError,

            rows,
            pagination,
            dataError,
            loading,
            refresh,

            handleSortChange(sort) {
                console.log(sort)
            },
            handlePageChange(page) {
                store.commit(`${tableName}Table/setPage`, page);

            },
            handlePageSizeChange(pageSize) {
                store.commit(`${tableName}Table/setPageSize`, pageSize);
            }
        };
    }
});
</script>