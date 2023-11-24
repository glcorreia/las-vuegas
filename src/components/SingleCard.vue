<template>
	<img :src="getCardPath()" v-if="!emptyCard">
</template>

<script setup>
import { ref } from 'vue'

import cardData from '../assets/cards/cards.json'
import cardExtras from '../assets/cards/cardsExtras.json'

/* Data */
const emptyCard = ref(false)

/* Props
@params.cardId { String } Id of specific card
@params.cover { Boolean } Returns fliped card
@randomCard { Boolean } Returns random Card
*/
const props = defineProps({
	params: Object,
	randomCard: Boolean
})

const getCardPath = () => {
	if (props.params) {
		if (props.params.cover) return ('../src/assets/cards/' + cardExtras[1].filename).toString() // Deck cover 1
		if (props.params.cardId) return ('../src/assets/cards/' + cardData[cardData.findIndex(card => card.id === props.params.cardId)].filename).toString() // Find index where id = prop and returns it's filename
	}
	if (props.randomCard) return ('../src/assets/cards/' + cardData[randomCardPicker(0, 51)].filename).toString()
	else {
		emptyCard.value = true
		return // Return empty card
	}
}

const randomCardPicker = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

</script>

<style scoped>
</style>