import { createRouter, createWebHistory } from 'vue-router'

import TheMenu from '../views/TheMenu.vue'
import TriPeaks from '../views/TriPeaks.vue'
import Mahjong from '../views/Mahjong.vue'
import Sudoku from '../views/Sudoku.vue'

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
			// component: () => import('../views/TriPeaks.vue')
			component: TriPeaks
		},
		{
			path: '/mahjong',
			name: 'mahjong',
			component: Mahjong
		},
		{
			path: '/sudoku',
			name: 'sudoku',
			component: Sudoku
 		}
	]
})

export default router
