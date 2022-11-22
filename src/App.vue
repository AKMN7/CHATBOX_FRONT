<template>
	<the-loader v-if="isLoading" />
	<router-view v-slot="slotProps">
		<transition name="route" mode="out-in">
			<component :is="slotProps.Component"></component>
		</transition>
	</router-view>
</template>

<script>
	import socket from "./utils/socket";
	import TheLoader from "./layout/TheLoader.vue";
	import toaster from "./utils/toast";
	import { mapStores } from "pinia";
	import { useAuthStore } from "./stores/auth";
	import { useMainStore } from "./stores/main";

	export default {
		components: {
			TheLoader,
		},
		data() {
			return {
				isLoading: false,
			};
		},
		computed: {
			...mapStores(useAuthStore, useMainStore),
		},
		async mounted() {
			try {
				if (this.authStore.autoSignIn()) {
					console.log("USER FOUND!");
					this.isLoading = true;

					try {
						//TODO => REPLACE WITH GET DATA
						await this.mainStore.fetchUserData();
						// await this.mainStore.fetchInvites();
						socket.auth = { token: this.authStore.token };
						socket.connect();
						let toChat = this.mainStore.getChats.length ? this.mainStore.getChats[0].id : "nochats";
						this.$router.replace(`/app/${toChat}`);
					} catch (error) {
						toaster.fireToast(this.$swal, false, error.message);
					}

					this.isLoading = false;
				} else {
					console.log("NO USER FOUND!");
					this.$router.replace("/signin");
				}
			} catch (error) {
				console.log("*** App Error ***", error);
			}
		},
	};
</script>

<style>
	.route-enter-from {
		opacity: 0;
		transform: translateX(500px);
	}

	.route-leave-to {
		opacity: 0;
		transform: translateX(-500px);
	}

	.route-enter-active {
		transition: all 0.2s;
	}
	.route-leave-active {
		transition: all 0.2s;
	}

	.route-enter-to,
	.route-leave-from {
		opacity: 1;
		transform: translateX(0);
	}

	.router-link-exact-active,
	.router-link-active {
		color: white;
		background-color: black;
	}
</style>
