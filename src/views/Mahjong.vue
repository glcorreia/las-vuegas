<template>
	<div class="wrapper">
		<h1>Mahjong Solitaire</h1>
		<!-- Content -->
		<div>
			<RouterLink to="/">« Go Back</RouterLink>
		</div>
	</div>
</template>

<script setup>
/* Assets & Helpers */
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.wrapper {
	/* Variables */
	--card-width: 88px;
	--card-height: 120px;

	/* Center vertical and horizontal */
	position: absolute;
	top: 25%;
	left: 50%;
	/* move 50% of its size to the left and up to compensate top and left moving */
	transform: translate(-50%, -20%);

	text-align: center;
	text-transform: uppercase;
	font-weight: light ;
	font-size: 18px;
}
a, a:hover {
	color: #363537;
	text-decoration: none;
}
</style>