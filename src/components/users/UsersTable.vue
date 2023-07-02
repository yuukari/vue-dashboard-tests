<template>
    <UsersTableFilters/>
    <n-data-table
        :columns="columns"
        :data="rows"
        :loading="loading"
        :paginate-single-page="false"
        :flex-height="true"
        min-height="600"

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

import UsersTableFilters from '@/components/users/UsersTableFilters.vue';
import UsersTableRowMenu from '@/components/users/UsersTableRowMenu.vue';

const tableName = 'users';

const registerStore = (store) => {
    if (store.hasModule(`${tableName}Table`)) {
        return;
    }

    store.registerModule(`${tableName}Table`, {
        namespaced: true,
        state: () => ({
            layout: {},
            sorting: {
                key: null,
                order: false
            },
            filters: {},
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
                state.pagination.page = payload;
            },
            setPageSize(state, payload) {
                state.pagination.page = 1;
                state.pagination.pageSize = payload;
            },

            setSorting(state, payload) {
                state.sorting = {
                    key: payload.key,
                    order: payload.order
                };
            },
            resetSorting(state) {
                state.sorting = {
                    key: null,
                    order: false
                }
            }
        },
        getters: {
            columns(state) {
                if (state.layout.columns === undefined) {
                    return [];
                }

                const columns = [];
                for (const key of Object.keys(state.layout.columns)) {
                    const layoutColumn = state.layout.columns[key];
                    let column = {
                        key: layoutColumn.key,
                        title: layoutColumn.title
                    }

                    if (layoutColumn.sorting) {
                        column.sorter = true;
                        column.sortOrder = state.sorting.key === layoutColumn.key ? state.sorting.order : false;
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
                });

                return columns;
            }
        }
    });
}

const buildQueryUrl = (state) => {
    const params = new URLSearchParams();

    params.append('page', state.pagination.page.toString());
    params.append('pageSize', state.pagination.pageSize.toString());

    if (state.sorting.key !== null && state.sorting.order !== false) {
        params.append('sortBy', state.sorting.key);
        params.append('sortOrder', state.sorting.order);
    }

    return `/api/${tableName}?${params.toString()}`;
}

export default defineComponent({
    name: 'UsersTable',
    components: { UsersTableFilters },

    setup() {
        const store = useStore();
        registerStore(store);

        const columns = computed(() => store.getters[`${tableName}Table/columns`]);
        const rows = computed(() => store.state[`${tableName}Table`].rows);
        const pagination = computed(() => store.state[`${tableName}Table`].pagination);

        const { data: tableLayout, error: layoutError } = useSWRV(`/api/${tableName}/layout`, undefined, {
            revalidateOnFocus: false
        });
        const { data: tableData, error: dataError, isValidating: loading, mutate: refresh } = useSWRV(() => buildQueryUrl(store.state[`${tableName}Table`]), undefined, {
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
        watch(() => store.state[`${tableName}Table`].pagination.pageSize, () => refresh());

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
                store.commit(`${tableName}Table/setSorting`, {
                    key: sort.columnKey,
                    order: sort.order
                });
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