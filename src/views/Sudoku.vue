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

const randomNumbers = ref([])

/*************************************************
*                    Functions                   *
*************************************************/
const initializeGame = () => {
	generateRegion1()
}

const generateRegion1 = () => {
	/* Get randomized numbers */
	randomNumbers.value = generateNumbers()

	for (let column = 0; column <= 2; column++) {
		for (let row = 1; row <= 3; row++) {
			/* .slice(-1) gets the last item from an array .pop() removes it */
			board_region_1.value[row + 9 * column] = randomNumbers.value.slice(-1)
			randomNumbers.value.pop()
		}
	}
	/* Add region numbers to overall gameboard array */
	pushRegionToGameBoard(board_region_1.value)
	generateRegion2()
}

const funcFunc = (keys, value) => {
	let chaves = keys.map(value => parseInt(value, 10))
	console.log(chaves)
	console.log(value)

	if (chaves.includes(value)) {
		randomNumbers.value.unshift(randomNumbers.value.slice(-1))
		randomNumbers.value.pop()
		setTimeout(() => { funcFunc() }, 100)
	}
	else {
		// not working
		console.log(randomNumbers.value.slice(-1))
		return randomNumbers.value.slice(-1)
	}
}

const generateRegion2 = () => {
	randomNumbers.value = generateNumbers()
	
	let row = 1
	let rowToCheck = board_region_1.value.slice(1, 4)

	for (let column = 0; column < 1; column++) {
		board_region_2.value[row + 3 + 9 * column] = funcFunc(rowToCheck, parseInt(randomNumbers.value.slice(-1)))
	}
	// 	while (parseInt(Object.values(board_region_1.value[1 + 9 * column])) === randomNumbers.value.slice(-1) ||
	// 			parseInt(Object.values(board_region_1.value[2 + 9 * column])) === randomNumbers.value.slice(-1) ||
	// 			parseInt(Object.values(board_region_1.value[3 + 9 * column])) === randomNumbers.value.slice(-1)) {

	// 		if (parseInt(Object.values(board_region_1.value[1 + 9 * column])) !== randomNumbers.value.slice(-1) &&
	// 			parseInt(Object.values(board_region_1.value[2 + 9 * column])) !== randomNumbers.value.slice(-1) &&
	// 			parseInt(Object.values(board_region_1.value[3 + 9 * column])) !== randomNumbers.value.slice(-1)) {
	// 				console.log('conditions met', randomNumbers.value.slice(-1))
	// 				board_region_2.value[row + 3 + 9 * column] = randomNumbers.value.slice(-1)
	// 				console.log('entao?', Object.values(board_region_2.value[row + 3 + 9 * column]))
	// 				randomNumbers.value.pop()
	// 			}
	// 		else {
	// 			console.log('not met')	
	// 			randomNumbers.value = moveLastNumberToStart()
	// 			console.log('random numbers:', randomNumbers.value)
	// 		}
	// 		console.log(i)
	// 		i += 1
	// 	}
	// }

	// ----------------------------------------------------------------------------

	// for (let column = 0; column < 2; column++) {
	// 	for (let row = 1; row <= 3; row++) {
	// 		let valueInRegion1 = parseInt(Object.values(board_region_1.value[row + 9 * column]))
	// 		let valueInRegion2 = parseInt(Object.values(board_region_1.value[6]))
	// 		let randomNumber = parseInt(randomNumbers.slice(-1))
			

			/* SÓ ESTÁ A COMPARAR COM A MESMA POSICAO, TEM DE COMPARAR COM A ROW TODA */
			/* MERDA ABAIXO */
			// while (!rowCleared) {
			// 	console.log(parseInt(Object.values(board_region_1.value[1 + 9 * column])),'-',randomNumber)
			// 	if (parseInt(Object.values(board_region_1.value[1 + 9 * column])) === randomNumber ||
			// 		parseInt(Object.values(board_region_1.value[2 + 9 * column])) === randomNumber ||
			// 		parseInt(Object.values(board_region_1.value[3 + 9 * column])) === randomNumber) {
			// 			console.log('moved')
			// 			moveLastNumberToStart(randomNumbers)
			// 		}
			// 	else {
			// 		console.log('atao')
			// 		rowCleared = true
			// 	}
			// }
				
				// board_region_2.value[row + 3 + 9 * column] = randomNumbers.slice(-1)
				// randomNumbers.pop()

			// if ( valueInRegion1 === randomNumber) {
			// 	console.log(valueInRegion1, randomNumber, 'bur')

			// 	moveLastNumberToStart(randomNumbers)

			// 	board_region_2.value[row + 3 + 9 * column] = randomNumbers.slice(-1)
			// 	randomNumbers.pop()
			// }
			// else {
			// 	console.log('do not randomize')
			// 	/* row + 3 indicates the first square of region 2 (4) */
			// 	board_region_2.value[row + 3 + 9 * column] = randomNumbers.slice(-1)
			// 	randomNumbers.pop()
			// }
	// 	}
	// }
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
	margin: 0 0 0 0;
	background-color: #8CD867;

	/* Trick to align vertically */
	line-height: 50px;
	/* -webkit-box-shadow:inset 0px 0px 0px 1px grey;
	-moz-box-shadow:inset 0px 0px 0px 1px grey;
	box-shadow:inset 0px 0px 0px 1px grey; */
}
.grid-item:hover {
	background-color: #ED7D3A;
	
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