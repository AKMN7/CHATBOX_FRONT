import router from "../router";
import socket from "./socket";
import { useAuthStore } from "../stores/auth";
import { useMainStore } from "../stores/main";
import toaster from "./toast";

//! A composable used for Signing In / Signing Up the USER
async function userAuth(data, fn, swal) {
	const mainStore = useMainStore();
	const authStore = useAuthStore();

	let returnedMSG = null;
	try {
		returnedMSG = await fn(data);
		toaster.fireToast(swal, true, returnedMSG || "Success, Signing In");
		// Establish a socket connection
		socket.disconnect();
		socket.auth = { token: authStore.token };
		socket.connect();
		// Emit Online Status
		socket.emit("online", mainStore.getChats);
		setTimeout(() => {
			let toChat = mainStore.getFirstChat ? mainStore.getFirstChat : "nochats";
			router.replace(`/app/${toChat}`);
		}, 2000);
	} catch (err) {
		console.log(err);
		toaster.fireToast(swal, false, err.message);
	}

	if (returnedMSG) return returnedMSG;
}

export default userAuth;
