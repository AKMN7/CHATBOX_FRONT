<template>
	<div class="cont bg-lightBG dark:bg-darkBG">
		<div id="loader">
			<div class="loader_box s">
				<div class="bar" id="a1"></div>
				<div class="bar" id="a2"></div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.cont {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		z-index: 100 !important;
	}

	#loader {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100vw;
	}

	.loader_box {
		display: flex;
		animation: 3s infinite rotate;
	}
	.bar {
		height: 50px;
		width: 20px;
	}
	#a2 {
		height: 0;
		background: #ed7f3b;
		animation: 2s infinite anim;
	}

	#a1 {
		height: 0;
		background: #d65d2b;
		animation: 2.9s infinite anim;
	}

	@keyframes anim {
		00% {
			height: 2px;
		}
		50% {
			height: 50px;
		}
		99% {
			height: 2px;
		}
	}

	@keyframes anim2 {
		00% {
			height: 2px;
		}
		50% {
			height: 50px;
		}
		99% {
			height: 2px;
		}
	}

	@keyframes rotate {
		00% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(359deg);
		}
		99% {
			transform: rotate(0deg);
		}
	}
</style>
