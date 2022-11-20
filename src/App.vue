<template>
	<router-view v-slot="slotProps">
		<transition name="route" mode="out-in">
			<component :is="slotProps.Component"></component>
		</transition>
	</router-view>
</template>

<script>
	import { useAuthStore } from "./stores/auth";
	import { useRouter } from "vue-router";
	import socket from "./utils/socket";
	// import { ref, inject } from "vue";
	// import toaster from "./utils/toast";
	export default {
		setup() {
			const store = useAuthStore();
			const router = useRouter();
			// const swal = inject("$swal");

			if (store.autoSignIn()) {
				console.log("USER FOUND!");
				socket.auth = { token: store.token };
				socket.connect();
				router.replace("/app/aljsdf098098");
			} else {
				console.log("NO USER FOUND!");
				router.replace("/signin");
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
