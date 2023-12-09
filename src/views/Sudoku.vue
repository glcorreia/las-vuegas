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
	let currentNum = 1
	
	for (let region = 0; region < 9; region++) {
		
		/* Get a random number 1 to 9 to use as region index */
		randomPosition = Math.floor(Math.random() * 9 )
		checkValidPosition(region, randomPosition, currentNum)

		// if (region === 0) {
		// 	gameBoard.value[region][randomPosition] = 1
		// 	console.log('region',region,'position',randomPosition,'module',randomPosition%3,'value',gameBoard.value[region][randomPosition])
		// }
		// else {
		// 	checkValidPosition(region, randomPosition)
		// }
		// gameBoard.value[region][x] = x
		// column2: 1,4,7 column2: 2,5,8 column3: 3,6,9
		// console.log('region',region,'position',x,'module',x%3,'value',gameBoard.value[region][x])
		// x++
		
	}
	// console.log(gameBoard.value)
}

const checkValidPosition = (region, position, currentNum) => {
	/* Get an array of available positions in this region */
	let availableSquares = gameBoard.value[region]
		.map((value, index) => ({ value, index }))
		.filter(item => item.value === 0)
		.map(item => item.index)

	// console.log(availableSquares)
	// console.log(position)
	// console.log(availableSquares.includes(position))

	if (availableSquares.includes(position)) {
		switch (region + 1) {
			case 1: {
				/* Place current number, where available */
				gameBoard.value[region][position] = currentNum
				return
			}
			case 2: {
				/* Compare current number row position with previous region's row */
				if (Math.floor(gameBoard.value[0].findIndex(num => num === currentNum)/3+1) === Math.floor(position/3+1)) {
					return checkValidPosition(region, Math.floor(Math.random() * 9 ), currentNum)
				}
				else return gameBoard.value[region][position] = currentNum
			}
			case 3: {
				/* Compare current number row position with 2 previous region's rows */
				if (Math.floor(gameBoard.value[0].findIndex(num => num === currentNum)/3+1) === Math.floor(position/3+1) ||
					Math.floor(gameBoard.value[1].findIndex(num => num === currentNum)/3+1) === Math.floor(position/3+1)) {
					return checkValidPosition(region, Math.floor(Math.random() * 9 ), currentNum)
				}
				else return gameBoard.value[region][position] = currentNum
			}
			case 4: {
				// comparar com region1 coluna
				console.log('region 4')
				gameBoard.value[region][position] = 1
				return
			}
			case 5: {
				// comparar com region2 coluna e region4 linha
				console.log('region 5')
				gameBoard.value[region][position] = 1
				return
			}
			case 6: {
				// comparar com region3 coluna e region 4 e 5 linha
				console.log('region 6')
				gameBoard.value[region][position] = 1
				return
			}
			case 7: {
				// comparar com region1 e 4 coluna
				console.log('region 7')
				gameBoard.value[region][position] = 1
				return
			}
			case 8: {
				// comparar com region2 e 5 coluna e region7 linha
				console.log('region 8')
				gameBoard.value[region][position] = 1
				return
			}
			case 9: {
				// comparar com region3 e 6 coluna e region7 e 8 linha
				console.log('region 9')
				gameBoard.value[region][position] = 1
			return
			}
			default: {
				console.log('Something wrong')
				return
			}
		}
	}
	else {
		console.log('position taken')
		/* If this position is taken, try another random one */
		checkValidPosition(region, Math.floor(Math.random() * 9 ), currentNum)
	}

	console.log('region',region+1,'pos',position+1,'col',position%3+1,'row',Math.floor(position/3+1))
	// if (position%3 === 1 || position%3 === 4 || position%3 === 7 ) console.log('region',region+1,'column1')
	// if (position%3 === 2 || position%3 === 5 || position%3 === 8 ) console.log('region',region+1,'column2')
	// if (position%3 === 3 || position%3 === 6 || position%3 === 9 ) console.log('region',region+1,'column3')
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