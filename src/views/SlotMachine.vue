<template>
	<!-- <div class="wrapper">
		<h1>Slot Machine</h1> -->
		<!-- Content -->
		<div class="slots">
			<div class="reel"></div>
			<div class="reel"></div>
			<div class="reel"></div>
		</div>

		<!-- <img src="../assets/images/slotreel.webp" style="position:fixed; left:0; top:0; height: 100vh; width: auto;"> -->
		
		<!-- <div>
			<RouterLink to="/">« Go Back</RouterLink>
		</div>
	</div> -->
</template>

<script setup>
/* Vue */
import { ref, onMounted } from 'vue'

/* Assets & Helpers */
import { RouterLink } from 'vue-router'

/* Data */
const icon_width = ref(79)
const icon_height = ref(79)
const num_icons = ref(9)
const indexes = ref[0, 0, 0]
const reels = ref([])

const roll = (reel, offset = 0) => {
	const delta = (offset + 2) * num_icons.value + Math.round(Math.random() * num_icons.value)
}

const rollAll = () => {
	console.log(reels.value)
}

onMounted(()=>{
	const reelsList = document.querySelectorAll('.reel')
	reels.value = Array.from(reelsList)
	console.log(reels.value)
 })

rollAll()
</script>

<style lang="scss" scoped>
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

$icon_width: 79px;
$icon_height: 79px;
$num_icons: 9;

.slots {
	width: 3.5 * $icon_width;
	height: 3 * $icon_height;
	border: 1px solid black;

	display: flex;
	justify-content: space-between;
	
	margin-bottom: 24px;
	padding: 0.3 * $icon_height;

	.reel {
		width: $icon_width;
		height: 3 * $icon_height;
		border: 1px solid black;

		background-image: url(../assets/images/slotreel.webp);
		background-repeat: repeat-y;
		background-position: 0 0;
	}
}
</style>