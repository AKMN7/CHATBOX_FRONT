<template>
	<div v-if="chatID == 'nochats'" class="noChats">
		<img src="../../assets/no_chats.svg" alt="No Chats" />
		<h1 class="text-xl text-center">Looks like you don't have any chats yet. Add a new contact to get started!</h1>
	</div>
	<div v-else class="chat-room">
		<div class="chat-list">
			<div v-for="msgGroup in Object.keys(chatMessages)" :key="msgGroup" class="day-chat flex flex-col space-y-4">
				<div class="mx-2 my-6 text-center">
					<p class="px-2 py-1 bg-darkGrey text-white text-sm w-fit m-auto rounded-lg dark:bg-white dark:text-darkGrey">
						{{ checkIfTodayOrYesterday(msgGroup) }}
					</p>
				</div>

				<div
					v-for="message in chatMessages[msgGroup]"
					:key="message._id"
					class="space-y-1"
					:class="{ messageSent: !message.selfSend, messageRecieved: message.selfSend }">
					<p class="text-left self-start leading-8">
						{{ message.text }}
					</p>
					<p class="text-right self-end text-xs">{{ timeStampToTime(message.date) }}</p>
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
	import { computed } from "@vue/runtime-core";
	import { timeStampToDate, timeStampToTime, checkIfTodayOrYesterday } from "../../utils/dateHelper.js";
	export default {
		setup() {
			const mainStore = useMainStore();
			const route = useRoute();
			let chatID = route.params.chatID;

			mainStore.unReadMessages[chatID] = false;

			// Update Header Title
			if (chatID !== "nochats") {
				let chatUserInfo = mainStore.getChats[chatID];
				if (chatUserInfo) {
					mainStore.updateCurrentChat({ name: chatUserInfo.name, profilePic: chatUserInfo.profilePic });
				}
			} else {
				mainStore.updateCurrentChat({
					name: "No Chats",
					profilePic: "https://ui-avatars.com/api/?name=No+Chats&size=128&background=random",
				});
			}

			// Sending A Message By Emiting it throught SocketIo from the server
			let msgText = ref("");
			function sendMessage() {
				if (msgText.value !== "") {
					socket.emit("send-msg", chatID, msgText.value, Date.now());
					msgText.value = "";
				}
			}

			// A Computed property that groups messages based on the date
			const chatMessages = computed(() => {
				let messages = [];

				mainStore.getMessagesById(chatID).forEach((el) => {
					let messageDate = timeStampToDate(el.date);
					if (messages[messageDate]) {
						messages[messageDate].push(el);
					} else {
						messages[messageDate] = [el];
					}
				});

				return messages;
			});

			return { chatID, msgText, sendMessage, timeStampToTime, checkIfTodayOrYesterday, chatMessages };
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
