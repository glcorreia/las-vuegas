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
const baseNumbers = [1,2,3,4,5,6,7,8,9]
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
	let randomNumbers = getRandomNumbers()

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
	let randomNumbers = getRandomNumbers()
	let rowToCheck = []
	let usedNumbers = []
	let filteredNumbers

	for (let column = 0; column <= 2; column++) {
		/**
		@1st row is 1 to 4 exclusive -> 1 + (9 * 0) = 1 // 4 +(9 * 0) = 4
		@2nd row is 10 to 13 exclusive -> 1 + (9 * 1) = 10 // 4 +(9 * 1) = 13
		@3rd row is 19 to 22 exclusive -> 1 + (9 * 2) = 19 // 4 +(9 * 2) = 22
		*/
		rowToCheck = board_region_1.value.slice(1 + (9 * column), 4 +(9 * column)).map(Number)
	
		filteredNumbers = randomNumbers
		filteredNumbers = filteredNumbers.filter(num => !rowToCheck.includes(num))
		filteredNumbers = filteredNumbers.filter(num => !usedNumbers.map(Number).includes(num))
	
		for (let row = 1; row <= 3; row++) {
			/* + 3 here is the first square of region 2 */
			board_region_2.value[row + 3 + 9 * column] = filteredNumbers.slice(-1)
			usedNumbers.push(filteredNumbers.slice(-1))
			filteredNumbers.pop()
		}
	}
	/* Checks if all 9 numbers were used, if not, run function again */
	if (usedNumbers[8] > 0) {
		pushRegionToGameBoard(board_region_2.value)
		generateRegion3()
	}
	else generateRegion2()
}

const generateRegion3 = () => {
	let randomNumbers = getRandomNumbers()
	let rowToCheck_region1 = []
	let rowToCheck_region2 = []
	let filteredNumbers

	for (let column = 0; column <= 2; column++) {
		/* squares: 1-4, 10-13, 19-22 */
		rowToCheck_region1 = board_region_1.value.slice(1 + (9 * column), 4 +(9 * column)).map(Number)
		/* squares: 4-7, 13-16, 22-25 */
		rowToCheck_region2 = board_region_2.value.slice(4 + (9 * column), 7 +(9 * column)).map(Number)
	
		filteredNumbers = randomNumbers
		filteredNumbers = filteredNumbers.filter(num => !rowToCheck_region1.includes(num))
		filteredNumbers = filteredNumbers.filter(num => !rowToCheck_region2.includes(num))
	
		for (let row = 1; row <= 3; row++) {
			/* + 6 here is the first square of region 3 */
			board_region_3.value[row + 6 + 9 * column] = filteredNumbers.slice(-1)
			filteredNumbers.pop()
		}
	}

	pushRegionToGameBoard(board_region_3.value)
	generateRegion4()

}

const generateRegion4 = () => {
	let randomNumbers = getRandomNumbers()
	let columnToCheck = []
	let usedNumbers = []
	let filteredNumbers

	for (let row = 1; row <= 3; row++) {
		/* squares: 1,10,19, 2,11,20, 3,12,21 */
		columnToCheck.push(board_region_1.value[row])
		columnToCheck.push(board_region_1.value[row + 9])
		columnToCheck.push(board_region_1.value[row + 18])

		// console.log(columnToCheck.map(Number))
		
		filteredNumbers = randomNumbers
		filteredNumbers = filteredNumbers.filter(num => !columnToCheck.map(Number).includes(num))
		filteredNumbers = filteredNumbers.filter(num => !usedNumbers.map(Number).includes(num))
	
		for (let column = 0; column <= 2; column++) {
			/* + 27 here is the first square of region 4 */
			board_region_4.value[row + 27 + 9 * column] = filteredNumbers.slice(-1)
			usedNumbers.push(filteredNumbers.slice(-1))
			filteredNumbers.pop()
		}
		columnToCheck = []
	}
	/* Checks if all 9 numbers were used, if not, run function again */
	if (usedNumbers[8] > 0) {
		pushRegionToGameBoard(board_region_4.value)
		// generateRegion5()
	}
	else {
		console.log('mais uma moedinha')
		generateRegion4()
	} 
}
/*************************************************
*                     Helpers                    *
*************************************************/
const getRandomNumbers = () => {
	return [1,2,3,4,5,6,7,8,9].sort(() => Math.random() - 0.5)
}

const pushRegionToGameBoard = region => {
	for (let i = 0; i < 9; i++) {
		/* Get the key used in a region to know where to place the value in the overall gameboard */
		gameBoard.value[Object.keys(region)[i]] = region[Object.keys(region)[i]]
	}
}

const moveLastNumberToStart = () => {
	/* slice(-1) gets the last number of an array and unshift() moves it to the start */
	randomNumbers.value.unshift(randomNumbers.value.slice(-1))
	randomNumbers.value.pop()
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
	margin: 0 -2px -2px 0;
	background-color: #8CD867;

	/* Trick to align vertically */
	line-height: 50px;

	-webkit-box-shadow:inset 0 0 2px 0 grey;
	-moz-box-shadow:inset 0 0 2px 0 grey;
	box-shadow:inset 0 0 2px 0 #808080;
}
.grid-item:hover {
	background-color: #ED7D3A;
	
}
.grid-item:nth-child(3n):not(:nth-child(9n)) {
	border-right: 3px solid #000;
 }
 .grid-item:nth-child(n+28):nth-child(-n+36) {
	border-top: 3px solid #000;
 }
 .grid-item:nth-child(n+55):nth-child(-n+63) {
	border-top: 3px solid #000;
 }
</style>