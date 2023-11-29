<template>
	<div class="wrapper">
		<h1>Sudoku</h1>
		
		<div class="grid-container">
			<div v-for="square in 81" :key="square" class="grid-item" :id="square">{{ parseInt(gameBoard[square]) }}</div>
		</div>

		<div class="go-back"><RouterLink to="/">« Go Back</RouterLink></div>
	</div>
</template>

<script setup>
/* Vue */
import { ref } from 'vue'

/* Assets & Helpers */
import { RouterLink } from 'vue-router'

/* Data */
const gameBoard = ref(Array(100).fill(0))
const board_region_1 = ref([])
const board_region_2 = ref([])
const board_region_3 = ref([])
const board_region_4 = ref([])
const board_region_5 = ref([])
const board_region_6 = ref([])
const board_region_7 = ref([])
const board_region_8 = ref([])
const board_region_9 = ref([])

/*************************************************
*                    Functions                   *
*************************************************/
const initializeGame = () => {
	generateRegion1()
}

const generateRegion1 = () => {
	/* Get randomized numbers */
	let randomNumbers = generateNumbers()

	for (let column = 0; column <= 2; column++) {
		for (let row = 1; row <= 3; row++) {
			/* .slice(-1) gets the last item from an array .pop() removes it */
			board_region_1.value[row + 9 * column] = randomNumbers.slice(-1)
			randomNumbers.pop()
		}
	}
	/* Add region numbers to overall gameboard array */
	pushRegionToGameBoard(board_region_1.value)
	generateRegion2()
}

const generateRegion2 = () => {
	let randomNumbers = generateNumbers()

	for (let column = 0; column <= 2; column++) {
		for (let row = 1; row <= 3; row++) {
			/* row + 3 indicates the first square of region 2 (4) */
			board_region_2.value[row + 3 + 9 * column] = randomNumbers.slice(-1)
			randomNumbers.pop()
		}
	}
	pushRegionToGameBoard(board_region_2.value)
}
/*************************************************
*                     Helpers                    *
*************************************************/
const generateNumbers = () => {
	let randomNumbers = [1,2,3,4,5,6,7,8,9]
	return randomNumbers.sort(() => Math.random() - 0.5)
}

const pushRegionToGameBoard = region => {
	for (let i = 0; i < 9; i++) {
		/* Get the key used in a region to know where to place the value in the overall gameboard */
		gameBoard.value[Object.keys(region)[i]] = region[Object.keys(region)[i]]
	}
}

initializeGame()
</script>

<style scoped>
.wrapper {
	/* Center horizontal */
	position: absolute;
	top: 55px;
	left: 50%;
	/* move 50% of its size to the left and up to compensate top and left moving */
	transform: translate(-50%);

	text-align: center;
	text-transform: uppercase;
	font-weight: light ;
	font-size: 18px;
}
a, a:hover {
	color: #363537;
	text-decoration: none;
}
.go-back {
	margin-top: 20px;
}
.grid-container {
	display: grid;
	grid-template-columns: repeat(9, 1fr);
	grid-template-rows: repeat(9, 1fr);
}
.grid-item {
	width: 50px;
	height: 50px;
	margin: 0 0 -3px 0;

	/* Trick to align vertically */
	line-height: 50px;
	-webkit-box-shadow:inset 0px 0px 0px 1px grey;
	-moz-box-shadow:inset 0px 0px 0px 1px grey;
	box-shadow:inset 0px 0px 0px 1px grey;
}
.grid-item:hover {
	background-color: lightgreen;
	
}
.grid-item:nth-child(3n):not(:nth-child(9n)) {
	border-right: 3px solid #000;
 }
 .grid-item:nth-child(n+19):nth-child(-n+27) {
	border-bottom: 3px solid #000;
 }
 .grid-item:nth-child(n+46):nth-child(-n+54) {
	border-bottom: 3px solid #000;
 }
</style>