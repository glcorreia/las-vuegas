import { createRouter, createWebHistory } from 'vue-router'

import TheMenu from '../views/TheMenu.vue'
import TriPeaks from '../views/TriPeaks.vue'
import Sudoku from '../views/Sudoku.vue'
import SlotMachine from '../views/SlotMachine.vue'
import Chess from '../views/Chess.vue'

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
			path: '/slotmachine',
			name: 'slotmachine',
			component: SlotMachine
		},
		{
			path: '/sudoku',
			name: 'sudoku',
			component: Sudoku
 		}
		 ,
		 {
			 path: '/chess',
			 name: 'chess',
			 component: Chess
		  }
	]
})

export default router
