<template>
	<img :src="getCardPath()" v-if="!emptyCard">
</template>

<script setup>
import cardData from '../assets/cards/cards.json'
import cardExtras from '../assets/cards/cardsExtras.json'

/* Vue */
import { ref } from 'vue'

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
		/* Deck cover */
		if (props.params.cover) return ('../src/assets/cards/' + cardExtras[1].filename).toString()
		/* Find index where card.id = prop.cardId and returns it's filename */
		if (props.params.cardId) return ('../src/assets/cards/' + cardData[cardData.findIndex(card => card.id === props.params.cardId)].filename).toString()
	}
	/* Returns a random card */
	if (props.randomCard) return ('../src/assets/cards/' + cardData[randomCardPicker(0, 51)].filename).toString()
	/* Returns an empty card */
	else {
		emptyCard.value = true
		return
	}
}

const randomCardPicker = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

</script>