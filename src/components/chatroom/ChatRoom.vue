<template>
	<div v-if="chatID == 'nochats'" class="noChats">
		<img src="../../assets/no_chats.svg" alt="No Chats" />
		<h1 class="text-xl text-center">Looks like you don't have any chats yet. Add a new contact to get started!</h1>
	</div>
	<div v-else class="chat-room">
		<div class="chat-list">
			<div class="mx-2 my-6 text-center">
				<p class="px-2 py-1 bg-darkGrey text-white text-sm w-fit m-auto rounded-lg dark:bg-white dark:text-darkGrey">
					Nov 9, 2022
				</p>
			</div>
			<div class="day-chat flex flex-col space-y-4">
				<div class="messageSent space-y-1">
					<p class="text-left self-start leading-8">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
					<p class="text-right self-end text-xs">8:11 PM</p>
				</div>
				<div class="messageRecieved space-y-1">
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
			<div v-for="message in mainStore.messages[chatID]" :key="message.msgText" class="day-chat flex flex-col space-y-4">
				<div class="space-y-1" :class="{ messageSent: !message.selfSend, messageRecieved: message.selfSend }">
					<p class="text-left self-start leading-8">
						{{ message.msgText }}
					</p>
					<p class="text-right self-end text-xs">8:11 PM</p>
				</div>
			</div>
		</div>
		<div class="wrapper">
			<div class="search-input">
				<input
					v-model="msgText"
					type="text"
					placeholder="Start typing your message..."
					class="bg-lightestGrey text-black dark:bg-white dark:text-darkGrey" />
				<span class="material-icons icon" @click="sendMessage">send</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { ref } from "@vue/reactivity";
	import { useRoute } from "vue-router";
	import { useMainStore } from "../../stores/main";
	import socket from "../../utils/socket";
	export default {
		setup() {
			const mainStore = useMainStore();
			const route = useRoute();
			let chatID = route.params.chatID;

			mainStore.unReadMessages[chatID] = false;

			// Update Header Title
			if (chatID !== "nochats") {
				let chatUserInfo = mainStore.getChats.filter((el) => el.id == chatID)[0];
				if (chatUserInfo) {
					mainStore.updateCurrentChat({ name: chatUserInfo.name, profilePic: chatUserInfo.profilePic });
				}
			}

			// Sending A Message By Emiting it throught SocketIo from the server
			let msgText = ref("");
			function sendMessage() {
				if (msgText.value !== "") socket.emit("send-msg", chatID, msgText.value);
			}

			return { chatID, mainStore, msgText, sendMessage };
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

	.messageRecieved,
	.messageSent {
		width: fit-content;
		max-width: 60vw;
		padding: 12px;
		display: flex;
		flex-direction: column;
		color: white;
		margin-top: 15px;
	}

	.messageSent {
		border-top-right-radius: 8px;
		border-bottom-right-radius: 8px;
		border-bottom-left-radius: 8px;
		align-self: flex-start;
		background-color: rgb(39, 39, 42);
	}

	.messageRecieved {
		border-top-left-radius: 8px;
		border-bottom-left-radius: 8px;
		border-bottom-right-radius: 8px;
		align-self: flex-end;
		background-color: rgb(119, 119, 119);
	}

	.noChats {
		height: calc(100vh - 100px);
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.noChats img {
		max-height: 25rem;
		max-width: 90%;
		margin-bottom: 2rem;
	}
</style>
