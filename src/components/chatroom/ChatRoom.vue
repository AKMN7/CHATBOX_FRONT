<template>
	<div class="chat-room">
		<div class="chat-list">
			<div class="mx-2 my-6 text-center">
				<p class="px-2 py-1 bg-darkGrey text-white text-sm w-fit m-auto rounded-lg dark:bg-white dark:text-darkGrey">
					Nov 9, 2022
				</p>
			</div>
			<div class="day-chat flex flex-col space-y-4">
				<div class="message-sent space-y-1 bg-zinc-800 text-white">
					<p class="text-left self-start leading-8">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
					<p class="text-right self-end text-xs">8:11 PM</p>
				</div>
				<div class="message-recieved space-y-1 bg-lightGrey text-white">
					<p class="text-left self-start leading-8">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde repellat aut, sequi voluptate maiores quis odio non cum
						corporis, quas distinctio hic? Necessitatibus, dolore saepe? Ab vitae veritatis quaerat error?
					</p>
					<p class="text-right self-end text-xs">8:38 PM</p>
				</div>
			</div>
			<div class="mx-2 my-6 text-center">
				<p class="px-2 py-1 bg-darkGrey text-white text-sm w-fit m-auto rounded-lg dark:bg-white dark:text-darkGrey">Today</p>
			</div>
			<div class="day-chat flex flex-col space-y-4">
				<div class="message-sent space-y-1 bg-zinc-800 text-white">
					<p class="text-left self-start leading-8">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur officia autem inventore sunt eum pariatur tempora
						voluptatibus dolores molestiae?
					</p>
					<p class="text-right self-end text-xs">8:11 PM</p>
				</div>
				<div class="message-recieved space-y-1 bg-lightGrey text-white">
					<p class="text-left self-start leading-8">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde repellat aut, sequi voluptate maiores quis odio non cum
						corporis, quas distinctio hic? Necessitatibus, dolore saepe? Ab vitae veritatis quaerat error?
					</p>
					<p class="text-right self-end text-xs">8:38 PM</p>
				</div>
				<div class="message-recieved space-y-1 bg-lightGrey text-white">
					<p class="text-left self-start leading-8">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde repellat aut, sequi voluptate maiores quis odio non cum
						corporis, quas distinctio hic? Necessitatibus, dolore saepe? Ab vitae veritatis quaerat error?
					</p>
					<p class="text-right self-end text-xs">8:38 PM</p>
				</div>
				<div class="message-sent space-y-1 bg-zinc-800 text-white">
					<p class="text-left self-start leading-8">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum quisquam, facilis quaerat enim excepturi totam modi culpa
						laudantium dolores voluptate dicta nemo tenetur porro doloremque tempore veniam neque! Ex, labore!
					</p>
					<p class="text-right self-end text-xs">8:11 PM</p>
				</div>
			</div>
		</div>
		<div class="wrapper">
			<div class="search-input">
				<input
					type="text"
					placeholder="Start typing your message..."
					class="bg-lightestGrey text-black dark:bg-white dark:text-darkGrey" />
				<!-- <span class="material-icons icon" @click="store.increment()">send</span> -->
				<span class="material-icons icon" @click="add100">send</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { useAuthStore } from "../../stores/auth";

	export default {
		setup() {
			const store = useAuthStore();

			const add100 = () => store.$patch({ counter: store.counter + 100 });

			console.log("Entered");

			return { store, add100 };
		},
	};
</script>

<style scoped>
	.wrapper {
		width: 100%;
		margin-top: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.wrapper .search-input {
		width: 97.5%;
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

	.chat-room {
		height: calc(100vh - 100px);
		width: 100%;
	}

	.chat-list {
		padding: 0 10px;
		height: 90%;
		overflow-y: scroll;
		scroll-snap-type: y mandatory;
		scroll-behavior: smooth;
	}

	.chat-list::-webkit-scrollbar {
		width: 2px;
	}

	.chat-list::-webkit-scrollbar-track {
		background: transparent;
	}

	.chat-list::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.5);
		border-radius: 8px;
	}

	.message-recieved,
	.message-sent {
		width: fit-content;
		max-width: 60vw;
		padding: 12px;
		display: flex;
		flex-direction: column;
	}

	.message-sent {
		border-top-right-radius: 8px;
		border-bottom-right-radius: 8px;
		border-bottom-left-radius: 8px;
		align-self: flex-start;
	}

	.message-recieved {
		border-top-left-radius: 8px;
		border-bottom-left-radius: 8px;
		border-bottom-right-radius: 8px;
		align-self: flex-end;
	}
</style>
