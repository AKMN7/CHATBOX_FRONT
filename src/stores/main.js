import axios from "axios";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

const API = "http://localhost:3000/api/v1";

export const useMainStore = defineStore("main", {
	state: () => {
		return {
			chats: {},
			invites: [],
			unReadMessages: [],
			currentChat: null,
		};
	},
	getters: {
		getChats: (state) => state.chats,
		getFirstChat: (state) => Object.keys(state.chats)[0],
		getChatsById: (state) => {
			return (id) => state.chats[id];
		},
		getMessagesById: (state) => {
			return (id) => (state.chats[id] ? state.chats[id].messages : []);
		},
		getInvites: (state) => state.invites,
	},
	actions: {
		async fetchUserData() {
			// Fetch All Data
			await Promise.all([this.fetchChats(), this.fetchInvites()]).catch(function (error) {
				throw new Error(error);
			});

			// Update the Current Chat the first user chat
			this.updateCurrentChat(this.chats[0] ? this.chats[0] : { name: "No Chats", profilePic: "----" });

			console.log("*** USER DATA ***");
			console.log("chats ->", this.chats);
			console.log("invites ->", this.invites);
		},

		async fetchChats() {
			//Get Token
			const authStore = useAuthStore();
			const token = authStore.token;

			// Set URL EndPoint
			const EndPoint = API + "/users/getChats";

			// Send HTTP Get Reques
			const response = await axios.get(EndPoint, { headers: { Authorization: `Bearer ${token}` } }).catch(function (error) {
				throw new Error(error.response.data.msg);
			});

			// Set the Chats
			this.chats = response.data.data.chats;

			// Set the messages and unReadMessages stauts for chats
			Object.keys(this.chats).forEach((el) => {
				this.chats[el].isOnline = false;
				this.unReadMessages[el.id] = false;
			});
		},

		async deleteChat(payload) {
			//Get Token
			const authStore = useAuthStore();
			const token = authStore.token;

			// Set URL EndPoint
			const EndPoint = API + "/users/deleteChat/" + payload;

			// Send HTTP Post Reques
			await axios.delete(EndPoint, { headers: { Authorization: `Bearer ${token}` } }).catch(function (error) {
				throw new Error(error.response.data.msg);
			});

			// Delete Chat
			this.deleteChatById(payload);
		},

		// Function to delete a chat based on it's id
		deleteChatById(id) {
			delete this.chats[id];
		},

		async fetchInvites() {
			//Get Token
			const authStore = useAuthStore();
			const token = authStore.token;

			// Set URL EndPoint
			const EndPoint = API + "/users/getInvites";

			// Send HTTP Get Reques
			const response = await axios.get(EndPoint, { headers: { Authorization: `Bearer ${token}` } }).catch(function (error) {
				throw new Error(error.response.data.msg);
			});

			// Set Invites
			this.invites = response.data.data.invites;
		},

		async createInvitation(payload) {
			//Get Token
			const authStore = useAuthStore();
			const token = authStore.token;

			// Set URL EndPoint
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

			// Set URL EndPoint
			const EndPoint = API + "/users/updateInvite";

			// Format Data to send
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

			// Set URL EndPoint
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

		// Update the current chat
		updateCurrentChat(payload) {
			this.currentChat = {
				name: payload.name,
				profilePic: payload.profilePic,
			};
		},

		// Rest The whole store
		resetStore() {
			this.invites = [];
			this.chats = [];
			this.unReadMessages = [];
			this.currentChat = null;
		},
	},
});
