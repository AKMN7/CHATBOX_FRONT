import { io } from "socket.io-client";
import { useMainStore } from "../stores/main";

const URL = "http://localhost:3000";
const socket = io(URL, { autoConnect: false });

socket.on("recieve-msg", (msg) => {
	const mainStore = useMainStore();

	if (msg.selfSend) {
		mainStore.messages[msg.to].push(msg);
	} else {
		if (getCurrentParameter(window.location.pathname) !== msg.from) {
			mainStore.unReadMessages[msg.from] = true;
		}
		mainStore.messages[msg.from].push(msg);
	}
});

socket.on("set-online", (userID) => {
	const mainStore = useMainStore();
	mainStore.chats[mainStore.chats.findIndex((el) => el.id == userID)].isOnline = true;
});

const getCurrentParameter = (path) => path.substring(path.lastIndexOf("/") + 1);

export default socket;
