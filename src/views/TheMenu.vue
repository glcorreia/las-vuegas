<template>
	<div class="wrapper">
		<h1>Casino<br/>Las V<span style="text-decoration: line-through;">u</span>egas</h1>
		<div class="container">
			<RouterLink to="/tripeaks">
				<div class="item available">Tri-Peaks</div>
			</RouterLink>
			<RouterLink to="/sudoku">
				<div class="item">Sudoku</div>
			</RouterLink>
			<RouterLink to="/slotmachine">
				<div class="item">Slots</div>
			</RouterLink>
		</div>
	</div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.wrapper {
	/* Center vertical and horizontal */
	position: absolute;
	top: 40%;
	left: 50%;
	/* move 50% of its size to the left and up to compensate top and left moving */
	transform: translate(-50%, -30%);

	text-align: center;
	text-transform: uppercase;
	font-weight: light ;
	font-size: 18px;
}
a, a:hover {
	color: #363537;
	text-decoration: none;
}
.container {
	margin: 0 auto;
	display: grid;
	grid-template-rows: repeat(3, 3fr);
	grid-template-columns: repeat(3, 3fr);
	grid-gap: 10px;
	width: 330px;
	border: 1px white;
}
.item {
	width: 100px;
	height: 100px;
	background-color: #ED7D3A;
	border: 2px solid white;
	/* Trick to align vertically */
	line-height: 100px;
}
.available {
	background-color: #8CD867;
}
.available:hover{
	background-color:#46B1C9;
}
</style>