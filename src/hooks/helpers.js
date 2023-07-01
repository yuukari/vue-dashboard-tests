import { h } from 'vue';
import { NIcon } from 'naive-ui';
import { RouterLink } from 'vue-router';

const useRouterLink = (label, route, params = undefined) => {
    return () => h(RouterLink, {
        to: {
            name: route,
            params
        }
    }, {
        default: () => label
    });
};
const useIcon = (icon) => () => h(NIcon, null, { default: () => h(icon) });

export {
    useRouterLink,
    useIcon
};