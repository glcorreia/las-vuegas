<template>
	<div class="wrapper">
		<h1>Sudoku</h1>
		
		<div class="grid-container">
			<div v-for="(region,regionIndex) in 9" :key="region" class="grid-region">
				<div v-for="(square,squareIndex) in 9" :key="square" class="grid-square">
					{{ gameBoard[regionIndex][squareIndex] }}
				</div>
			</div>
		</div>

		<div class="go-back"><RouterLink to="/">« Go Back</RouterLink></div>
	</div>

</template>


<script setup>
/* Vue */
import { ref, computed } from 'vue'

/* Assets & Helpers */
import { RouterLink } from 'vue-router'

/* Data */
// const gameBoardSolved = ref([
// 	[1,2,3,4,5,6,7,8,9],
// 	[4,5,6,7,8,9,1,2,3],
// 	[7,8,9,1,2,3,4,5,6],
// 	[2,3,1,5,6,4,8,9,7],
// 	[5,6,4,8,9,7,2,3,1],
// 	[8,9,7,2,3,1,5,6,4],
// 	[3,1,2,6,4,5,9,7,8],
// 	[6,4,5,9,7,8,3,1,2],
// 	[9,7,8,3,1,2,6,4,5]
// ])

const gameBoardSolved = ref([
	[1,1,1,2,2,2,3,3,3],
	[1,1,1,2,2,2,3,3,3],
	[1,1,1,2,2,2,3,3,3],
	[1,1,1,2,2,2,3,3,3],
	[1,1,1,2,2,2,3,3,3],
	[1,1,1,2,2,2,3,3,3],
	[1,1,1,2,2,2,3,3,3],
	[1,1,1,2,2,2,3,3,3],
	[1,1,1,2,2,2,3,3,3]
])
const gameBoard = ref([[],[],[],[],[],[],[],[],[]])
const numbers = ref([1,2,3,4,5,6,7,8,9])

/*************************************************
*                    Functions                   *
*************************************************/
/**
@trocar [X] todos os numeros, por ex, todos os 1s por 5s (sendo que este 5 é retirado de um array de 1 a 9 shuffled)
@randomizar [ ] ordem das rows 0,1,2, 3,4,5, 6,7,8
@randomizar [ ] ordem cols 0,1,2, 3,4,5, 6,7,8
@randomizar [ ] blocos de rows 0-2, 3-5, 6-8
@randomizar [ ] blocos de cols 0-2, 3-5, 6-8
@profit [ ]
*/


const initializeGame = () => {
	/* Shuffle numbers array */
	// numbers.value = shuffle(numbers.value)

	gameBoard.value = gameBoardSolved.value
	/* Replace all numbers for random ones */
	// for (let currentNumber = 0; currentNumber < 9; currentNumber++) {
	// 	for (let region = 0; region < 9; region++) {
	// 		/* Find where currentNumber is in the solved board */
	// 		let oldNumberIndex = gameBoardSolved.value[region].indexOf(currentNumber + 1)
	// 		/* Populate the game board with the replaced random number */
	// 		gameBoard.value[region][oldNumberIndex] = numbers.value[currentNumber]
	// 	}
	// }

	/* Shuffle rows by block */
	/* Shuffles 3 blocks of numbers and merges/flattens them after */
	let shuffledRows = [shuffle([[0,1,2],[3,4,5],[6,7,8]])].flat(2) //ES2019
	let tempArray = []
	
	/* Shuffle block of rows */
	// currently only doing this to first block out of 9
	for (let i = 0; i < 9; i++) {
		tempArray[i] = gameBoard.value[0][shuffledRows[i]]
	}
	gameBoard.value[0] = tempArray
	console.log(tempArray)
	//gameBoard.value = shuffledRows
	
	// console.log(gameBoard.value)
}

/*************************************************
*                     Helpers                    *
*************************************************/
/* Fisher-Yates shuffle */
const shuffle = (array) => {
	for (let i = array.length -1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i+1))
		let temp = array[i]
		array[i] = array[j]
		array[j] = temp
	}
	return array
}

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
	gap: 3px;
}
.grid-region {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(3, 1fr);
}
.grid-square {
	width: 50px;
	height: 50px;
	margin: 0;
	background-color: var(--square-color);

	/* Trick to align vertically */
	line-height: 50px;

	-webkit-box-shadow:inset 0 0 1px 0 var(--shadow-color);
	-moz-box-shadow:inset 0 0 1px 0 var(--shadow-color);
	box-shadow:inset 0 0 1px 0 var(--shadow-color);
}
.grid-square:hover {
	background-color: var(--square-hover-color);
}
</style>