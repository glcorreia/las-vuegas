import { createRouter, createWebHistory } from 'vue-router'
import TheMenu from '../views/TheMenu.vue'
import TriPeaks from '../views/TriPeaks.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TheMenu
    },
    {
      path: '/tripeaks',
      name: 'tripeaks',
    //   component: () => import('../views/TriPeaks.vue')
	component: TriPeaks
    }
  ]
})

export default router
