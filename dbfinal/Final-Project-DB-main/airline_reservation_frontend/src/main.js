import router from './router';
import store from './store';
import { createApp } from 'vue';

import App from './App.vue';
import installElementPlus from './plugins/element.js';
// import VuePapaParse from 'vue-papa-parse';

const app = createApp(App).use(store).use(router);
installElementPlus(app);
app.mount('#app');
// app.use(VuePapaParse);