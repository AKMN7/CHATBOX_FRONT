import axios from "axios";
import { defineStore } from "pinia";

// const API = import.meta.env.API_URL;
const API = "http://localhost:3000/api/v1";

export const useAuthStore = defineStore("auth", {
	state: () => {
		return {
			token: null,
			email: null,
			name: null,
		};
	},
	getters: {
		getUser: (state) => state,
	},
	actions: {
		async signIn(payload) {
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

			// Store use to the local storage
			localStorage.setItem("token", this.token);
			localStorage.setItem("email", this.email);
			localStorage.setItem("name", this.name);

			//Todo Get Data (Chats and onpen websockets)
		},

		async signUp(payload) {
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

			//Todo Get Data (Chats and onpen websockets)
		},

		async googleAuth(payload) {
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

			// Store use to the local storage
			localStorage.setItem("token", this.token);
			localStorage.setItem("email", this.email);
			localStorage.setItem("name", this.name);

			// Fetch New data
			//Todo Get Data (Chats and onpen websockets)

			if (payload.type === "SignUp") return response.data.specialMSG;
		},

		logout() {
			// Clear the localStorage
			localStorage.clear();
			// Clear the Current State
			this.token = null;
			this.email = null;
			this.name = null;
		},

		autoSignIn() {
			// Obtaind data sotred in the localStorage
			const token = localStorage.getItem("token");
			const email = localStorage.getItem("email");
			const name = localStorage.getItem("name");

			if (token && email && name) {
				this.token = token;
				this.email = email;
				this.name = email;

				return true;
			}

			return false;
		},
	},
});
