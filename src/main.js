import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: App
    },
    {
      path: '/buscar',
      component: () => import('./components/pagebusqueda.vue')
    }
  ]
});

app.use(router);
app.mount('#app');