<template>
	<img :src="getPieceSvg()" class="icon">
</template>

<script setup>
/** Props:
@type {String} name of the piece
@color {String} color of the piece
*/
const props = defineProps({
	type: String,
	color: String,
})

const getPieceSvg = () => {
	return ('../src/assets/icons/chess/' + props.color + '_' + props.type + '.svg')
}
</script>

<style scoped>
.icon {
	width: 40px;
}
</style>