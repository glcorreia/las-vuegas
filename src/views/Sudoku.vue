<template>
	<div class="wrapper">
		<h1>Sudoku</h1>
		
		<div class="grid-container">
			<div v-for="(region,regionIndex) in 9" :key="region" class="grid-region">
				<div v-for="(square,squareIndex) in 9" :key="square" class="grid-square">
					{{ gameBoard[regionIndex][squareIndex] !== 0 ? gameBoard[regionIndex][squareIndex] : '' }}
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
const validPositions = ref([])

/*************************************************
*                    Functions                   *
*************************************************/
const initializeGame = () => {
	populateBoard()
}

const populateBoard = () => {
	for (let region = 0; region < 9; region++) {
		for (let currentNum = 1; currentNum <= 9; currentNum++) {
			/* Check sfor valid position of current number in current region */
			checkValidPosition(region, currentNum)
		}
	}
}

const availableSquares = region => {
	/* Get an array of available positions in this region */
	return validPositions.value = gameBoard.value[region]
				.map((value, index) => ({ value, index }))
				.filter(item => item.value === 0)
				.map(item => item.index)
				.map(Number)
}

const checkValidPosition = (region, currentNum) => {
	let filteredPosition = []
	let filteredRows = []
	let filteredCols = []
	availableSquares(region)
	
	switch (region + 1) {
		case 1: {
			/* Place current number, where available */
			filteredPosition = shuffle(validPositions.value)
			break
		}
		case 2: {
			/* Compare current number row position with previous region's row */
			filteredRows.push(Math.floor(gameBoard.value[0].findIndex(el => el === currentNum)/3+1))
			/* Removes all positions that are in rows previously used */
			filteredPosition = validPositions.value.filter(el => !filteredRows.includes(Math.floor(el/3+1)))
			filteredPosition = shuffle(filteredPosition)
			break
		}
		case 3: {
			/* Compare current number row position with 2 previous region's rows */
			filteredRows.push(Math.floor(gameBoard.value[0].findIndex(el => el === currentNum)/3+1))
			filteredRows.push(Math.floor(gameBoard.value[1].findIndex(el => el === currentNum)/3+1))
			/* Removes all positions that are in rows previously used */
			filteredPosition = validPositions.value.filter(el => !filteredRows.includes(Math.floor(el/3+1)))
			filteredPosition = shuffle(filteredPosition)
			break
		}
		case 4: {
			/* Compare current number column position with above region's column */
			filteredCols.push(Math.floor(gameBoard.value[0].findIndex(el => el === currentNum)%3+1))
			/* Removes all positions that are in rows previously used */
			filteredPosition = validPositions.value.filter(el => !filteredCols.includes(Math.floor(el%3+1)))
			filteredPosition = shuffle(filteredPosition)
			break
		}
		case 5: {
			/* Compare current number column position with above region's column and previous region's row */
			filteredCols.push(Math.floor(gameBoard.value[1].findIndex(el => el === currentNum)%3+1))
			filteredRows.push(Math.floor(gameBoard.value[3].findIndex(el => el === currentNum)/3+1))
			/* Removes all positions that are in columns previously used */
			filteredPosition = validPositions.value.filter(el => !filteredCols.includes(Math.floor(el%3+1)))
			/* Removes all the remainder positions that are in rows previously used */
			filteredPosition = filteredPosition.filter(el => !filteredRows.includes(Math.floor(el/3+1)))
			filteredPosition = shuffle(filteredPosition)
			break
		}
		case 6: {
			/* Compare current number column position with above region's column and 2 previous region's rows */
			filteredCols.push(Math.floor(gameBoard.value[2].findIndex(el => el === currentNum)%3+1))
			filteredRows.push(Math.floor(gameBoard.value[3].findIndex(el => el === currentNum)/3+1))
			filteredRows.push(Math.floor(gameBoard.value[4].findIndex(el => el === currentNum)/3+1))
			/* Removes all positions that are in columns previously used */
			filteredPosition = validPositions.value.filter(el => !filteredCols.includes(Math.floor(el%3+1)))
			/* Removes all the remainder positions that are in rows previously used */
			filteredPosition = filteredPosition.filter(el => !filteredRows.includes(Math.floor(el/3+1)))
			filteredPosition = shuffle(filteredPosition)
			break
		}
		case 7: {
			/* Compare current number column position with 2 region's columns above */
			filteredCols.push(Math.floor(gameBoard.value[0].findIndex(el => el === currentNum)%3+1))
			filteredCols.push(Math.floor(gameBoard.value[3].findIndex(el => el === currentNum)%3+1))
			/* Removes all positions that are in rows previously used */
			filteredPosition = validPositions.value.filter(el => !filteredCols.includes(Math.floor(el%3+1)))
			filteredPosition = shuffle(filteredPosition)
			break
		}
		case 8: {
			/* Compare current number column position with 2 region's column above and previous region's row */
			filteredCols.push(Math.floor(gameBoard.value[1].findIndex(el => el === currentNum)%3+1))
			filteredCols.push(Math.floor(gameBoard.value[4].findIndex(el => el === currentNum)%3+1))
			filteredRows.push(Math.floor(gameBoard.value[6].findIndex(el => el === currentNum)/3+1))
			/* Removes all positions that are in columns previously used */
			filteredPosition = validPositions.value.filter(el => !filteredCols.includes(Math.floor(el%3+1)))
			/* Removes all the remainder positions that are in rows previously used */
			filteredPosition = filteredPosition.filter(el => !filteredRows.includes(Math.floor(el/3+1)))
			filteredPosition = shuffle(filteredPosition)
			break
		}
		case 9: {
			/* Compare current number column position with 2 region's column above and 2 previous region's rows */
			filteredCols.push(Math.floor(gameBoard.value[2].findIndex(el => el === currentNum)%3+1))
			filteredCols.push(Math.floor(gameBoard.value[5].findIndex(el => el === currentNum)%3+1))
			filteredRows.push(Math.floor(gameBoard.value[6].findIndex(el => el === currentNum)/3+1))
			filteredRows.push(Math.floor(gameBoard.value[7].findIndex(el => el === currentNum)/3+1))
			/* Removes all positions that are in columns previously used */
			filteredPosition = validPositions.value.filter(el => !filteredCols.includes(Math.floor(el%3+1)))
			/* Removes all the remainder positions that are in rows previously used */
			filteredPosition = filteredPosition.filter(el => !filteredRows.includes(Math.floor(el/3+1)))
			filteredPosition = shuffle(filteredPosition)
			break
		}
	}
	gameBoard.value[region][filteredPosition[0]] = currentNum
}



/*************************************************
*                     Helpers                    *
*************************************************/
/* Fisher-Yates shuffle */
const shuffle = (array) => {
	for (let i = array.length -1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i+1))
		let k = array[i]
		array[i] = array[j]
		array[j] = k
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