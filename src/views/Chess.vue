<template>
	<div class="super-wrapper">
		<div class="wrapper">
			<h1>Chess</h1>

			<div class="gameboard">
				<div class="eaten-white">
					<!-- <div>eaten piece ICON goes here</div> -->
				</div>
				<div class="grid-container" v-click-outside="clearHighlightedMoves">
					<div v-for="(row, rowIndex) in 8" :key="rowIndex">
						<div
						v-for="(col, colIndex) in 8"
						:key="colIndex"
						class="square"
						:class="{'square-focus' : gameBoard[rowIndex][colIndex].focus}"
						@click="positionClickHandler(rowIndex, colIndex)"
						@drop="onDrop(rowIndex, colIndex)"
						@dragover.prevent
						@dragenter.prevent>
							<Pieces
							v-if="gameBoard[rowIndex][colIndex].pieceId"
							:type="getPieceType(rowIndex, colIndex)"
							:color="getPieceColor(rowIndex, colIndex)"
							draggable
							@dragstart="startDrag($event, rowIndex, colIndex)"/>
						</div>
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
// labels(square)
// import labels from '../helpers/chess'

/* Assets */
import Pieces from '../components/chess/Pieces.vue'

/* Data */
const version = ref('v0.01')
const gameBoard = ref(Array(8).fill(null).map(() =>
	Array(8).fill(null).map(() =>
		({ pieceId: 0, focus: false }))
))
const moveHelper = ref(true)

const pieces = ref([
	/* White pieces */
	{ id: 1, color: 'white', type: 'pawn', eaten: false, hasMoved: false, enPassant: false, promotion: false },
	{ id: 2, color: 'white', type: 'pawn', eaten: false, hasMoved: false, enPassant: false, promotion: false },
	{ id: 3, color: 'white', type: 'pawn', eaten: false, hasMoved: false, enPassant: false, promotion: false },
	{ id: 4, color: 'white', type: 'pawn', eaten: false, hasMoved: false, enPassant: false, promotion: false },
	{ id: 5, color: 'white', type: 'pawn', eaten: false, hasMoved: false, enPassant: false, promotion: false },
	{ id: 6, color: 'white', type: 'pawn', eaten: false, hasMoved: false, enPassant: false, promotion: false },
	{ id: 7, color: 'white', type: 'pawn', eaten: false, hasMoved: false, enPassant: false, promotion: false },
	{ id: 8, color: 'white', type: 'pawn', eaten: false, hasMoved: false, enPassant: false, promotion: false },
	{ id: 9, color: 'white', type: 'rook', eaten: false, hasMoved: false, hasMoved: false },
	{ id: 10, color: 'white', type: 'knight', eaten: false },
	{ id: 11, color: 'white', type: 'bishop', eaten: false },
	{ id: 12, color: 'white', type: 'queen', eaten: false },
	{ id: 13, color: 'white', type: 'king', eaten: false, hasMoved: false, inCheck: false },
	{ id: 14, color: 'white', type: 'bishop', eaten: false },
	{ id: 15, color: 'white', type: 'knight', eaten: false },
	{ id: 16, color: 'white', type: 'rook', eaten: false, hasMoved: false },
	/* Black pieces */
	{ id: 17, color: 'black', type: 'pawn', eaten: false, hasMoved: false, enPassant: false, promotion: false },
	{ id: 18, color: 'black', type: 'pawn', eaten: false, hasMoved: false, enPassant: false, promotion: false },
	{ id: 19, color: 'black', type: 'pawn', eaten: false, hasMoved: false, enPassant: false, promotion: false },
	{ id: 20, color: 'black', type: 'pawn', eaten: false, hasMoved: false, enPassant: false, promotion: false },
	{ id: 21, color: 'black', type: 'pawn', eaten: false, hasMoved: false, enPassant: false, promotion: false },
	{ id: 22, color: 'black', type: 'pawn', eaten: false, hasMoved: false, enPassant: false, promotion: false },
	{ id: 23, color: 'black', type: 'pawn', eaten: false, hasMoved: false, enPassant: false, promotion: false },
	{ id: 24, color: 'black', type: 'pawn', eaten: false, hasMoved: false, enPassant: false, promotion: false },
	{ id: 25, color: 'black', type: 'rook', eaten: false, hasMoved: false },
	{ id: 26, color: 'black', type: 'knight', eaten: false },
	{ id: 27, color: 'black', type: 'bishop', eaten: false },
	{ id: 28, color: 'black', type: 'queen', eaten: false },
	{ id: 29, color: 'black', type: 'king', eaten: false, hasMoved: false, inCheck: false },
	{ id: 30, color: 'black', type: 'bishop', eaten: false },
	{ id: 31, color: 'black', type: 'knight', eaten: false },
	{ id: 32, color: 'black', type: 'rook', eaten: false, hasMoved: false }
])

/* Functions */
const initializeGameBoard = () => {
	/* Info */
	console.log('Las Vuegas Chess', version.value)
	if (moveHelper.value) console.log ('> Helper ON')

	/* White pieces */
	gameBoard.value[0][6].pieceId = 1 // Pawn
	gameBoard.value[1][6].pieceId = 2 // Pawn
	gameBoard.value[2][6].pieceId = 3 // Pawn
	gameBoard.value[3][6].pieceId = 4 // Pawn
	gameBoard.value[4][6].pieceId = 5 // Pawn
	gameBoard.value[5][6].pieceId = 6 // Pawn
	gameBoard.value[6][6].pieceId = 7 // Pawn
	gameBoard.value[7][6].pieceId = 8 // Pawn
	gameBoard.value[0][7].pieceId = 9 // Rook
	gameBoard.value[1][7].pieceId = 10 // Knight
	gameBoard.value[2][7].pieceId = 11 // Bishop
	gameBoard.value[3][7].pieceId = 12 // Queen
	gameBoard.value[4][7].pieceId = 13 // King
	gameBoard.value[5][7].pieceId = 14 // Bishop
	gameBoard.value[6][7].pieceId = 15 // Knight
	gameBoard.value[7][7].pieceId = 16 // Rook
	/* Black pieces */
	gameBoard.value[0][1].pieceId = 17 // Pawn
	gameBoard.value[1][1].pieceId = 18 // Pawn
	gameBoard.value[2][1].pieceId = 19 // Pawn
	gameBoard.value[3][1].pieceId = 20 // Pawn
	gameBoard.value[4][1].pieceId = 21 // Pawn
	gameBoard.value[5][1].pieceId = 22 // Pawn
	gameBoard.value[6][1].pieceId = 23 // Pawn
	gameBoard.value[7][1].pieceId = 24 // Pawn
	gameBoard.value[0][0].pieceId = 25 // Rook
	gameBoard.value[1][0].pieceId = 26 // Knight
	gameBoard.value[2][0].pieceId = 27 // Bishop
	gameBoard.value[3][0].pieceId = 28 // Queen
	gameBoard.value[4][0].pieceId = 29 // King
	gameBoard.value[5][0].pieceId = 30 // Bishop
	gameBoard.value[6][0].pieceId = 31 // Knight
	gameBoard.value[7][0].pieceId = 32 // Rook
}

const getPieceType = (row, col) => {
	return pieces.value.find(piece => piece.id === pieceId(row, col)).type
}

const getPieceColor = (row, col) => {
	return pieces.value.find(piece => piece.id === pieceId(row, col)).color
}

const positionClickHandler = (row, col) => {
	/* Only continues if there's a piece on that square */
	if (!!pieceId(row, col)) {
		/* Convert row to Letter, inverts cols and shows piece name */
		console.log(String.fromCharCode(row + 65), Math.abs(col - 8) , pieces.value.find(piece => piece.id === pieceId(row, col)).type)

		checkValidMoves(row, col)
	} else {
		clearHighlightedMoves()
	}
}

/* Simplifies searching which piece is where in the gameBoard */
const pieceId = (row, col) => { return gameBoard.value[row][col].pieceId }

const possibleMoves = ref([])
const checkValidMoves = (startX, startY) => {
	const type = getPieceType(startX, startY)
	const color = getPieceColor(startX, startY)
	const firstMove = !pieces.value.find(piece => piece.id === pieceId(startX, startY)).hasMoved
	/* Resets previous moves */
	possibleMoves.value = []

	if (type === 'pawn') { // todo: en passant
		if (color === 'white') {
			/* Regular move */
			if(startY-1 >= 0 && pieceId(startX,startY-1) === 0) {
				possibleMoves.value.push([startX, startY-1]) // 1 square up
				if (firstMove && pieceId(startX, startY-2) === 0) { possibleMoves.value.push([startX, startY-2]) } // 2 squares up
			}
			/* Black pieces (17-32) in range to be eaten */
			if (startX === 0 && pieceId(startX+1, startY-1) >= 17) { possibleMoves.value.push([startX+1, startY-1]) }
			if (startX === 7 && pieceId(startX-1, startY-1) >= 17) { possibleMoves.value.push([startX-1, startY-1]) }
			/* Available black piece up and left */
			if (startX > 0 && startX < 7 && pieceId(startX-1, startY-1) >= 17) { possibleMoves.value.push([startX-1, startY-1]) }
			/* Available black piece up and right */
			if (startX > 0 && startX < 7 && pieceId(startX+1, startY-1) >= 17) { possibleMoves.value.push([startX+1, startY-1]) }
		}
		if (color === 'black') { // todo: en passant
			/* Regular move */
			if(startY+1 <= 7 && pieceId(startX, startY+1) === 0) {
				possibleMoves.value.push([startX, startY+1]) // 1 square down
				if (firstMove && pieceId(startX, startY+2) === 0) { possibleMoves.value.push([startX, startY+2]) } // 2 squares down
			}
			/* White pieces (1-16) in range to be eaten */
			if (startX === 0 && pieceId(startX+1, startY+1) >= 1 && pieceId(startX+1, startY+1) <= 16) { possibleMoves.value.push([startX+1, startY+1]) }
			if (startX === 7 && pieceId(startX-1, startY+1) >= 1 && pieceId(startX-1, startY+1) <= 16) { possibleMoves.value.push([startX-1, startY+1]) }
			/* Available black piece down and left */
			if (startX > 0 && startX < 7 && pieceId(startX-1, startY+1) >= 1 && pieceId(startX-1, startY+1) <= 16) { possibleMoves.value.push([startX-1, startY+1]) }
			/* Available black piece down and right*/ 
			if (startX > 0 && startX < 7 && pieceId(startX+1, startY+1) >= 1 && pieceId(startX+1, startY+1) <= 16) { possibleMoves.value.push([startX+1, startY+1]) }
		}
	}

	if (type === 'knight') {
		if (color === 'white') {
			if (startX-1 >= 0 && startY-2 >= 0 && (pieceId(startX-1, startY-2) === 0 || pieceId(startX-1, startY-2) >= 17)) { possibleMoves.value.push([startX-1, startY-2]) } // ↰
			if (startX+1 <= 7 && startY-2 >= 0 && (pieceId(startX+1, startY-2) === 0 || pieceId(startX+1, startY-2) >= 17)) { possibleMoves.value.push([startX+1, startY-2]) } // ↱
			if (startX-1 >= 0 && startY+2 <= 7 && (pieceId(startX-1, startY+2) === 0 || pieceId(startX-1, startY+2) >= 17)) { possibleMoves.value.push([startX-1, startY+2]) } // ↲
			if (startX+1 <= 7 && startY+2 <= 7 && (pieceId(startX+1, startY+2) === 0 || pieceId(startX+1, startY+2) >= 17)) { possibleMoves.value.push([startX+1, startY+2]) } // ↳
			if (startX-2 >= 0 && startY-1 >= 0 && (pieceId(startX-2, startY-1) === 0 || pieceId(startX-2, startY-1) >= 17)) { possibleMoves.value.push([startX-2, startY-1]) } // ↖
			if (startX-2 >= 0 && startY+1 <= 7 && (pieceId(startX-2, startY+1) === 0 || pieceId(startX-2, startY+1) >= 17)) { possibleMoves.value.push([startX-2, startY+1]) } // ↙
			if (startX+2 <= 7 && startY-1 >= 0 && (pieceId(startX+2, startY-1) === 0 || pieceId(startX+2, startY-1) >= 17)) { possibleMoves.value.push([startX+2, startY-1]) } // ↗
			if (startX+2 <= 7 && startY+1 <= 7 && (pieceId(startX+2, startY+1) === 0 || pieceId(startX+2, startY+1) >= 17)) { possibleMoves.value.push([startX+2, startY+1]) } // ↘
		}
		if (color === 'black') {
			if (startX-1 >= 0 && startY-2 >= 0 && pieceId(startX-1, startY-2) <= 16) { possibleMoves.value.push([startX-1, startY-2]) } // ↰
			if (startX+1 <= 7 && startY-2 >= 0 && pieceId(startX+1, startY-2) <= 16) { possibleMoves.value.push([startX+1, startY-2]) } // ↱
			if (startX-1 >= 0 && startY+2 <= 7 && pieceId(startX-1, startY+2) <= 16) { possibleMoves.value.push([startX-1, startY+2]) } // ↲
			if (startX+1 <= 7 && startY+2 <= 7 && pieceId(startX+1, startY+2) <= 16) { possibleMoves.value.push([startX+1, startY+2]) } // ↳
			if (startX-2 >= 0 && startY-1 >= 0 && pieceId(startX-2, startY-1) <= 16) { possibleMoves.value.push([startX-2, startY-1]) } // ↖
			if (startX-2 >= 0 && startY+1 <= 7 && pieceId(startX-2, startY+1) <= 16) { possibleMoves.value.push([startX-2, startY+1]) } // ↙
			if (startX+2 <= 7 && startY-1 >= 0 && pieceId(startX+2, startY-1) <= 16) { possibleMoves.value.push([startX+2, startY-1]) } // ↗
			if (startX+2 <= 7 && startY+1 <= 7 && pieceId(startX+2, startY+1) <= 16) { possibleMoves.value.push([startX+2, startY+1]) } // ↘
		}
	}

	if (type === 'rook') {
		if (color === 'white') {
			/* Check left movements */
			for (let i=startX-1; i >= 0; i--) {
				if (pieceId(i, startY) === 0) { possibleMoves.value.push([i, startY]) } // If square is empty, save position and continue
				else {
					if (pieceId(i, startY) >= 17) { possibleMoves.value.push([i, startY]) } // If square has a black piece, save position
					break // stop if a piece is found
				}
			}
			/* Check right movements */
			for (let i=startX+1; i <= 7; i++) {
				if (pieceId(i, startY) === 0) { possibleMoves.value.push([i, startY]) } // If square is empty, save position and continue
				else {
					if (pieceId(i, startY) >= 17) { possibleMoves.value.push([i, startY]) } // If square has a black piece, save position
					break // stop if a piece is found
				}
			}
			/* Check up movements */
			for (let i=startY-1; i >= 0; i--) {
				if (pieceId(startX, i) === 0) { possibleMoves.value.push([startX, i]) } // If square is empty, save position and continue
				else {
					if (pieceId(startX, i) >= 17) { possibleMoves.value.push([startX, i]) } // If square has a black piece, save position
					break // stop if a piece is found
				}
			}
			/* Check down movements */
			for (let i=startY+1; i <= 7; i++) {
				if (pieceId(startX, i) === 0) { possibleMoves.value.push([startX, i]) } // If square is empty, save position and continue
				else {
					if (pieceId(startX, i) >= 17) { possibleMoves.value.push([startX, i]) } // If square has a black piece, save position
					break // stop if a piece is found
				}
			}
		}
		if (color === 'black') {
			/* Check left movements */
			for (let i=startX-1; i >= 0; i--) {
				if (pieceId(i, startY) === 0) { possibleMoves.value.push([i, startY]) } // If square is empty, save position and continue
				else {
					if (pieceId(i, startY) <= 16) { possibleMoves.value.push([i, startY]) } // If square has a black piece, save position
					break // stop if a piece is found
				}
			}
			/* Check right movements */
			for (let i=startX+1; i <= 7; i++) {
				if (pieceId(i, startY) === 0) { possibleMoves.value.push([i, startY]) } // If square is empty, save position and continue
				else {
					if (pieceId(i, startY) <= 16) { possibleMoves.value.push([i, startY]) } // If square has a black piece, save position
					break // stop if a piece is found
				}
			}
			/* Check up movements */
			for (let i=startY-1; i >= 0; i--) {
				if (pieceId(startX, i) === 0) { possibleMoves.value.push([startX, i]) } // If square is empty, save position and continue
				else {
					if (pieceId(startX, i) <= 16) { possibleMoves.value.push([startX, i]) } // If square has a black piece, save position
					break // stop if a piece is found
				}
			}
			/* Check down movements */
			for (let i=startY+1; i <= 7; i++) {
				if (pieceId(startX, i) === 0) { possibleMoves.value.push([startX, i]) } // If square is empty, save position and continue
				else {
					if (pieceId(startX, i) <= 16) { possibleMoves.value.push([startX, i]) } // If square has a black piece, save position
					break // stop if a piece is found
				}
			}
		}
	}
	
	/* Highlight available moves */
	if (moveHelper.value) highlightSquares()
}

const highlightedMoves = ref([])
const highlightSquares = () => {
	/* Reset any previous highlighted squares */
	clearHighlightedMoves()

	/* Sets focus on possible moves */
	for (let i=0; i < possibleMoves.value.length; i++) {
		const row = possibleMoves.value[i][0]
		const col = possibleMoves.value[i][1]

		gameBoard.value[row][col].focus = true
	}
	highlightedMoves.value = possibleMoves.value

	/* Reset possible moves */
	possibleMoves.value = []
}

const clearHighlightedMoves = () => {
	if (highlightedMoves.value.length) {
		for (let i=0; i < highlightedMoves.value.length; i++) {
			const row = highlightedMoves.value[i][0]
			const col = highlightedMoves.value[i][1]

			gameBoard.value[row][col].focus = false
		}
		highlightedMoves.value = []
	}
}

/******************************
*     DRAG AND DROP LOGIC     *
******************************/
const movingPieceId = ref()
const startingPosition = ref([])

const startDrag = (evt, startX, startY) => {
	evt.dataTransfer.dropEffect = 'move'
	evt.dataTransfer.effectAllowed = 'move'
	/* Store id of the piece being dragged */
	movingPieceId.value = pieceId(startX, startY)
	/* Store starting position */
	startingPosition.value = [startX, startY]
	/* Check valid moves */
	// checkValidMoves(startX, startY, movingPieceId.value)
}

const onDrop = (endX, endY) => {
	const startX = startingPosition.value[0]
	const startY = startingPosition.value[1]

	/* If the piece ends up on the same position, don't do anything */
	if (endX === startX && endY === startY) return
	/* Check possible moves */
	// todo: COMPARE endX+endY to all positions in availableMoves[]
	// todo: if theres a match continue, if not returns

	/* Save new position for dragged piece */
	gameBoard.value[endX][endY].pieceId = movingPieceId.value
	/* Clear previous position */
	gameBoard.value[startX][startY].pieceId = 0
	/* Set hasMoved property to true */
	pieces.value.find(piece => piece.id === movingPieceId.value).hasMoved = true
	/* Reset any previous highlighted squares */
	clearHighlightedMoves()
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

		.square {
			width: var(--square-size);
			height: var(--square-size);

			display: flex;
			align-items: center;
			justify-content: center;
		}

		.square:hover {
			background-color: var(--square-focus) !important;
		}

		.square-focus {
			box-sizing: border-box;
			-moz-box-sizing: border-box;
			-webkit-box-sizing: border-box;
			box-shadow: inset 0 0 15px #eea404;
		}
	}

	.grid-container > div:nth-child(odd) .square:nth-child(odd),
	.grid-container > div:nth-child(even), .square:nth-child(even) {
		background-color:  var(--square-black);
	}

	.grid-container > div:nth-child(odd) .square:nth-child(even),
	.grid-container > div:nth-child(even), .square:nth-child(odd) {
		background-color:  var(--square-white);
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