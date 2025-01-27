import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from '@/stores/auth';

import ServicesPage from "@/views/ServicesPage.vue";
import MonitorsPage from "@/views/MonitorsPage.vue";
import SignInPage from "@/views/SignInPage.vue";
import SignupPage from "@/views/SignupPage.vue";
import ServiceDetailsPage from "@/views/ServiceDetailsPage.vue";

const routes = [
  { 
    path: "/", 
    redirect: "/services" 
  },
  {
    path: '/services/:id', // Rota para detalhes de um serviço, usando um parâmetro de URL `id`
    component: ServiceDetailsPage,
    props: true, // Passa o parâmetro `id` como prop para o componente,
    meta: { requiresAuth: true }
  },  
  { 
    path: "/signin", 
    component: SignInPage,
    meta: { requiresAuth: false }
  },
  { 
    path: "/signup", 
    component: SignupPage,
    meta: { requiresAuth: false }
  },
  { 
    path: "/services", 
    component: ServicesPage,
    meta: { requiresAuth: true }
  },
  { 
    path: "/monitors", 
    component: MonitorsPage,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  if (to.meta.requiresAuth && !authStore.token) {
    next('/signin');
  } else if (!to.meta.requiresAuth && authStore.token) {
    next('/services');
  } else {
    next();
  }
});

export default router;
