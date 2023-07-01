import { createApp } from 'vue'
import router from './../router'
import naive from 'naive-ui';
import App from './App.vue'

import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'

if (process.env.NODE_ENV === 'development') {
    const { worker } = require('./../test/msw');
    worker.start({
        onUnhandledRequest: 'bypass'
    })
    .catch((error) => {
        console.error(`Failed to start MSW`, error);
    });
}

const app = createApp(App);
app.use(router);
app.use(naive);
app.mount('#app');