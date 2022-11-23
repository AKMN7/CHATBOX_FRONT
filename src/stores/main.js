import axios from "axios";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

const API = "http://localhost:3000/api/v1";

export const useMainStore = defineStore("main", {
	state: () => {
		return {
			chats: [],
			invites: [],
			messages: [],
			unReadMessages: [],
			currentChat: null,
		};
	},
	getters: {
		getChats: (state) => state.chats,
		getInvites: (state) => state.invites,
		getMessagesById: (state) => {
			return (id) => state.messages[id];
		},
		getChatsById: (state) => {
			return (id) => state.chats.find((el) => el.id == id);
		},
	},
	actions: {
		async fetchUserData() {
			// Fetch All Data -> chats & invites & currentChat
			await Promise.all([this.fetchChats(), this.fetchInvites()]).catch(function (error) {
				throw new Error(error.response.data.msg);
			});
			this.updateCurrentChat(this.chats[0] ? this.chats[0] : { name: "No Chats", profilePic: "----" });

			console.log("*** USER DATA ***");
			console.log("chats ->", this.chats);
			console.log("invites ->", this.invites);
		},

		async fetchChats() {
			//Get Token
			const authStore = useAuthStore();
			const token = authStore.token;

			const EndPoint = API + "/users/getChats";

			// Send HTTP Get Reques
			const response = await axios.get(EndPoint, { headers: { Authorization: `Bearer ${token}` } }).catch(function (error) {
				throw new Error(error.response.data.msg);
			});

			// Set the Chats
			this.chats = response.data.data.chats;

			// Set the messages and unReadMessages stauts for chats
			this.chats.forEach((el) => {
				el.isOnline = false;
				this.messages[el.id] = [];
				this.unReadMessages[el.id] = false;
			});
		},

		async deleteChat(payload) {
			//Get Token
			const authStore = useAuthStore();
			const token = authStore.token;

			const EndPoint = API + "/users/deleteChat/" + payload;

			// Send HTTP Post Reques
			await axios.delete(EndPoint, { headers: { Authorization: `Bearer ${token}` } }).catch(function (error) {
				throw new Error(error.response.data.msg);
			});

			// Fetch New Chats Array
			await this.fetchChats();
		},

		async fetchInvites() {
			//Get Token
			const authStore = useAuthStore();
			const token = authStore.token;

			const EndPoint = API + "/users/getInvites";

			// Send HTTP Get Reques
			const response = await axios.get(EndPoint, { headers: { Authorization: `Bearer ${token}` } }).catch(function (error) {
				throw new Error(error.response.data.msg);
			});

			this.invites = response.data.data.invites;
		},

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

			// Fetch New Invites Array
			await this.fetchInvites();
		},

		async updateInvite(payload) {
			//Get Token
			const authStore = useAuthStore();
			const token = authStore.token;

			const EndPoint = API + "/users/updateInvite";

			const data = {
				inviteID: payload.id,
				newStatus: payload.status,
			};

			// Send HTTP Post Reques
			await axios.patch(EndPoint, data, { headers: { Authorization: `Bearer ${token}` } }).catch(function (error) {
				throw new Error(error.response.data.msg);
			});

			// Fetch New Invites Array
			await this.fetchUserData();
		},

		async deleteInvite(payload) {
			//Get Token
			const authStore = useAuthStore();
			const token = authStore.token;

			const EndPoint = API + "/users/deleteInvite";

			// Send HTTP Post Reques
			await axios
				.post(EndPoint, { inviteID: payload }, { headers: { Authorization: `Bearer ${token}` } })
				.catch(function (error) {
					throw new Error(error.response.data.msg);
				});

			// Fetch New Invites Array
			await this.fetchInvites();
		},

		updateCurrentChat(payload) {
			this.currentChat = {
				name: payload.name,
				profilePic: payload.profilePic,
			};
		},

		resetStore() {
			this.invites = [];
			this.chats = [];
			this.currentChat = null;
		},
	},
});
