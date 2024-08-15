<template>
	<div class="super-wrapper">
		<div class="wrapper">
			<h1>Chess</h1>

			<div class="gameboard">
				<div class="eaten-white">
					<!-- <div>eaten piece ICON goes here</div> -->
				</div>
				<div class="grid-container">
					<div
						v-for="position in 64"
						:key="position"
						class="grid-square"
						@click="positionClickHandler(position)"
						@drop="onDrop(position)"
						@dragover.prevent
						@dragenter.prevent>
						<!-- {{ labels(square) }} -->
						<Pieces
							v-if="gameBoard[position].pieceId"
							:type="getPieceType(position)"
							:color="getPieceColor(position)"
							draggable
							@dragstart="startDrag($event, position)"
						/>
					</div>
				</div>
				<div class="eaten-black">
					<!-- <div>eaten piece ICON goes here</div> -->
				</div>
			</div>
			<div class="go-back"><RouterLink to="/">« Go Back</RouterLink></div>
		</div>
	</div>
</template>

<script setup>
/* Vue */
import { ref, computed, defineAsyncComponent } from 'vue'

/* Helpers */
// import labels from '../helpers/chess'

/* Assets */
import Pieces from '../components/chess/Pieces.vue'

/* Data */
const gameBoard = ref([])

const pieces = ref([
	/* White pieces */
	{ id: 1, color: 'white', type: 'pawn', position: 49, hasMoved: false, enPassant: false, promotion: false },
	{ id: 2, color: 'white', type: 'pawn', position: 50, hasMoved: false, enPassant: false, promotion: false },
	{ id: 3, color: 'white', type: 'pawn', position: 51, hasMoved: false, enPassant: false, promotion: false },
	{ id: 4, color: 'white', type: 'pawn', position: 52, hasMoved: false, enPassant: false, promotion: false },
	{ id: 5, color: 'white', type: 'pawn', position: 53, hasMoved: false, enPassant: false, promotion: false },
	{ id: 6, color: 'white', type: 'pawn', position: 54, hasMoved: false, enPassant: false, promotion: false },
	{ id: 7, color: 'white', type: 'pawn', position: 55, hasMoved: false, enPassant: false, promotion: false },
	{ id: 8, color: 'white', type: 'pawn', position: 56, hasMoved: false, enPassant: false, promotion: false },
	{ id: 9, color: 'white', type: 'rook', position: 57, hasMoved: false, hasMoved: false },
	{ id: 10, color: 'white', type: 'knight', position: 58 },
	{ id: 11, color: 'white', type: 'bishop', position: 59 },
	{ id: 12, color: 'white', type: 'queen', position: 60 },
	{ id: 13, color: 'white', type: 'king', position: 61, hasMoved: false, inCheck: false },
	{ id: 14, color: 'white', type: 'bishop', position: 62 },
	{ id: 15, color: 'white', type: 'knight', position: 63 },
	{ id: 16, color: 'white', type: 'rook', position: 64, hasMoved: false },
	/* Black pieces */
	{ id: 17, color: 'black', type: 'pawn', position: 9, hasMoved: false, enPassant: false, promotion: false },
	{ id: 18, color: 'black', type: 'pawn', position: 10, hasMoved: false, enPassant: false, promotion: false },
	{ id: 19, color: 'black', type: 'pawn', position: 11, hasMoved: false, enPassant: false, promotion: false },
	{ id: 20, color: 'black', type: 'pawn', position: 12, hasMoved: false, enPassant: false, promotion: false },
	{ id: 21, color: 'black', type: 'pawn', position: 13, hasMoved: false, enPassant: false, promotion: false },
	{ id: 22, color: 'black', type: 'pawn', position: 14, hasMoved: false, enPassant: false, promotion: false },
	{ id: 23, color: 'black', type: 'pawn', position: 15, hasMoved: false, enPassant: false, promotion: false },
	{ id: 24, color: 'black', type: 'pawn', position: 16, hasMoved: false, enPassant: false, promotion: false },
	{ id: 25, color: 'black', type: 'rook', position: 1, hasMoved: false },
	{ id: 26, color: 'black', type: 'knight', position: 2 },
	{ id: 27, color: 'black', type: 'bishop', position: 3 },
	{ id: 28, color: 'black', type: 'queen', position: 4 },
	{ id: 29, color: 'black', type: 'king', position: 5, hasMoved: false, inCheck: false },
	{ id: 30, color: 'black', type: 'bishop', position: 6 },
	{ id: 31, color: 'black', type: 'knight', position: 7 },
	{ id: 32, color: 'black', type: 'rook', position: 8, hasMoved: false }
])

/* Functions */
const initializeGameBoard = () => {
	for (let i = 0; i <= 64 ; i++) {
		gameBoard.value[i] = {
			/* id = 0 means it's empty */
			pieceId: 0,
		}
	}

	/* Black pieces */
	gameBoard.value[1].pieceId = 25 // Rook
	gameBoard.value[2].pieceId = 26 // Knight
	gameBoard.value[3].pieceId = 27 // Bishop
	gameBoard.value[4].pieceId = 28 // Queen
	gameBoard.value[5].pieceId = 29 // King
	gameBoard.value[6].pieceId = 30 // Bishop
	gameBoard.value[7].pieceId = 31 // Knight
	gameBoard.value[8].pieceId = 32 // Rook
	gameBoard.value[9].pieceId = 17 // Pawn
	gameBoard.value[10].pieceId = 18 // Pawn
	gameBoard.value[11].pieceId = 19 // Pawn
	gameBoard.value[12].pieceId = 20 // Pawn
	gameBoard.value[13].pieceId = 21 // Pawn
	gameBoard.value[14].pieceId = 22 // Pawn
	gameBoard.value[15].pieceId = 23 // Pawn
	gameBoard.value[16].pieceId = 24 // Pawn

	/* White pieces */
	gameBoard.value[49].pieceId = 1 // Pawn
	gameBoard.value[50].pieceId = 2 // Pawn
	gameBoard.value[51].pieceId = 3 // Pawn
	gameBoard.value[52].pieceId = 4 // Pawn
	gameBoard.value[53].pieceId = 5 // Pawn
	gameBoard.value[54].pieceId = 6 // Pawn
	gameBoard.value[55].pieceId = 7 // Pawn
	gameBoard.value[56].pieceId = 8 // Pawn
	gameBoard.value[57].pieceId = 9 // Rook
	gameBoard.value[58].pieceId = 10 // Knight
	gameBoard.value[59].pieceId = 11 // Bishop
	gameBoard.value[60].pieceId = 12 // Queen
	gameBoard.value[61].pieceId = 13 // King
	gameBoard.value[62].pieceId = 14 // Bishop
	gameBoard.value[63].pieceId = 15 // Knight
	gameBoard.value[64].pieceId = 16 // Rook
}

const getPieceType = (positionId) => {
	return pieces.value.find(piece => piece.id === gameBoard.value[positionId].pieceId).type
}

const getPieceColor = (positionId) => {
	return pieces.value.find(piece => piece.id === gameBoard.value[positionId].pieceId).color
}

const positionClickHandler = (position) => {
	console.log(position, 'clicked')
}



/******************************
*     DRAG AND DROP LOGIC     *
******************************/
const movingPieceId = ref()
const startingPosition = ref()

const startDrag = (evt, startPosition) => {
	evt.dataTransfer.dropEffect = 'move'
	evt.dataTransfer.effectAllowed = 'move'
	/* Store id of the piece being dragged */
	movingPieceId.value = gameBoard.value[startPosition].pieceId
	/* Store starting position */
	startingPosition.value = startPosition
}

const onDrop = (newPosition) => {
	/* If the piece ends up on the same position, don't do anything */
	if (newPosition === startingPosition.value) return
	/* Set new position for dragged piece */
	gameBoard.value[newPosition].pieceId = movingPieceId.value
	/* Clear previous position */
	gameBoard.value[startingPosition.value].pieceId = 0
	/* Reset moving piece id */
	movingPieceId.value = 0
}



/* Run at start */
initializeGameBoard()

</script>

<style scoped>
.super-wrapper {
	/* Variables */
	--square-white: #769656;
	--square-black: #eeeed2;
	--square-focus: #baca44;
	--piece-white: #FFFFFF;
	--piece-black: #000000;

	--bg-color: #363537;
	--shadow-color: #808080;

	--square-size: 60px;

	height: 100vh;
	width: 100vw;
	color: var(--square-white);
	background-color: var(--bg-color);
}

.wrapper {
	/* Center horizontal */
	position: absolute;
	top: 10px;
	left: 50%;
	/* move 50% of its size to the left and up to compensate top and left moving */
	transform: translate(-50%);

	text-align: center;
	text-transform: uppercase;
	font-weight: light;
	font-size: 18px;

}
a, a:hover {
	color: var(--square-white);
	text-decoration: none;
}
.go-back {
	margin-top: 20px;
}

.gameboard {
	display: flex;

	.grid-container {
		display: grid;
		grid-template-columns: repeat(8, var(--square-size));
		grid-template-rows: repeat(8, var(--square-size));
		width: fit-content;
		overflow: hidden;
	}
	.grid-square {
		width: var(--square-size);
		height: var(--square-size);
		padding-top: 8px;

		background-color: var(--square-black);

		/* Trick to align vertically */
		line-height: var(--square-size);
	}

	.grid-square:nth-child(16n+2),
	.grid-square:nth-child(16n+4),
	.grid-square:nth-child(16n+6),
	.grid-square:nth-child(16n+8),
	.grid-square:nth-child(16n+9),
	.grid-square:nth-child(16n+11),
	.grid-square:nth-child(16n+13),
	.grid-square:nth-child(16n+15) {
		background-color:  var(--square-white);
	}

	/* .grid-square:nth-child(9n+1),
	.grid-square:nth-child(18n+1),
	.grid-square:nth-child(n+73):nth-child(-n+81) {
		background-color: var(--bg-color);
		pointer-events: none;
	} */

	.grid-square:hover {
		background-color: var(--square-focus);
	}

	.eaten-white {
		width: 40px;
		margin-right: 20px;
	}

	.eaten-black {
		width: 40px;
		display: flex;
		flex-direction: column-reverse;
		align-self: flex-end;

		height: calc(var(--square-size) * 8);
		margin-left: 20px;
	}
}
</style>