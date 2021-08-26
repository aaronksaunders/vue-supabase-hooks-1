import { createApp } from 'vue'
import {createWebHistory, createRouter} from "vue-router";

import App from './App.vue'
import HomePage from "./pages/HomePage.vue"
import DetailPage from "./pages/DetailPage.vue"
import AddItemPage from "./pages/AddItemPage.vue"
import AddImagePage from "./pages/AddImagePage.vue"

const routes = [
    { path: "/", component: HomePage },
    { path: "/detail/:id", component: DetailPage, props:true },
    { path: "/add-item", component: AddItemPage },    { path: "/add-image", component: AddImagePage },
    // { path: '/add', component: AddPage },
    // { path: '/update/:', component: UpdatePage },
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes
});

createApp(App).use(router).mount('#app')
