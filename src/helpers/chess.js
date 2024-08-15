const labels = (square) => {
	switch (square) {
		case 1:
			return '8'
		case 10:
			return '7'
		case 19:
			return '6'
		case 28:
			return '5'
		case 37:
			return '4'
		case 46:
			return '3'
		case 55:
			return '2'
		case 64:
			return '1'
		case 74:
			return 'A'
		case 75:
			return 'B'
		case 76:
			return 'C'
		case 77:
			return 'D'
		case 78:
			return 'E'
		case 79:
			return 'F'
		case 80:
			return 'G'
		case 81:
			return 'H'
		default:
			return
	}
}

export default labels;