import { createApp } from 'vue';
import VueMask from 'vue-the-mask';

import router from './router';
import store from './store/index.js'
import App from './App.vue';

import BasePage from './components/base/BasePage.vue';
import BaseCard from './components/base/BaseCard.vue';
import BaseButton from './components/base/BaseButton.vue';
import BaseBadge from './components/base/BaseBadge.vue';
import BaseSpinner from './components/base/BaseSpinner.vue';
import BaseDialog from './components/base/BaseDialog.vue';
import BasePagination from './components/base/BasePagination.vue';
import ConfirmDialog from './components/base/ConfirmDialog.vue';

const app = createApp(App);

app.use(router);
app.use(store);
app.use(VueMask);

app.component('base-page', BasePage);
app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);
app.component('base-pagination', BasePagination);
app.component('confirm-dialog', ConfirmDialog);

app.mount('#app');