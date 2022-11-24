import { io } from "socket.io-client";
import router from "../router";
import { useMainStore } from "../stores/main";

const URL = "http://localhost:3000";
const socket = io(URL, { autoConnect: false });

// Recieve Msg Listener
socket.on("recieve-msg", (msg) => {
	const mainStore = useMainStore();

	// Check if the message is form the user and appending it to it corresponding message array
	if (msg.selfSend) {
		mainStore.chats[msg.to].messages.push(msg);
	} else {
		if (getCurrentParameter(window.location.pathname) !== msg.from) {
			mainStore.unReadMessages[msg.from] = true;
		}
		mainStore.chats[msg.from].messages.push(msg);
	}
});

// Set Online Listener
socket.on("set-online", (userID) => {
	const mainStore = useMainStore();
	mainStore.chats[userID].isOnline = true;
});

// Delete A Specific Chat Listener
socket.on("delete-chat", (userID) => {
	const mainStore = useMainStore();
	mainStore.deleteChatById(userID);
	const toChat = mainStore.getFirstChat ? mainStore.getFirstChat : "nochats";
	router.replace(`/app/${toChat}`);
});

// Function to get the current parameter of the url
const getCurrentParameter = (path) => path.substring(path.lastIndexOf("/") + 1);

export default socket;
