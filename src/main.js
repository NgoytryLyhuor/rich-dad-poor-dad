import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

const routes = [
  { path: '/', name: 'dashboard', component: () => import('./views/DashboardView.vue') },
  { path: '/assets', name: 'assets', component: () => import('./views/AssetsView.vue') },
  { path: '/cashflow', name: 'cashflow', component: () => import('./views/CashflowView.vue') },
  { path: '/calc', name: 'calc', component: () => import('./views/CalcView.vue') },
  { path: '/rules', name: 'rules', component: () => import('./views/RulesView.vue') },
  { path: '/mindset', name: 'mindset', component: () => import('./views/MindsetView.vue') },
  { path: '/notes', name: 'notes', component: () => import('./views/BookNotesView.vue') },
  { path: '/track', name: 'track', component: () => import('./views/TrackView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() { return { top: 0, behavior: 'smooth' } }
})

createApp(App).use(router).mount('#app')
