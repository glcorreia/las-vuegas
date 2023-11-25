<template>
	<div class="wrapper">
		<h1>Tri-Peaks</h1>
		<div class="board">
			<div class="card" v-for="card in range(0, 27)" :key="card" :class="{'hideCard': !cardsOnTable[card].visible}">
				<single-card
				v-if="cardsOnTable[card].visible"
				:params="cardProps('table', card)"
				@click="cardClickHandler('table', card, $event)"/>
			</div>
			<div class="card tower-cleared" v-if="!cardsOnTable[0].visible" style="grid-area: 1 / 4">500</div>
			<div class="card tower-cleared" v-if="!cardsOnTable[1].visible" style="grid-area: 1 / 10">500</div>
			<div class="card tower-cleared" v-if="!cardsOnTable[2].visible" style="grid-area: 1 / 16">500</div>
		</div>

		<div class="game-over-text" :class="{ 'hideContent' : !gameOver }">
			{{ gameStatus }}
		</div>

		<div class="stock-waste" v-if="!gameOver">
			<div class="card waste">
				<single-card :params="cardProps('waste')" class="waste-cards"/>
			</div>
			<div class="stock">
				<div v-for="(card, index) in cardsOnStock"
				:key="card.id"
				:style="{'z-index': 50 - index, 'left': 5 + index * 5 + 'px' }"
				class="card stock-cards">
					<single-card :params="{ cover: true }" @click="index === 0 ? cardClickHandler('stock', $event) : null"/>
				</div>
			</div>
		</div>
		<div class="card stock-over" v-else></div>
		<div class="msg-log">
			<h4>Score: {{ score }} pts.</h4>
		</div>
		<div class="msg-log" :class="{ 'hideContent' : gameOver }">
			<h4>Log: {{ gameStatus }}</h4>
		</div>
		<button class="btn-reset" @click="startGame">New Game</button>
		<div>
			<RouterLink to="/">« Go Back</RouterLink>
		</div>
		
	</div>
</template>

<script setup>
/* Generic Components */
import SingleCard from '../components/SingleCard.vue'
import cardData from '../assets/cards/cards.json'

/* Assets & Helpers */
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

/* Data */
const cardsOnStock = ref([])
const cardsOnWaste = ref([])
const cardsOnTable = ref([])

const score = ref(0)
const streak = ref(1)

const gameStatus = ref('')
const cardsLeft = ref(0)
const gameOver = ref(false)

/*************************************************
*                    Functions                   *
*************************************************/
const startGame = () => {
	const remainingCards = []
	let arrLen
	
	gameStatus.value = ''
	cardsOnStock.value = [] // Reset decks
	cardsOnWaste.value = [] // Reset decks
	cardsOnTable.value = [] // Reset decks
	gameOver.value = false
	score.value = 0
	streak.value = 1
	
	cardsOnStock.value = fy_shuffle(cardData) // Shuffle deck
	arrLen = cardsOnStock.value.length

	for (let i = 0; i < arrLen; i++) {
		cardsOnStock.value[i].cover = false // Reset flipped cards
		cardsOnStock.value[i].visible = true // Reset flipped cards

		if (i < 28) {
			cardsOnTable.value.push(cardsOnStock.value[i])
			if (i < 18) {
				cardsOnTable.value[i].cover = true // Hide first 3 rows of cards
			}
		}
		else if (i === 28) {
			cardsOnWaste.value.push(cardsOnStock.value[i])
		}
		else {
			remainingCards.push(cardsOnStock.value[i])
		}
	}

	cardsOnStock.value = remainingCards
	cardsLeft.value = cardsOnTable.value.length
}

const checkPlay = (cardPosition) => {
	/* Strips the card to a value between 1 (A) and 13 (K) */
	const waste = parseInt(cardsOnWaste.value.slice(-1)[0].id.slice(1, 3))
	const table = parseInt(cardsOnTable.value[cardPosition].id.slice(1, 3))

	if (waste === 13 && table === 1 ||
		waste === 1 && table === 13 ||
		waste === table + 1 ||
		waste === table - 1) {
			if (cardPosition <= 2) score.value += 500
			cardsOnTable.value[cardPosition].visible = false
			cardsOnWaste.value.push(cardsOnTable.value[cardPosition])
			cardsLeft.value--
			score.value = score.value + 100 * streak.value
			streak.value++
			checkVisibility()
			checkWin()
		}
}

function cardVisible(card) {
	return cardsOnTable.value[card].visible
}

const checkVisibility = () => {
	/* Check 1st row visibility */
	for (let i = 0; i <= 2; i++) {
		if (!cardVisible(i * 2 + 3) && !cardVisible(i * 2 + 4)) { cardsOnTable.value[i].cover = false }
	}
	/* Check 2nd row visibility */
	let temp = 3
	for (let i = 3; i < 8; i = i+2) {
		if (!cardVisible(temp + 6) && !cardVisible(temp + 7)) { cardsOnTable.value[i].cover = false }
		if (!cardVisible(temp + 7) && !cardVisible(temp + 8)) { cardsOnTable.value[i + 1].cover = false }
		temp = temp + 3
	}
	/* Check 3rd row visibility */
	for (let i = 9; i <= 17; i++) {
		if (!cardVisible(i + 9) && !cardVisible(i + 10)) { cardsOnTable.value[i].cover = false }
	}
}

/*************************************************
*                     Helpers                    *
*************************************************/
const range = (start, end) => {
	return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

// Fisher-Yates shuffle
const fy_shuffle = (array) => {
	let cardsLeft = array.length, temp, nextCard

	while (cardsLeft) {
		nextCard = Math.floor(Math.random() * cardsLeft--)

		temp = array[cardsLeft]
		array[cardsLeft] = array[nextCard]
		array[nextCard] = temp
	}
	return array
}

function cardProps(whereIsCard, singleCardId) {
	if (whereIsCard === 'table') {
		return {
			cardId: cardsOnTable.value[singleCardId].id,
			cover: cardsOnTable.value[singleCardId].cover
		}
	}
	if (whereIsCard === 'waste') {
		return {
			cardId: cardsOnWaste.value.slice(-1)[0].id,
			cover: false
		}
	}
	
}

function cardToText (card) {
	let cardSuit, cardValue

	switch (card.slice(0, 1)) {
		case '1':
			cardSuit = '♣'
			break
		case '2':
			cardSuit = '♦'
			break
		case '3':
			cardSuit = '♠'
			break
		case '4':
			cardSuit = '♥'
			break
	}

	switch (card.slice(1, 3)) {
		case '01':
			cardValue = 'A'
			break
		case '10':
			cardValue = '10'
			break
		case '11':
			cardValue = 'J'
			break
		case '12':
			cardValue = 'Q'
			break
		case '13':
			cardValue = 'K'
			break
		default:
			cardValue = card.slice(2, 3)
			break
	}
	return cardValue + cardSuit
}

const checkWin = () => {
	/* Strips the card to a value between 1 (A) and 13 (K) */
	const waste = parseInt(cardsOnWaste.value.slice(-1)[0].id.slice(1, 3))

	let playableCards = cardsOnTable.value.filter(card => (card.visible === true && card.cover === false))
	let validPlay = false
	let howManyValidPlays = 0

	if (playableCards.length) {
		let tempCard = 0
		for (let i = 0 ; i < playableCards.length ; i++) {
			tempCard = parseInt(playableCards[i].id.slice(1, 3))
			if (waste === 13 && tempCard === 1 ||
				waste === 1 && tempCard === 13 ||
				waste === tempCard + 1 ||
				waste === tempCard - 1) {
					howManyValidPlays++
					validPlay = true
					if (validPlay) return
				}
		}
	}

	/* If stock isn't over but there are no cards left on table = win*/
	if (cardsLeft.value === 0 && cardsOnStock.value.length) {
		gameOver.value = true
		gameStatus.value = 'Win!'
		return
	}
	else if (cardsLeft.value > 0 && !cardsOnStock.value.length) {
		gameOver.value = true
		gameStatus.value = 'Game Over!'
	}
}

/*************************************************
*                 Click Handlers                 *
*************************************************/
const cardClickHandler = (where, cardPosition, event) => {
	if (where === 'table') {
		/* No action unless we click a valid card */
		if (cardsOnTable.value[cardPosition].cover) return
		
		gameStatus.value = cardToText(cardsOnTable.value[cardPosition].id) + ' played.'
		checkPlay(cardPosition)
		event.stopPropagation()
	}
	if (where === 'stock') {
		/* Reset Streak */
		streak.value = 1
		cardsOnWaste.value.push(cardsOnStock.value.pop())
		checkWin()
	}
}

startGame()
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
.board {
	margin: 0 auto 100px;
	
	display: grid;
	grid-template-rows: repeat(4, calc(var(--card-height)/2));
	grid-template-columns: repeat(20, calc(var(--card-width)/2)) ;
	
	grid-column-gap: 2px;
}
:deep().card img {
	height: var(--card-height); 
	width:  var(--card-width);

	box-shadow: 0 6px 6px hsl(0deg 0% 0% / 0.3);
	border-radius: 6px;

	cursor: pointer;
	/* opacity: 0.7; */
}
.hideContent {
	opacity: 0;
}
.hideCard {
	opacity: 0;
	width: 0;
	height: 0;
	z-index: 0;
}
.game-over-text {
	height: 30px;
}
.tower-cleared {
	-webkit-box-shadow:inset 0px 0px 0px 4px #00ff00;
	-moz-box-shadow:inset 0px 0px 0px 4px #00ff00;
	box-shadow:inset 0px 0px 0px 4px #00ff00;
	border-radius: 50%;
	width: calc(var(--card-width)*0.55);
	height: calc(var(--card-width)*0.55);
	transform: translateY(100%) translateX(42%);
	color: #00ff00;
	text-align: center;
	vertical-align: middle;
	line-height: calc(var(--card-width)*0.55);
	z-index: -1;
}
.stock-waste {
	padding-top: 40px;
	position: relative;
	width: 700px;
	height: 110px;
	margin: auto;
}
.waste {
	position: absolute;
	width: 50%;
	float: left;
}
.stock {
	position: absolute;
	float: right;
	width: 50%;
	display: inline;
}
.waste-cards {
	position: absolute;
	right: 5px;
}
.stock-cards {
	position: absolute;
	left: 5px;
}
.stock-over {
	margin: 0 auto 70px;
	position: relative;
	width: calc(var(--card-width)*0.55);
	height: calc(var(--card-width)*0.55);
	transform: translateY(10%) translateX(-20%);
	&:after {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		content: "\274c";
		font-size: 50px;
		color: #fff;
		line-height: 100px;
		text-align: center;
	}
	z-index: -1;
}

.msg-log {
	width: 500px;
	margin: 0 auto;
}
.btn-reset {
	margin-top: 20px;
	align-self: auto;
	margin-bottom: 20px;
}

/* Define specific position of cards (row / column)*/
/* 1st row */
.board .card:nth-child(1) { grid-area: 1 / 4; }
.board .card:nth-child(2) { grid-area: 1 / 10; }
.board .card:nth-child(3) { grid-area: 1 / 16; }
/* 2nd row */
.board .card:nth-child(4) { grid-area: 2 / 3; }
.board .card:nth-child(5) { grid-area: 2 / 5; }
.board .card:nth-child(6) { grid-area: 2 / 9; }
.board .card:nth-child(7) { grid-area: 2 / 11; }
.board .card:nth-child(8) { grid-area: 2 / 15; }
.board .card:nth-child(9) { grid-area: 2 / 17; }
/* 3rd row */
.board .card:nth-child(10) { grid-area: 3 / 2; }
.board .card:nth-child(11) { grid-area: 3 / 4; }
.board .card:nth-child(12) { grid-area: 3 / 6; }
.board .card:nth-child(13) { grid-area: 3 / 8; }
.board .card:nth-child(14) { grid-area: 3 / 10; }
.board .card:nth-child(15) { grid-area: 3 / 12; }
.board .card:nth-child(16) { grid-area: 3 / 14; }
.board .card:nth-child(17) { grid-area: 3 / 16; }
.board .card:nth-child(18) { grid-area: 3 / 18; }
/* 4th row */
.board .card:nth-child(19) { grid-area: 4 / 1; }
.board .card:nth-child(20) { grid-area: 4 / 3; }
.board .card:nth-child(21) { grid-area: 4 / 5; }
.board .card:nth-child(22) { grid-area: 4 / 7; }
.board .card:nth-child(23) { grid-area: 4 / 9; }
.board .card:nth-child(24) { grid-area: 4 / 11; }
.board .card:nth-child(25) { grid-area: 4 / 13; }
.board .card:nth-child(26) { grid-area: 4 / 15; }
.board .card:nth-child(27) { grid-area: 4 / 17; }
.board .card:nth-child(28) { grid-area: 4 / 19; }
</style>