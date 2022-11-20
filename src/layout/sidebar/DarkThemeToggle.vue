<template>
	<div class="flex items-center justify-around text-md py-3 rounded-lg text-white bg-grey">
		<span class="material-icons">light_mode</span>
		<label class="switch">
			<input type="checkbox" />
			<span class="slider round"></span>
		</label>
		<span class="material-icons">dark_mode</span>
	</div>
</template>

<style scoped>
	/* TOGGLE SWITCH */
	.switch {
		position: relative;
		display: inline-block;
		width: 56px;
		height: 22px;
	}

	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	.slider:before {
		position: absolute;
		content: "";
		height: 18px;
		width: 18px;
		left: 3px;
		bottom: 2px;
		background-color: white;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	input:checked + .slider {
		background-color: rgb(39, 39, 43);
	}

	input:checked + .slider:before {
		-webkit-transform: translateX(32px);
		-ms-transform: translateX(32px);
		transform: translateX(32px);
	}

	.slider.round {
		border-radius: 34px;
	}

	.slider.round:before {
		border-radius: 50%;
	}
</style>
