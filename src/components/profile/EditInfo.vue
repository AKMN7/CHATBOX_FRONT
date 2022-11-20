<template>
	<div class="h-fit w-full flex flex-col space-y-4 p-2 md:w-96">
		<div class="flex items-center justify-end space-x-3 p-3 mb-1 border-b border-b-grey">
			<button class="text-lightGrey transition-all duration-200" :class="{ active: mode === 'general' }" @click="toggleMode">
				Genral
			</button>
			<button class="text-lightGrey transition-all duration-200" :class="{ active: mode === 'security' }" @click="toggleMode">
				Security
			</button>
		</div>
		<form @submit.prevent v-if="mode == 'general'">
			<input
				class="w-full px-4 py-3 rounded-lg font-bold text-black bg-gray-100 border border-gray-200 placeholder-lightestGrey text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
				type="email"
				placeholder="Email"
				:disabled="edit" />
			<input
				class="w-full px-4 py-3 rounded-lg font-bold text-black bg-gray-100 border border-gray-200 placeholder-lightestGrey text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
				type="text"
				placeholder="Full Name"
				:disabled="edit" />
			<div class="wrapper mt-5">
				<div class="search-input">
					<input type="text" placeholder="alksjdfasdf09ou8" disabled />
					<span class="material-icons icon" title="Copy">content_copy</span>
				</div>
			</div>
			<div class="flex items-center justify-end space-x-3 mt-5">
				<button class="px-4 py-2 rounded-lg" :class="{ activeBtn: edit }" :disabled="edit ? false : true" @click="toggleEdit">
					Edit
				</button>
				<button class="px-4 py-2 rounded-lg" :class="{ activeBtn: !edit }" :disabled="edit ? true : false">Save</button>
			</div>
		</form>
		<form v-if="mode == 'security'">
			<input
				class="w-full px-4 py-3 rounded-lg font-bold text-black bg-gray-100 border border-gray-200 placeholder-lightestGrey text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
				type="email"
				placeholder="Current Password" />
			<input
				class="w-full px-4 py-3 rounded-lg font-bold text-black bg-gray-100 border border-gray-200 placeholder-lightestGrey text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
				type="text"
				placeholder="New Password" />
			<input
				class="w-full px-4 py-3 rounded-lg font-bold text-black bg-gray-100 border border-gray-200 placeholder-lightestGrey text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
				type="text"
				placeholder="Confirm Password" />
			<div class="flex items-center justify-end space-x-3 mt-5">
				<button class="bg-grey py-2 px-4 rounded-lg">Save</button>
			</div>
		</form>
	</div>
</template>

<script>
	import { ref } from "vue";

	export default {
		setup() {
			let mode = ref("general");
			let edit = ref(true);

			const toggleMode = () => (mode.value = mode.value == "general" ? "security" : "general");
			const toggleEdit = () => (edit.value = !edit.value);

			return { mode, edit, toggleMode, toggleEdit };
		},
	};
</script>

<style>
	.wrapper {
		width: 100%;
	}

	.wrapper .search-input {
		width: 100%;
		border-radius: 5px;
		position: relative;
		color: black;
	}

	.search-input input {
		background: rgb(243, 244, 246);
		width: 100%;
		border: 1px solid rgb(229, 231, 235);
		border-radius: 8px;
		padding: 12px 16px;
		font-size: 14px;
		line-height: 20px;
		font-weight: 700;
		outline: none;
	}

	.search-input input:focus {
		border: 1px solid rgb(156, 163, 175);
		background: white;
	}

	.search-input input::placeholder {
		color: #999999;
	}

	.search-input .icon {
		position: absolute;
		right: 10px;
		top: 0px;
		text-align: center;
		line-height: 46px;
		font-size: 22px;
		color: #999999;
		cursor: pointer;
	}

	.active {
		color: white;
		font-weight: bold;
	}

	.activeBtn {
		background: #3e3e3e;
	}
</style>
