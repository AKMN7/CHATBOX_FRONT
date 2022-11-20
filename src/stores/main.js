import axios from "axios";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

const API = "http://localhost:3000/api/v1";

export const useMainStore = defineStore("main", {
	state: () => {
		return {
			chats: [],
		};
	},
	getters: {
		getChats: (state) => state.chats,
	},
	actions: {
		async createInvitation(payload) {
			//Get Token
			const authStore = useAuthStore();
			const token = authStore.token;

			const EndPoint = API + "/users/createInvite";

			const data = {
				to: payload,
			};

			// Send HTTP Post Request
			await axios.post(EndPoint, data, { headers: { Authorization: `Bearer ${token}` } }).catch(function (error) {
				throw new Error(error.response.data.msg);
			});
		},
	},
});
