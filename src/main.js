import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

/* Click outside function */
const clickOutside = {
	beforeMount: (el, binding) => {
		el.clickOutsideEvent = event => {
			/* Checking if click was outside the el and his children */
			if (!(el == event.target || el.contains(event.target))) {
				/* and if it was, call method provided in attribute value */
				binding.value()
			}
		}
		document.addEventListener("click", el.clickOutsideEvent)
	},
	unmounted: el => {
		document.removeEventListener("click", el.clickOutsideEvent)
		},
	}

app.use(router)

app.directive("click-outside", clickOutside).mount('#app')
