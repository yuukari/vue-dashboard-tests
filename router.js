import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import UsersView from '@/views/Users/UsersView.vue';
import UsersCreateView from '@/views/Users/UsersCreateView.vue';

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: DashboardView
    },
    {
        path: '/users',
        name: 'users',
        component: UsersView
    },
    {
        path: '/users/create',
        name: 'users_create',
        component: UsersCreateView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
