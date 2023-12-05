<template>
	<div class="wrapper">
		<h1>Sudoku</h1>
		
		<div class="grid-container">
			<div v-for="(region,regionIndex) in 9" :key="region" class="grid-region">
				<div v-for="(square,squareIndex) in 9" :key="square" class="grid-square">
					{{ gameBoard[regionIndex][squareIndex] !== 0 ? gameBoard[regionIndex][squareIndex]: '' }}
				</div>
			</div>
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
const gameBoard = ref(Array.from({ length: 9 }, () => Array(9).fill(0)))

/*************************************************
*                    Functions                   *
*************************************************/
const initializeGame = () => {
	populateBoard()
}

const populateBoard = () => {
	let randomPosition
	let x = 1

	for (let region = 0; region < 9; region++) {
		/* Get a random number 1 to 9 to use as region index */
		randomPosition = Math.floor(Math.random() * 9 ) + 1
		
		// Do logic so that theres not an equal number in the same row/column
		gameBoard.value[region][randomPosition - 1] = 1
	}
	console.log(gameBoard.value)
}

/*************************************************
*                     Helpers                    *
*************************************************/
initializeGame()
</script>

<style scoped>
.wrapper {
	/* Variables */
	--bg-color: #2FBF71;
	--square-color: #8CD867;
	--square-hover-color: #ED7D3A;
	--shadow-color: #808080;
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
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(3, 1fr);
	border: 0;
}
.grid-region {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(3, 1fr);
}
.grid-region:nth-child(2) {
	border-right: 4px solid var(--bg-color);
	border-left: 3px solid var(--bg-color);
}
.grid-region:nth-child(4) {
	border-top: 3px solid var(--bg-color);
	border-bottom: 5px solid var(--bg-color);
}
.grid-region:nth-child(5) {
	border-top: 3px solid var(--bg-color);
	border-left: 3px solid var(--bg-color);
	border-bottom: 5px solid var(--bg-color);
	border-right: 4px solid var(--bg-color);
}
.grid-region:nth-child(6) {
	border-top: 3px solid var(--bg-color);
	border-bottom: 5px solid var(--bg-color);
}
.grid-region:nth-child(8) {
	border-right: 4px solid var(--bg-color);
	border-left: 3px solid var(--bg-color);
}
.grid-square {
	width: 50px;
	height: 50px;
	margin: 0 -2px -2px 0;
	background-color: var(--square-color);

	/* Trick to align vertically */
	line-height: 50px;

	-webkit-box-shadow:inset 0 0 2px 0 var(--shadow-color);
	-moz-box-shadow:inset 0 0 2px 0 var(--shadow-color);
	box-shadow:inset 0 0 2px 0 var(--shadow-color);
}
.grid-square:hover {
	background-color: var(--square-hover-color);
}
</style>