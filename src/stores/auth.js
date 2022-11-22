import axios from "axios";
import { defineStore } from "pinia";
import { useMainStore } from "./main";

// const API = import.meta.env.API_URL;
const API = "http://localhost:3000/api/v1";

export const useAuthStore = defineStore("auth", {
	state: () => {
		return {
			token: null,
			email: null,
			name: null,
			profilePic: null,
		};
	},
	getters: {
		getUser: (state) => state,
	},
	actions: {
		async signIn(payload) {
			// Main Store to fetch user data
			const store = useMainStore();

			const EndPoint = API + "/users/signin";

			const data = {
				email: payload.email,
				password: payload.password,
			};

			const response = await axios.post(EndPoint, data).catch(function (error) {
				console.log(error);
				throw new Error(error.response.data.msg);
			});

			// Set User Data
			this.token = response.data.token;
			this.email = response.data.data.user.email;
			this.name = response.data.data.user.name;
			this.profilePic = response.data.data.user.profilePic;

			// Store use to the local storage
			localStorage.setItem("token", this.token);
			localStorage.setItem("email", this.email);
			localStorage.setItem("name", this.name);
			localStorage.setItem("profilePic", this.profilePic);

			//Todo Get Data (Chats and onpen websockets)
			await store.fetchUserData(); //TODO => REPLACE WITH GET DATA
		},

		async signUp(payload) {
			// Main Store to fetch user data
			const store = useMainStore();

			const EndPoint = API + "/users/signup";

			const data = {
				name: payload.name,
				email: payload.email,
				password: payload.password,
				passwordConfirm: payload.passwordConfirm,
			};

			const response = await axios.post(EndPoint, data).catch(function (error) {
				console.log(error);
				throw new Error(error.response.data.msg);
			});

			this.token = response.data.token;
			this.email = response.data.data.user.email;
			this.name = response.data.data.user.name;
			this.profilePic = response.data.data.user.profilePic;

			//Todo Get Data (Chats and onpen websockets)
			await store.fetchUserData(); //TODO => REPLACE WITH GET DATA
		},

		async googleAuth(payload) {
			// Main Store to fetch user data
			const store = useMainStore();

			// API END POINT
			const googleAuthGateAway = API + "/users/google";

			const response = await axios
				.post(googleAuthGateAway, { token: payload.token, type: payload.type })
				.catch(function (error) {
					console.log("Errro 1", error);
					throw new Error(error);
				});

			// Set User Data
			this.token = response.data.token;
			this.email = response.data.data.user.email;
			this.name = response.data.data.user.name;
			this.profilePic = response.data.data.user.profilePic;

			// Store use to the local storage
			localStorage.setItem("token", this.token);
			localStorage.setItem("email", this.email);
			localStorage.setItem("name", this.name);
			localStorage.setItem("profilePic", this.profilePic);

			// Fetch New data
			//Todo Get Data (Chats and onpen websockets)
			await store.fetchUserData(); //TODO => REPLACE WITH GET DATA

			if (payload.type === "SignUp") return response.data.specialMSG;
		},

		logout() {
			// Main Store to Reset user data
			const store = useMainStore();

			// Clear the localStorage
			localStorage.clear();
			// Clear the Current State
			this.token = null;
			this.email = null;
			this.name = null;
			this.profilePic = null;

			store.resetStore();
		},

		autoSignIn() {
			// Obtaind data sotred in the localStorage
			const token = localStorage.getItem("token");
			const email = localStorage.getItem("email");
			const name = localStorage.getItem("name");
			const profilePic = localStorage.getItem("profilePic");

			if (token && email && name && profilePic) {
				this.token = token;
				this.email = email;
				this.name = name;
				this.profilePic = profilePic;

				return true;
			}

			return false;
		},
	},
});
